/**
 * OAuth Callback Handler
 * Processes GitHub's OAuth callback, exchanges authorization code for access token,
 * and completes authentication
 */

import { NextResponse } from 'next/server';
import config from '@/lib/config';
import githubOAuthService from '@/lib/github-oauth-service';
import userStore from '@/lib/user-store';
import sessionManager from '@/lib/session-manager';
import rateLimiter from '@/lib/rate-limiter';
import logger from '@/lib/logger';

export async function GET(request) {
  try {
    // Check rate limit
    const rateLimit = rateLimiter.checkLimit(request);
    if (!rateLimit.allowed) {
      logger.warn('auth.callback.rate_limited', 'Rate limit exceeded for OAuth callback', {
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

    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Check if user cancelled authorization
    if (error === 'access_denied') {
      logger.info('auth.oauth.cancelled', 'User cancelled GitHub authorization');
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const errorUrl = new URL('/auth/error', baseUrl);
      errorUrl.searchParams.set('message', 'cancelled');
      return NextResponse.redirect(errorUrl.toString());
    }

    // Validate required parameters
    if (!code || !state) {
      logger.warn('auth.callback.invalid_params', 'Missing required parameters', { hasCode: !!code, hasState: !!state });
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const errorUrl = new URL('/auth/error', baseUrl);
      errorUrl.searchParams.set('message', 'invalid_request');
      return NextResponse.redirect(errorUrl.toString());
    }

    // Validate state parameter (CSRF protection)
    const storedState = request.cookies.get('oauth_state')?.value;
    
    if (!storedState || storedState !== state) {
      logger.warn('auth.callback.invalid_state', 'Invalid state parameter - possible CSRF attempt');
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const errorUrl = new URL('/auth/error', baseUrl);
      errorUrl.searchParams.set('message', 'invalid_request');
      return NextResponse.redirect(errorUrl.toString());
    }

    // Exchange authorization code for access token
    let accessToken;
    try {
      accessToken = await githubOAuthService.exchangeCodeForToken(code);
    } catch (error) {
      logger.error('auth.callback.token_exchange_failed', 'Token exchange failed', { error: error.message });
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const errorUrl = new URL('/auth/error', baseUrl);
      errorUrl.searchParams.set('message', 'auth_failed');
      return NextResponse.redirect(errorUrl.toString());
    }

    // Fetch user profile data
    let githubUser;
    try {
      githubUser = await githubOAuthService.fetchUserProfile(accessToken);
      
      // If email is not public, try to fetch from emails endpoint
      if (!githubUser.email) {
        const email = await githubOAuthService.fetchUserEmail(accessToken);
        githubUser.email = email;
      }
    } catch (error) {
      logger.error('auth.callback.user_fetch_failed', 'User profile fetch failed', { error: error.message });
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const errorUrl = new URL('/auth/error', baseUrl);
      errorUrl.searchParams.set('message', 'auth_failed');
      return NextResponse.redirect(errorUrl.toString());
    }

    // Check if user exists
    let user = await userStore.findByGitHubId(githubUser.id);

    if (user) {
      // Update existing user
      try {
        user = await userStore.updateUser(user.id, {
          username: githubUser.login,
          avatarUrl: githubUser.avatar_url,
          email: githubUser.email
        });
        logger.info('auth.user.login', 'User logged in', { userId: user.id, githubId: user.githubId });
      } catch (error) {
        logger.error('auth.user.update_failed', 'User update failed', { error: error.message });
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const errorUrl = new URL('/auth/error', baseUrl);
        errorUrl.searchParams.set('message', 'auth_failed');
        return NextResponse.redirect(errorUrl.toString());
      }
    } else {
      // Create new user
      try {
        user = await userStore.createUser({
          githubId: githubUser.id,
          username: githubUser.login,
          avatarUrl: githubUser.avatar_url,
          email: githubUser.email
        });
        logger.info('auth.user.created', 'New user created', { userId: user.id, githubId: user.githubId });
      } catch (error) {
        logger.error('auth.user.creation_failed', 'User creation failed', { error: error.message });
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const errorUrl = new URL('/auth/error', baseUrl);
        errorUrl.searchParams.set('message', 'auth_failed');
        return NextResponse.redirect(errorUrl.toString());
      }
    }

    // Create session
    let session;
    try {
      session = await sessionManager.createSession(user.id);
      logger.info('auth.session.created', 'Session created', { userId: user.id, expiresAt: session.expiresAt });
    } catch (error) {
      logger.error('auth.session.creation_failed', 'Session creation failed', { error: error.message });
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const errorUrl = new URL('/auth/error', baseUrl);
      errorUrl.searchParams.set('message', 'auth_failed');
      return NextResponse.redirect(errorUrl.toString());
    }

    // Redirect to home page with session cookie
    const response = NextResponse.redirect(config.appUrl);
    
    // Set session cookie
    const cookieHeader = sessionManager.createCookieHeader(session.token);
    response.headers.set('Set-Cookie', cookieHeader);
    
    // Clear state cookie
    response.cookies.delete('oauth_state');

    return response;
  } catch (error) {
    logger.error('auth.callback.error', 'OAuth callback error', { error: error.message });
    
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const errorUrl = new URL('/auth/error', baseUrl);
    errorUrl.searchParams.set('message', 'auth_failed');
    
    return NextResponse.redirect(errorUrl.toString());
  }
}
