import type { PortableTextBlock } from 'next-sanity'
import Link from 'next/link'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import type { SettingsPayload, MenuItem } from '@/types'
import logo from '/app/logo.png'
import name from '/app/name.png'
import { resolveHref } from '@/sanity/lib/utils'

interface FooterProps {
  data: SettingsPayload
}

export default function Footer(props: FooterProps) {
  const { data } = props
  const footer = data?.footer || ([] as PortableTextBlock[])
  const menuItems = data?.menuItems || ([] as MenuItem[])

  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Contact Info */}
          <div className="flex flex-col items-center">
            <Link href="/" className="flex items-center mb-4">
              <img src={logo.src} alt="Logo" className="w-12 h-12" />
              <img src={name.src} alt="Name" className="pl-3 w-52" />
            </Link>
            <div className="text-black font-bold mb-2">{data?.phoneNumber}</div>
            {footer && (
              <div className="mt-4 text-center">
                <CustomPortableText
                  paragraphClasses="text-md text-gray-600"
                  value={footer}
                />
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav
            className="flex flex-col items-center md:items-start"
            aria-label="Footer links"
          >
            <h3 className="font-bold text-lg mb-4 md:ml-10">Site Links</h3>
            {menuItems.map((menuItem, key) => {
              const href = resolveHref(menuItem?._type, menuItem?.slug)
              if (!href) {
                return null
              }
              return (
                <Link
                  key={key}
                  className="py-1 text-md text-gray-600 hover:text-gray-900 md:ml-10"
                  href={href}
                >
                  {menuItem.title}
                </Link>
              )
            })}
            <Link
              className="py-1 text-md text-gray-600 hover:text-gray-900 md:ml-10"
              href="/posts"
            >
              Blog
            </Link>
          </nav>

          {/* Legal Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <Link
              className="py-1 text-md text-gray-600 hover:text-gray-900"
              href="/sitemap"
            >
              Sitemap
            </Link>
            <Link
              className="py-1 text-md text-gray-600 hover:text-gray-900 "
              href="/terms-and-conditions"
            >
              Terms & Conditions
            </Link>
            <Link
              className="py-1 text-md text-gray-600 hover:text-gray-900"
              href="/privacy-policy"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Copyright and Attribution */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-md text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Brehm-Rose Health LLC. All rights
            reserved.
          </p>
          <p className="mt-2">Website by Ryan Vandehey</p>
        </div>
      </div>
    </footer>
  )
}
