/**
 * OAuth Initiation Handler
 * Initiates the GitHub OAuth flow by redirecting users to GitHub's authorization page
 */

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import config from '@/lib/config';
import rateLimiter from '@/lib/rate-limiter';
import logger from '@/lib/logger';

export async function GET(request) {
  try {
    // Check rate limit
    const rateLimit = rateLimiter.checkLimit(request);
    if (!rateLimit.allowed) {
      logger.warn('auth.oauth.rate_limited', 'Rate limit exceeded for OAuth initiation', {
        ip: rateLimiter.getClientIp(request),
        retryAfter: rateLimit.retryAfter
      });
      const response = NextResponse.json(
        { error: { code: 'RATE_LIMITED', message: 'Too many requests. Please try again later.' } },
        { status: 429 }
      );
      response.headers.set('Retry-After', String(rateLimit.retryAfter));
      return response;
    }

    // Validate configuration
    config.validate();

    // Generate secure random state token (32 bytes, base64-encoded)
    const state = crypto.randomBytes(32).toString('base64');

    logger.info('auth.oauth.initiated', 'OAuth flow initiated');

    // Construct GitHub authorization URL
    const authUrl = new URL('https://github.com/login/oauth/authorize');
    authUrl.searchParams.set('client_id', config.githubClientId);
    authUrl.searchParams.set('redirect_uri', config.githubCallbackUrl);
    authUrl.searchParams.set('scope', 'user:email read:user');
    authUrl.searchParams.set('state', state);

    // Create response with redirect
    const response = NextResponse.redirect(authUrl.toString());

    // Store state token in temporary cookie (10-minute expiration)
    const maxAge = 10 * 60; // 10 minutes in seconds
    response.cookies.set('oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge
    });

    return response;
  } catch (error) {
    logger.error('auth.oauth.initiation_failed', 'OAuth initiation failed', {
      error: error.message
    });
    
    // Redirect to error page (use fallback URL if config not available)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const errorUrl = new URL('/auth/error', baseUrl);
    errorUrl.searchParams.set('message', 'invalid_request');
    
    return NextResponse.redirect(errorUrl.toString());
  }
}
