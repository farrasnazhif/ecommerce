import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Product } from "@/types";
import convertIDR from "@/utils/currency";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Star } from "lucide-react";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="w-full max-w-sm flex flex-col">
      <CardHeader className="p-0">
        <Link
          href={`/product/${product.slug}`}
          className="block relative w-full aspect-[4/3]" // Maintain aspect ratio
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover rounded-t-md"
            sizes="(max-width: 768px) 100vw, 300px"
            priority
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex flex-col gap-3">
        <h1 className="text-md font-bold">{product.brand}</h1>

        <Link href={`/product/${product.slug}`}>
          <h2 className="text-sm font-medium max-w-[200px]">{product.name}</h2>
        </Link>

        <div className="flex-between gap-4">
          {product.stock > 0 ? (
            <p className="font-bold">{convertIDR(product.price)}</p>
          ) : (
            <p className="text-destructive">Out Of Stock</p>
          )}
          <div className="flex gap-1 items-center">
            <p className="text-xs">{product.rating}</p>
            <Star className="w-3.5 h-3.5" fill="yellow" strokeWidth={1.5} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
