'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import logo from '/app/logo.png'
import name from '/app/name.png'
import { resolveHref } from '@/sanity/lib/utils'
import type { MenuItem, SettingsPayload } from '@/types'

interface NavbarProps {
  data: SettingsPayload
}

export default function Navbar(props: NavbarProps) {
  const { data } = props

  const menuItems = data?.menuItems || ([] as MenuItem[])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div
        className={`sticky top-0 z-10 flex flex-wrap items-center justify-between px-4 py-4 transition-all duration-300 ${
          isScrolled ? 'bg-custom-light shadow-lg' : 'bg-white'
        } md:px-16 md:py-2 lg:px-32`}
      >
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src={logo.src}
              alt="Logo"
              height={100}
              width={200}
              className="w-24 h-24"
            />
            <Image
              src={name.src}
              alt="Name"
              height={100}
              width={200}
              className="pl-5 w-48 lg:w-72"
            />
          </Link>
        </div>
        <div className="flex md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-blue focus:outline-none"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="#015d9d"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMobileMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16m-7 6h7'
                }
              />
            </svg>
          </button>
        </div>
        <div className="hidden md:flex md:flex-grow md:items-end md:justify-end mr-8 text-indigo-600">
          {menuItems.map((menuItem, key) => {
            const href = resolveHref(menuItem?._type, menuItem?.slug)
            if (!href) {
              return null
            }
            return (
              <Link
                key={key}
                className={`block text-lg font-bold hover:text-custom-green md:ml-8 md:text-xl ${
                  menuItem?._type === 'home'
                    ? 'font-extrabold text-black'
                    : 'text-custom-blue'
                }`}
                href={href}
                aria-label={`Navigate to ${menuItem.title} page`}
              >
                {menuItem.title}
              </Link>
            )
          })}
          <Link
            className="block text-lg font-bold hover:text-custom-green md:ml-8 md:text-xl text-custom-blue"
            href="/posts"
          >
            Blog
          </Link>
        </div>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden w-full"
        >
          {isMobileMenuOpen && (
            <div className="flex justify-center py-2">
              <h2 className="text-3xl py-4 font-bold text-custom-blue">
                <span className="flex justify-center">Welcome to</span>
                {data?.title}
              </h2>
            </div>
          )}
          <div className="flex flex-col items-center">
            {menuItems.map((menuItem, key) => {
              const href = resolveHref(menuItem?._type, menuItem?.slug)
              if (!href) {
                return null
              }
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * key }}
                >
                  <Link
                    className={`block text-lg md:text-base font-bold hover:text-gray-300 text-gray-600 p-4 ${
                      menuItem?._type === 'home'
                        ? 'font-extrabold text-black'
                        : 'text-gray-600'
                    }`}
                    href={href}
                    style={{ minWidth: '44px', minHeight: '44px' }}
                    onClick={closeMobileMenu}
                  >
                    {menuItem.title}
                  </Link>
                </motion.div>
              )
            })}
            <Link
              className="block text-lg md:text-base font-bold hover:text-gray-300 text-gray-600 p-4"
              href="/posts"
              style={{ minWidth: '44px', minHeight: '44px' }}
              onClick={closeMobileMenu}
            >
              Blog
            </Link>
            {/* Add Contact Us button for mobile view */}
            <Link
              href="/contact"
              className="md:hidden py-4 px-3 text-sm my-2 font-medium rounded-lg border border-transparent bg-custom-blue text-white hover:bg-green-500 focus:outline-none focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
          </div>
        </motion.div>

        <Link
          href="/contact"
          className="hidden md:block py-3 px-4 items-center gap-x-2 text-md font-medium rounded-lg border border-transparent bg-custom-blue text-white hover:bg-green-500 focus:outline-none focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
          onClick={closeMobileMenu}
        >
          Contact Us
        </Link>
      </div>
      <div className="flex-col py-2 bg-custom-blue">
        <div className="flex justify-center">
          <p className="flex row text-sm md:text-lg text-white font-bold">
            Call Now for a Free Consultation: &nbsp;{data?.phoneNumber}
          </p>
        </div>
      </div>
    </>
  )
}
