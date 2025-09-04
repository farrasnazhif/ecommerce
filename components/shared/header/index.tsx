import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import Menu from "./menu";
// import CategoryDrawer from "./category-drawer";
import Search from "./search";

import { Package2, ShoppingCart } from "lucide-react";
import CategoryOptions from "./category-options";
import { getAllProducts } from "@/lib/actions/product.action";
import { getMyCart } from "@/lib/actions/cart.action";

const Header = async () => {
  const { data: allProducts } = await getAllProducts({
    query: "all",
    limit: 10,
    page: 1,
  });

  const cart = await getMyCart();

  return (
    <header className="w-full border-b">
      <div className="hidden md:block">
        <div className="px-16 py-2 flex-between  bg-gray-100 border-b ">
          <div className="flex-start">
            <Link href="/" className="flex-start ml-4 ">
              <span className="hidden md:block font-semibold text-lg ml-2 ">
                {APP_NAME}
              </span>
            </Link>
          </div>
          <Menu products={allProducts} />
        </div>
      </div>

      <div className="py-4 md:px-12 flex justify-between items-center">
        <div className="flex-start">
          <Link href="/" className="flex-start ml-4 mr-36 ">
            <Image
              src="/images/logo.svg"
              alt={`${APP_NAME} logo`}
              height={48}
              width={48}
              priority={true}
            />
          </Link>
        </div>

        <div className="hidden xl:block">
          <CategoryOptions />
        </div>

        <div className="hidden md:flex  max-w-xs">
          <div className="relative mr-4">
            <Search />
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-full p-2 hover:bg-gray-100">
              <Link href="/user/orders">
                <Package2 className="h-5 w-5" />
              </Link>
            </button>

            <button className="rounded-full p-2 hover:bg-gray-100">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {(cart?.items?.length ?? 0) > 0 && (
                  <span
                    key={cart?.items?.length ?? 0}
                    className="absolute -translate-y-[140%] text-xs font-extrabold text-white bg-[hsl(0,0%,0%)] w-5 h-5flex items-center justify-center rounded-full border-2 border-white animate-fadeIn"
                  >
                    {cart?.items?.length ?? 0}
                  </span>
                )}
              </Link>
            </button>
          </div>
        </div>

        <div className="md:hidden flex items-center mr-6">
          <Menu products={allProducts} />
        </div>
      </div>
    </header>
  );
};

export default Header;
