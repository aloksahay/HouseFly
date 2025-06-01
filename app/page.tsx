import React from 'react';
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-full bg-white">
      {/* Search Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a location..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6">
        <h1 className="text-2xl font-semibold mb-6">Find your next home</h1>
        
        {/* Featured Categories */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link href="/search?type=apartment" 
            className="relative rounded-lg overflow-hidden aspect-square">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400"
              alt="Apartments"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute bottom-3 left-3 text-white font-medium">Apartments</span>
          </Link>
          
          <Link href="/search?type=house"
            className="relative rounded-lg overflow-hidden aspect-square">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
            <img
              src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=400"
              alt="Houses"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute bottom-3 left-3 text-white font-medium">Houses</span>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium mb-3">Quick Actions</h2>
          
          <Link href="/offer"
            className="block p-4 bg-rose-50 rounded-xl">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-12 w-12 bg-rose-100 rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-900">List Your Property</h3>
                <p className="text-sm text-gray-500">Create a listing in minutes</p>
              </div>
              <svg className="ml-auto h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link href="/search"
            className="block p-4 bg-blue-50 rounded-xl">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-900">Find a Place</h3>
                <p className="text-sm text-gray-500">Browse verified properties</p>
              </div>
              <svg className="ml-auto h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
} 