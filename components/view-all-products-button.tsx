import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const ViewAllProductsButton = () => {
  return (
    <div className="flex justify-center items-center my-8">
      <Button asChild className="px-8 py-4 text-lg font-semibold">
        <Link href="/search">
          <h1 className="hover:underline ">View All Products</h1>
        </Link>
      </Button>
    </div>
  );
};

export default ViewAllProductsButton;
