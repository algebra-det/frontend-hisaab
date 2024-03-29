import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { userContext } from '@/contexts/userContext'
import { useContext, useEffect } from 'react'
import { getCookie, deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function ProfileButton() {
  const router = useRouter()
  const { user, setUser } = useContext(userContext)

  const checkAndSetUser = async () => {
    const auth = getCookie('authorization')
    if (auth) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify`,
        {
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            token: JSON.parse(JSON.stringify(auth))
          })
        }
      )
      if (response.ok) {
        const userResponse = await response.json()
        setUser(userResponse.data)
      }
    } else {
      setUser({
        id: 0,
        name: 'g',
        email: '',
        role: '',
        token: ''
      })
    }
  }

  useEffect(() => {
    checkAndSetUser()
  }, [])

  const handleLogout = () => {
    deleteCookie('authorization')
    setUser({ id: 0, name: 'g', email: '', role: '', token: '' })
    router.push('/login?logout=success')
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {/* <AvatarImage src='https://github.com/shadcnj.png' /> */}
          <AvatarFallback>
            {user?.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {user?.token ? (
          <>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </>
        ) : (
          <>
            <Link href='/login'>
              <DropdownMenuItem>Login</DropdownMenuItem>
            </Link>
            <Link href='/signup'>
              <DropdownMenuItem>Sign Up</DropdownMenuItem>
            </Link>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileButton
