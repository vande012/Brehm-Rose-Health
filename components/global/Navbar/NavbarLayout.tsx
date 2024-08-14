'use client';

import { useState } from 'react';
import Link from 'next/link';
import logo from '/app/logo.png';
import { resolveHref } from '@/sanity/lib/utils';
import type { MenuItem, SettingsPayload } from '@/types';

interface NavbarProps {
  data: SettingsPayload;
}

export default function Navbar(props: NavbarProps) {
  const { data } = props;
  const menuItems = data?.menuItems || ([] as MenuItem[]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between bg-light px-4 py-4 backdrop-blur md:px-16 md:py-5 lg:px-32">
      <div className="logo w-19 h-18">
        <Link href="/">
          <img src={logo.src} alt="Logo" />
        </Link>
      </div>
      <div className="flex md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-blue focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg>
        </button>
      </div>
      <div className="hidden md:flex md:flex-grow md:items-center md:justify-center just text-blue">
        {menuItems.map((menuItem, key) => {
          const href = resolveHref(menuItem?._type, menuItem?.slug);
          if (!href) {
            return null;
          }
          return (
            <Link
              key={key}
              className={`block text-lg hover:text-black md:ml-4 md:text-xl ${
                menuItem?._type === 'home'
                  ? 'font-extrabold text-black'
                  : 'text-gray-600'
              }`}
              href={href}
            >
              {menuItem.title}
            </Link>
          );
        })}
      </div>
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} w-full`}>
      {isMobileMenuOpen && (
          <div className="flex justify-center py-2">
            <h2 className="text-xl font-bold text-black">{data?.title}</h2>
          </div>
        )}
        <div className="flex flex-col mt-4">
          {menuItems.map((menuItem, key) => {
            const href = resolveHref(menuItem?._type, menuItem?.slug);
            if (!href) {
              return null;
            }
            return (
              <Link
                key={key}
                className={`block py-2 px-4 text-lg hover:bg-blue-700 hover:text-white ${
                  menuItem?._type === 'home'
                    ? 'font-extrabold text-black'
                    : 'text-gray-600'
                }`}
                href={href}
              >
                {menuItem.title}
              </Link>
            );
          })}
        </div>
        
      </div>
      <button className="hidden md:block bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        <a href="/contact">Contact</a>
      </button>
    </div>
  );
}

