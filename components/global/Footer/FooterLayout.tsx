import type { PortableTextBlock } from 'next-sanity'
import Link from 'next/link'
import { CustomPortableText } from '@/components//shared/CustomPortableText'
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
    <footer className="bottom-0 w-full bg-gray-100 py-12 text-center md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-center ">
          <div className="flex flex-col md:w-1/3">
            <Link href="/" className="flex items-center self-start">
              <img src={logo.src} alt="Logo" />
              <img src={name.src} alt="Name" className="pl-3 w-52" />
            </Link>
            {footer && (
              <div className="mt-4 md:mt-6 md:max-w-md">
                <CustomPortableText
                  paragraphClasses="text-sm md:text-base"
                  value={footer}
                />
              </div>
            )}
          </div>
          <nav
            className="mt-8 md:mt-0 md:mx-auto md:w-2/3"
            aria-label="Footer links"
          >
            <div className="flex flex-col md:space-y-4">
              {menuItems.map((menuItem, key) => {
                const href = resolveHref(menuItem?._type, menuItem?.slug)
                if (!href) {
                  return null
                }
                return (
                  <Link
                    key={key}
                    className={`block text-sm md:text-base font-bold hover:text-gray-700 md:w-full md:text-center ${
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
          </nav>
        </div>
      </div>
    </footer>
  )
}
