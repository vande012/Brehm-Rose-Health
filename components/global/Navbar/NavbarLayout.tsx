'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import logo from '/app/logo.png'
import name from '/app/name.png'
import { resolveHref } from '@/sanity/lib/utils'
import type { MenuItem, SettingsPayload } from '@/types'
import { motion } from 'framer-motion'

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div
        className={`sticky top-0 z-10 flex flex-wrap items-center justify-between px-4 py-4 backdrop-blur transition-all duration-300 ${
          isScrolled ? 'bg-gray-100 shadow-lg' : 'bg-white'
        } md:px-16 md:py-5 lg:px-32`}
      >
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <img src={logo.src} alt="Logo" />
            <img src={name.src} alt="Name" className="pl-3 w-52" />
          </Link>
        </div>
        <div className="flex md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-blue focus:outline-none"
          >
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="#015d9d" //hamburger color
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
        <div className="hidden md:flex md:flex-grow md:items-center md:justify-center lg:mr-20 text-indigo-600">
          {menuItems.map((menuItem, key) => {
            const href = resolveHref(menuItem?._type, menuItem?.slug)
            if (!href) {
              return null
            }
            return (
              <Link
                key={key}
                className={`block text-lg font-bold hover:text-gray-700 md:ml-4 md:text-xl ${
                  menuItem?._type === 'home'
                    ? 'font-extrabold text-black'
                    : 'text-custom-blue'
                }`}
                href={href}
              >
                {menuItem.title}
              </Link>
            )
          })}
        </div>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden w-full"
        >
          {isMobileMenuOpen && (
            <div className="flex justify-center py-2">
              <h2 className="text-3xl py-4 font-bold text-gray-700">
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
                    className={`block py-2 px-4 text-xl font-bold text-gray-700 ${
                      menuItem?._type === 'home'
                        ? 'font-extrabold text-black'
                        : 'text-gray-600'
                    }`}
                    href={href}
                  >
                    {menuItem.title}
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <Link
          href="/contact"
          className="hidden md:block py-3 px-4 items-center gap-x-2 text-md font-medium rounded-lg border border-transparent bg-custom-blue text-white hover:bg-green-500 focus:outline-none focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          Contact
        </Link>
      </div>
      <div className="flex-col py-2 bg-custom-blue">
        <div className="flex justify-center">
          <p className="flex row text-sm md:text-lg font-medium text-white">
            Call Now for a Free Consultation:
            <p className="text-sm md:text-lg font-bold text-white sm:text-sm">
              {' '}
              &nbsp;{data?.phoneNumber}
            </p>
          </p>
        </div>
      </div>
    </>
  )
}
