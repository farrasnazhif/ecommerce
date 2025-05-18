import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/shared/header/menu";
import MainNav from "./main-nav";
import { getAllProducts } from "@/lib/actions/product.action";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: allProducts } = await getAllProducts({
    query: "all",
    limit: 10,
    page: 1,
  });
  return (
    <>
      <div className="flex flex-col"></div>
      <div className="border-b contaniner mx-auto">
        <div className="flex items-center h-16 px-4">
          <Link href="/" className="w-22">
            <Image
              src="/images/logo.svg"
              alt={APP_NAME}
              height={48}
              width={48}
            />
          </Link>
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center spcae-x-4">
            <Menu products={allProducts} />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6 container mx-auto">
        {children}
      </div>
    </>
  );
}
