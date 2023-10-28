import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userContext } from "@/contexts/userContext";
import { useContext } from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "@/types";

function ProfileButton() {
  const router = useRouter();
  const context = useContext(userContext);

  const handleLogout = () => {
    deleteCookie("authorization");
    if (context) {
      context.setUser({ id: 0, name: "g", role: "", token: "" });
      router.push("/login?logout=success");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {/* <AvatarImage src='https://github.com/shadcnj.png' /> */}
          <AvatarFallback>
            {context &&
              context.user &&
              context.user.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {context && context.user && context.user.token ? (
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
  );
}

export default ProfileButton;
