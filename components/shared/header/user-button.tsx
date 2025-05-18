import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { signOutUser } from "@/lib/actions/user.action";
import { UserIcon } from "lucide-react";
import Link from "next/link";

const UserButton = async () => {
  const session = await auth();

  if (!session) {
    return (
      <Link href="/sign-in">
        <Button variant="ghost" className="flex items-center gap-2 px-3 py-2">
          <p className="text-sm font-medium">Sign In</p>
          <UserIcon className="h-4 w-4" />
        </Button>
      </Link>
    );
  }

  const firstName = session.user?.name?.split(" ")?.[0] ?? "User";

  return (
    <div className="flex items-center gap-2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className=" px-0 py-2  bg-transparent">
              <div className="hover:text-slate-500 transition-all flex items-center gap-2">
                <p className="text-sm font-medium ">Hi, {firstName}</p>
                <UserIcon className="h-4 w-4 " />
              </div>
            </NavigationMenuTrigger>

            <NavigationMenuContent className="w-56 space-y-2 p-2">
              {/* User Info */}
              <div className="bg-slate-100 p-2 rounded-sm">
                <div className="text-sm font-medium">{session.user?.name}</div>
                <div className="text-sm text-muted-foreground">
                  {session.user?.email}
                </div>
              </div>

              {/* Menu Links */}
              <NavigationMenuLink asChild>
                <Link
                  href="/user/profile"
                  className="block px-2 py-1 text-sm hover:bg-slate-50 rounded"
                >
                  User Profile
                </Link>
              </NavigationMenuLink>

              <NavigationMenuLink asChild>
                <Link
                  href="/user/orders"
                  className="block px-2 py-1 text-sm hover:bg-slate-50 rounded"
                >
                  Order History
                </Link>
              </NavigationMenuLink>

              {session.user?.role === "admin" && (
                <NavigationMenuLink asChild>
                  <Link
                    href="/admin/overview"
                    className="block px-2 py-1 text-sm hover:bg-slate-50 rounded"
                  >
                    Admin
                  </Link>
                </NavigationMenuLink>
              )}

              {/* Sign Out */}
              <NavigationMenuLink asChild>
                <form action={signOutUser} className="w-full ">
                  <Button
                    type="submit"
                    variant="default"
                    className="w-full text-sm px-2 py-1 hover:bg-slate-700 block text-center"
                  >
                    Sign Out
                  </Button>
                </form>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default UserButton;
