import { Button } from "@/components/ui/button";
import {
  Contact,
  MenuIcon,
  Package2,
  SearchIcon,
  ShoppingCart,
  User2,
  UserIcon,
} from "lucide-react";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserButton from "./user-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { auth } from "@/auth";
import { signOutUser } from "@/lib/actions/user.action";
import { Product } from "@/types";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Search from "./search";

const Menu = async ({ products }: { products: Product[] }) => {
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
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <div className="flex items-center gap-4">
          <p className="text-sm font-medium hover:text-slate-500 transition-all cursor-pointer">
            Contact Us
          </p>
          <div className="h-4 w-[1px] bg-gray-400" />
          <UserButton />
        </div>
      </nav>

      <nav className="md:hidden">
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full p-2 hover:bg-gray-100">
                <SearchIcon className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-2 w-[250px] ">
              <Search />
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full p-2 hover:bg-gray-100">
                <User2 className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-2 w-[250px] ">
              <div className="bg-slate-100 p-2 rounded-sm">
                <div className="text-sm font-medium">{session.user?.name}</div>
                <div className="text-sm text-muted-foreground">
                  {session.user?.email}
                </div>
              </div>

              <Link
                href="/user/profile"
                className="block px-2 py-1 text-sm hover:bg-slate-50 rounded"
              >
                User Profile
              </Link>

              <Link
                href="/user/orders"
                className="block px-2 py-1 text-sm hover:bg-slate-50 rounded"
              >
                Order History
              </Link>

              {session.user?.role === "admin" && (
                <Link
                  href="/admin/overview"
                  className="block px-2 py-1 text-sm hover:bg-slate-50 rounded"
                >
                  Admin
                </Link>
              )}

              <form action={signOutUser} className="w-full ">
                <Button
                  type="submit"
                  variant="default"
                  className="w-full text-sm px-2 py-1 hover:bg-slate-700 block text-center"
                >
                  Sign Out
                </Button>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="rounded-full p-2 hover:bg-gray-100">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </button>

          <Sheet>
            <SheetTrigger className="align-middle">
              <button className="rounded-full p-2 hover:bg-gray-100">
                <MenuIcon />
              </button>
            </SheetTrigger>
            <SheetContent className="flex flex-col items-start">
              <SheetTitle>Menu</SheetTitle>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="hover:text-slate-500 transition-all flex items-center gap-2">
                      <p className="text-sm font-medium ">Hi, {firstName}</p>
                      <UserIcon className="h-4 w-4 " />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-slate-100 p-2 rounded-sm">
                      <div className="text-sm font-medium">
                        {session.user?.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {session.user?.email}
                      </div>
                    </div>
                  </AccordionContent>
                  <AccordionContent>
                    <Link
                      href="/user/profile"
                      className="block px-2 py-1 text-sm hover:bg-slate-50 rounded"
                    >
                      User Profile
                    </Link>
                  </AccordionContent>
                  <AccordionContent>
                    <Link
                      href="/user/orders"
                      className="block px-2 py-1 text-sm hover:bg-slate-50 rounded"
                    >
                      Order History
                    </Link>
                  </AccordionContent>

                  {session.user?.role === "admin" && (
                    <AccordionContent>
                      <Link
                        href="/admin/overview"
                        className="block px-2 py-1 text-sm hover:bg-slate-50 rounded"
                      >
                        Admin
                      </Link>
                    </AccordionContent>
                  )}

                  <AccordionContent>
                    <form action={signOutUser} className="w-full ">
                      <Button
                        type="submit"
                        variant="default"
                        className="w-full text-sm px-2 py-1 hover:bg-slate-700 block text-center"
                      >
                        Sign Out
                      </Button>
                    </form>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <p className="text-md font-medium hover:text-slate-700 transition-all cursor-pointer hover:underline">
                      New & Featured
                    </p>
                  </AccordionTrigger>
                  <AccordionContent>
                    {products
                      .filter((product) => product.isFeatured)
                      .map((product) => (
                        <Link
                          key={product.slug}
                          href={`/product/${product.slug}`}
                          className="block px-2 py-1 text-sm hover:bg-slate-50 rounded"
                        >
                          {product.name}
                        </Link>
                      ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <p className="text-md font-medium hover:text-slate-700 transition-all cursor-pointer hover:underline">
                      Men&apos;s Shoes
                    </p>
                  </AccordionTrigger>
                  <AccordionContent>
                    {products
                      .filter((product) => product.category === "Men's Shoes")
                      .map((product) => (
                        <Link
                          key={product.slug}
                          href={`/product/${product.slug}`}
                          className="block px-2 py-1 text-sm hover:bg-slate-50 rounded"
                        >
                          {product.name}
                        </Link>
                      ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    <p className="text-md font-medium hover:text-slate-700 transition-all cursor-pointer hover:underline">
                      Women&apos;s Shoes
                    </p>
                  </AccordionTrigger>
                  <AccordionContent>
                    {products
                      .filter((product) => product.category === "Women's Shoes")
                      .map((product) => (
                        <Link
                          key={product.slug}
                          href={`/product/${product.slug}`}
                          className="block px-2 py-1 text-sm hover:bg-slate-50 rounded"
                        >
                          {product.name}
                        </Link>
                      ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="flex-start">
                <Link href="/" className="flex-start mt-12 mb-12">
                  <Image
                    src="/images/logo.svg"
                    alt={`${APP_NAME} logo`}
                    height={32}
                    width={32}
                    priority={true}
                  />
                </Link>
              </div>

              <button className="cursor-pointer w-full mb-2">
                <Link href="/cart" className="flex items-center p-0 gap-4">
                  <ShoppingCart className="w-6 h-6" strokeWidth={1.3} />
                  <p className="font-semibold ">Cart</p>
                </Link>
              </button>

              <button className="cursor-pointer w-full mb-2">
                <Link href="/cart" className="flex items-center p-0 gap-4">
                  <Package2 className="w-6 h-6" strokeWidth={1.3} />
                  <p className="font-semibold">Orders</p>
                </Link>
              </button>

              <button className="cursor-pointer w-full ">
                <Link href="/cart" className="flex items-center p-0 gap-4">
                  <Contact className="w-6 h-6" strokeWidth={1.3} />
                  <p className="font-semibold">Contact Us</p>
                </Link>
              </button>

              <SheetDescription></SheetDescription>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
