'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { uploadPropertyListing } from '../../utils/akave';
import WorldIDVerification from '../components/WorldIDVerification';

interface PropertyForm {
  size: string;
  layout: string;
  hasBalcony: boolean;
  hasTerrace: boolean;
  views: string;
  neighborhood: string;
  budget: string;
  deposit: string;
}

const initialForm: PropertyForm = {
  size: '',
  layout: '',
  hasBalcony: false,
  hasTerrace: false,
  views: '',
  neighborhood: '',
  budget: '',
  deposit: ''
};

export default function OfferPage() {
  const router = useRouter();
  const [form, setForm] = useState<PropertyForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) {
      setError('Please verify with World ID first');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await uploadPropertyListing({
        ...form,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      });
      router.push('/success');
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to submit listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-8 px-4 py-6 sm:p-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">Property Details</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Provide accurate information about your property to help potential tenants find their perfect match.
              </p>
            </div>

            {/* World ID Verification */}
            {!isVerified && (
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-sm font-medium leading-6 text-gray-900 mb-4">Verification Required</h3>
                <WorldIDVerification
                  onSuccess={() => {
                    setIsVerified(true);
                    setError(null);
                  }}
                  onError={(error) => setError(error)}
                />
                {error && (
                  <p className="mt-2 text-sm text-rose-600">{error}</p>
                )}
              </div>
            )}

            {/* Form Fields */}
            <div className={`grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 ${!isVerified ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="sm:col-span-1">
                <label htmlFor="size" className="block text-sm font-medium leading-6 text-gray-900">
                  Size (sqm)
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="size"
                    id="size"
                    value={form.size}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="layout" className="block text-sm font-medium leading-6 text-gray-900">
                  Layout
                </label>
                <div className="mt-2">
                  <select
                    name="layout"
                    id="layout"
                    value={form.layout}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                    required
                  >
                    <option value="">Select layout</option>
                    <option value="studio">Studio</option>
                    <option value="1br">1 Bedroom</option>
                    <option value="2br">2 Bedrooms</option>
                    <option value="3br">3 Bedrooms</option>
                    <option value="4br+">4+ Bedrooms</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                  Features
                </label>
                <div className="space-y-3">
                  <div className="relative flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        type="checkbox"
                        name="hasBalcony"
                        checked={form.hasBalcony}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 text-rose-600 focus:ring-rose-600"
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label htmlFor="hasBalcony" className="text-gray-900">Balcony</label>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        type="checkbox"
                        name="hasTerrace"
                        checked={form.hasTerrace}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 text-rose-600 focus:ring-rose-600"
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label htmlFor="hasTerrace" className="text-gray-900">Terrace</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="views" className="block text-sm font-medium leading-6 text-gray-900">
                  Views
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="views"
                    id="views"
                    value={form.views}
                    onChange={handleChange}
                    placeholder="e.g., City view, Garden view"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="neighborhood" className="block text-sm font-medium leading-6 text-gray-900">
                  Neighborhood
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="neighborhood"
                    id="neighborhood"
                    value={form.neighborhood}
                    onChange={handleChange}
                    placeholder="e.g., Downtown, West End"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="budget" className="block text-sm font-medium leading-6 text-gray-900">
                  Monthly Rent
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="budget"
                    id="budget"
                    value={form.budget}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="deposit" className="block text-sm font-medium leading-6 text-gray-900">
                  Deposit
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="deposit"
                    id="deposit"
                    value={form.deposit}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !isVerified}
                className="rounded-md bg-rose-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'List Property'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 