/**
 * Authentication Error Page
 * Displays user-friendly error messages for authentication failures
 */

'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  const errorMessages = {
    cancelled: {
      title: 'Authentication Cancelled',
      description: 'You cancelled the GitHub authorization. Please try again if you want to sign in.'
    },
    auth_failed: {
      title: 'Authentication Failed',
      description: 'We couldn\'t complete the authentication process. Please try again.'
    },
    invalid_request: {
      title: 'Invalid Request',
      description: 'The authentication request was invalid. Please try again.'
    }
  };

  const error = errorMessages[message] || errorMessages.auth_failed;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {error.title}
        </h1>
        
        <p className="text-gray-600 mb-8">
          {error.description}
        </p>
        
        <a
          href="/api/auth/github"
          className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Try Again
        </a>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}
