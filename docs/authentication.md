# GitHub OAuth Authentication

This document explains the GitHub OAuth authentication implementation for OS Pins.

## Overview

OS Pins uses GitHub OAuth 2.0 for user authentication. The system handles both new user registration and existing user login through a unified OAuth flow.

## Architecture

### Components

1. **OAuth Initiation Handler** (`/api/auth/github`)
   - Generates CSRF protection state token
   - Redirects user to GitHub authorization page

2. **OAuth Callback Handler** (`/api/auth/callback`)
   - Validates state token (CSRF protection)
   - Exchanges authorization code for access token
   - Fetches user profile from GitHub
   - Creates or updates user in database
   - Creates session and sets secure cookie

3. **User Store** (`lib/user-store.js`)
   - Manages user data persistence
   - Currently uses in-memory storage (can be replaced with database)

4. **Session Manager** (`lib/session-manager.js`)
   - Creates and validates user sessions
   - Uses secure HTTP-only cookies
   - 30-day session duration

5. **GitHub OAuth Service** (`lib/github-oauth-service.js`)
   - Handles all GitHub API interactions
   - Token exchange
   - User profile fetching
   - Includes retry logic for network failures

6. **Rate Limiter** (`lib/rate-limiter.js`)
   - Prevents abuse with sliding window rate limiting
   - 10 requests per 15 minutes per IP

## Setup Instructions

### 1. Create GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - **Application name**: OS Pins (or your preferred name)
   - **Homepage URL**: `http://localhost:3000` (for development)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback`
4. Click "Register application"
5. Note your **Client ID**
6. Generate a new **Client Secret** and save it securely

### 2. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your GitHub OAuth credentials:
   ```env
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   GITHUB_CALLBACK_URL=http://localhost:3000/api/auth/callback
   SESSION_SECRET=your_random_32_char_secret
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. Generate a secure session secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

### 3. Start the Development Server

```bash
npm run dev
```

## OAuth Flow

```
User → Click "Sign in with GitHub"
     → GET /api/auth/github
     → Redirect to GitHub authorization page
     → User approves access
     → GitHub redirects to /api/auth/callback?code=xxx&state=xxx
     → Exchange code for access token
     → Fetch user profile from GitHub
     → Create/update user in database
     → Create session
     → Set secure cookie
     → Redirect to home page
```

## Security Features

1. **CSRF Protection**: State parameter validation
2. **Secure Cookies**: HTTP-only, SameSite=Lax, Secure (in production)
3. **Rate Limiting**: 10 requests per 15 minutes per IP
4. **No Token Storage**: GitHub access tokens are never stored in database
5. **Sensitive Data Sanitization**: All logs automatically sanitize tokens and secrets
6. **Input Validation**: All parameters validated before processing

## User Data Stored

- GitHub user ID (unique identifier)
- GitHub username
- Profile avatar URL
- Email address (if provided by GitHub)
- Account creation timestamp
- Last update timestamp

## Error Handling

The system handles various error scenarios:

- **User cancels authorization**: Redirects to error page with "cancelled" message
- **Invalid state token**: Redirects to error page with "invalid_request" message
- **Token exchange fails**: Redirects to error page with "auth_failed" message
- **Rate limit exceeded**: Returns 429 status with Retry-After header

## Testing the Implementation

### Manual Testing

1. Start the development server
2. Navigate to `http://localhost:3000/api/auth/github`
3. You should be redirected to GitHub's authorization page
4. Approve the authorization
5. You should be redirected back to the home page with a session cookie set

### Check Session Cookie

After successful authentication, check your browser's developer tools:
- Cookie name: `session`
- Attributes: HttpOnly, SameSite=Lax
- Duration: 30 days

## Production Deployment

### Environment Variables

Update your production environment variables:

```env
GITHUB_CLIENT_ID=your_production_client_id
GITHUB_CLIENT_SECRET=your_production_client_secret
GITHUB_CALLBACK_URL=https://yourdomain.com/api/auth/callback
SESSION_SECRET=your_production_secret
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production
```

### GitHub OAuth App Settings

Create a separate GitHub OAuth App for production:
- **Homepage URL**: `https://yourdomain.com`
- **Authorization callback URL**: `https://yourdomain.com/api/auth/callback`

### Security Considerations

1. Use HTTPS in production (required for Secure cookies)
2. Keep session secret secure and rotate periodically
3. Monitor rate limit violations
4. Review logs for suspicious activity
5. Consider implementing additional security measures:
   - IP allowlisting for admin endpoints
   - Two-factor authentication
   - Session timeout on inactivity

## Database Migration

The current implementation uses in-memory storage. To migrate to a database:

1. Choose your database (PostgreSQL, MongoDB, etc.)
2. Update `lib/user-store.js` to use database queries
3. Update `lib/session-manager.js` to use database sessions
4. Run database migrations to create required tables
5. Update environment variables with database connection details

## Troubleshooting

### "Missing required environment variables" error

- Ensure all required variables are set in `.env.local`
- Restart the development server after changing environment variables

### "Invalid state parameter" error

- This indicates a CSRF protection failure
- Clear your browser cookies and try again
- Check that cookies are enabled in your browser

### "Authentication failed" error

- Check that your GitHub OAuth credentials are correct
- Verify the callback URL matches your GitHub OAuth App settings
- Check the server logs for detailed error messages

### Rate limit exceeded

- Wait 15 minutes before trying again
- Check if multiple requests are being made accidentally
- Consider adjusting rate limit settings in `lib/rate-limiter.js`

## API Endpoints

### GET /api/auth/github

Initiates the GitHub OAuth flow.

**Response**: Redirect to GitHub authorization page

### GET /api/auth/callback

Handles GitHub OAuth callback.

**Query Parameters**:
- `code`: Authorization code from GitHub
- `state`: CSRF protection token

**Response**: Redirect to home page with session cookie (on success) or error page (on failure)

## Logging

All authentication events are logged with structured JSON format:

```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "level": "INFO",
  "event": "auth.user.created",
  "message": "New user created",
  "metadata": {
    "userId": "uuid",
    "githubId": 12345
  }
}
```

Log levels:
- **INFO**: Successful operations (login, user creation, session creation)
- **WARN**: Rate limits, validation failures
- **ERROR**: OAuth failures, database errors, network errors
