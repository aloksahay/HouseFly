import React from 'react';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="rounded-full h-24 w-24 bg-green-100 mx-auto flex items-center justify-center">
          <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Listing Created Successfully!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your property has been listed. We'll notify you when someone shows interest.
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <Link 
            href="/"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Home
          </Link>
          <Link 
            href="/offer"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            List Another Property
          </Link>
        </div>
      </div>
    </main>
  );
} 