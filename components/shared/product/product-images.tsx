"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="flex gap-4 md:flex-col">
      <div className="relative w-full max-w-[400px] aspect-square">
        <Image
          src={images[current]}
          alt="Selected product image"
          fill
          className="object-cover rounded"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
      <div className="space-y-2 md:flex md:space-y-0">
        {images.map((image, index) => (
          <div
            key={image}
            onClick={() => setCurrent(index)}
            className={cn(
              "border mr-2 cursor-pointer hover:border-orange-600",
              current === index && "border-orange-500"
            )}
          >
            <Image src={image} alt="image" width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
