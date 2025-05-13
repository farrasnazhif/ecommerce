"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

const ProductCarousel = ({ data }: { data: Product[] }) => {
  return (
    <Carousel
      className="w-full mb-12 "
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        {data.map((product: Product) => (
          <CarouselItem key={product.id}>
            <Link href={`/product/${product.slug}`}>
              <div className="relative mx-auto h-[250px] sm:h-[400px] lg:h-[561px] overflow-hidden rounded-md">
                <Image
                  src={product.banner!}
                  alt={product.name}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex items-end justify-center">
                  {/* <h2 className="bg-gray-900 bg-opacity-50 text-2xl text-white px-2 font-bold">
                    {product.name}
                  </h2> */}
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden sm:block">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};

export default ProductCarousel;
