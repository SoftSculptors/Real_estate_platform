'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { FaPhone, FaEnvelope, FaTimes } from 'react-icons/fa';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#5B3924]/20 backdrop-blur-sm z-40"></div>
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <div className="fixed right-0 top-0 bottom-0 w-full max-w-xs bg-[#FFFDF6] shadow-lg z-50 overflow-y-auto border-l border-[#E6D4A8] py-6">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-2xl font-bold text-[#5B3924]">
                          Menu
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md text-[#2F2F2F] hover:text-[#5B3924]"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <FaTimes className="h-6 w-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <nav className="flex flex-col space-y-6">
                        <Link
                          href="/"
                          className="text-[#5B3924] hover:text-[#F5C242] text-lg font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          Home
                        </Link>
                        <Link
                          href="/properties"
                          className="text-[#5B3924] hover:text-[#F5C242] text-lg font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          Woningen
                        </Link>
                        <Link
                          href="/about"
                          className="text-[#5B3924] hover:text-[#F5C242] text-lg font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          Over Ons
                        </Link>
                        <Link
                          href="/contact"
                          className="text-[#5B3924] hover:text-[#F5C242] text-lg font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          Contact
                        </Link>
                      </nav>

                      <div className="mt-10 space-y-6">
                        <a
                          href="tel:+31612345678"
                          className="flex items-center space-x-2 text-[#5B3924] hover:text-[#F5C242]"
                        >
                          <FaPhone className="h-5 w-5" />
                          <span>+31 6 1234 5678</span>
                        </a>
                        <a
                          href="mailto:info@realestate.nl"
                          className="flex items-center space-x-2 text-[#5B3924] hover:text-[#F5C242]"
                        >
                          <FaEnvelope className="h-5 w-5" />
                          <span>info@realestate.nl</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
