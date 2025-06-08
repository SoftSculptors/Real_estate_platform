'use client';

import { useEffect } from 'react';

export default function MetadataDebug() {
  useEffect(() => {
    // Log all meta tags
    const metaTags = document.querySelectorAll('meta');
    console.log('All meta tags:', Array.from(metaTags).map(tag => ({
      name: tag.getAttribute('name'),
      property: tag.getAttribute('property'),
      content: tag.getAttribute('content')
    })));

    // Log OpenGraph specific tags
    const ogTags = document.querySelectorAll('meta[property^="og:"]');
    console.log('OpenGraph tags:', Array.from(ogTags).map(tag => ({
      property: tag.getAttribute('property'),
      content: tag.getAttribute('content')
    })));
  }, []);

  return null;
}
