'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Er is iets misgegaan</h1>
        <p className="text-gray-600 mb-8">
          Onze excuses voor het ongemak. Probeer het later opnieuw.
        </p>
        <button
          onClick={reset}
          className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Probeer opnieuw
        </button>
      </div>
    </div>
  );
}
