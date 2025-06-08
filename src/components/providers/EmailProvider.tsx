'use client';

import { useEffect } from 'react';
import emailjs from '@emailjs/browser';

export default function EmailProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    emailjs.init('YOUR_PUBLIC_KEY'); // Vervang dit met je eigen public key
  }, []);

  return <>{children}</>;
}
