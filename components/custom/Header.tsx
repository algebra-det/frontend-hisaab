'use client'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Container from './Container'
import { IndianRupee, Menu, Moon, Sun } from 'lucide-react'
import ProfileButton from './ProfileButton'
import { useState } from 'react'
import UserContext from '@/contexts/userContext'

const routes = [
  {
    href: '/transactions',
    label: 'Transactions'
  },
  {
    href: '/products',
    label: 'Products'
  }
]

function Header({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()
  const [openSheet, setOpenSheet] = useState(false)

  return (
    <UserContext>
      <header className='sm:flex sm:justify-between py-3 px-4 border-b'>
        <Container>
          <div className='relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full'>
            <div className='flex items-center'>
              <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                <SheetTrigger>
                  <Menu className='h-6 md:hidden w-6' />
                </SheetTrigger>
                <SheetContent side='left' className='w-[300px] sm:w-[400]'>
                  <nav className='flex flex-col gap-4'>
                    {routes.map((route, i) => (
                      // <Button key={i} asChild variant='ghost'>
                      <Link
                        key={i}
                        href={route.href}
                        className='block px-2 py-1 text-lg'
                        onClick={() => setOpenSheet(false)}
                      >
                        {route.label}
                      </Link>
                      // </Button>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
              <Link href='/' className='ml-4 lg:ml-0'>
                <IndianRupee />
              </Link>
            </div>
            <nav className='mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block'>
              {routes.map((route, i) => (
                <Button key={i} asChild variant='ghost'>
                  <Link
                    href={route.href}
                    className='text-sm font-medium transition-colors'
                  >
                    {route.label}
                  </Link>
                </Button>
              ))}
            </nav>
            <div className='flex items-center'>
              <Button
                variant='ghost'
                size='icon'
                className='mr-2'
                aria-label='Toggle Theme'
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                <Sun className='h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                <Moon className=' absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                <span className='sr-only'>Toggle Theme</span>
              </Button>
              <ProfileButton />
            </div>
          </div>
        </Container>
      </header>
      <Container>{children}</Container>
    </UserContext>
  )
}

export default Header
