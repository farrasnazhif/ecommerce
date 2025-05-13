// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {Card, CardContent} from "@/components/ui/card";
import AddToCart from "@/components/shared/product/add-to-cart";
import ProductImages from "@/components/shared/product/product-images";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getProductBySlug } from "@/lib/actions/product.action";
import convertIDR from "@/utils/currency";
import { notFound } from "next/navigation";
import { getMyCart } from "@/lib/actions/cart.action";
import ReviewList from "./review-list";
import { auth } from "@/auth";
import Rating from "@/components/shared/product/rating";

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const session = await auth();
  const userId = session?.user?.id;

  const cart = await getMyCart();
  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="col-span-2">
            <ProductImages images={product.images} />
          </div>
          <div className="col-span-2 p-5">
            <div className="flex flex-col gap-6">
              <p>
                {product.brand} {product.category}
              </p>
              <h1 className="h3-bold">{product.name}</h1>
              <Rating value={Number(product.rating)} />
              <p>{product.numReviews} reviews</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="w-30 rounded-full bg-green-100 text-green-700 px-5 py-2 font-bold">
                  {convertIDR(Number(product.price))}
                </div>
              </div>
              <div className="mt-4">
                <p className="font-semibold">Description</p>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
          {/* Action Column */}
          <div className="w-full">
            <Card>
              <CardContent className="p-4 space-y-3">
                {/* Price Row */}
                <div className="flex justify-between flex-wrap gap-2 text-sm sm:text-base">
                  <div>Price</div>
                  <div className="font-bold">
                    {convertIDR(Number(product.price))}
                  </div>
                </div>

                {/* Status Row */}
                <div className="flex justify-between flex-wrap gap-2 text-sm sm:text-base">
                  <div>Status</div>
                  {product.stock > 0 ? (
                    <Badge variant="outline">In Stock</Badge>
                  ) : (
                    <Badge variant="destructive">Out Of Stock</Badge>
                  )}
                </div>

                {/* Add to Cart */}
                {product.stock > 0 && (
                  <div className="flex justify-center mt-4">
                    <AddToCart
                      cart={cart}
                      item={{
                        productId: product.id,
                        name: product.name,
                        slug: product.slug,
                        price: product.price,
                        qty: 1,
                        image: product.images![0],
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <hr className=" mt-8  border-slate-500 mb-8" />
      <section>
        <h2 className="h2-bold flex-center mb-8">Customer Reviews</h2>
        <ReviewList
          userId={userId || ""}
          productId={product.id}
          productSlug={product.slug}
        />
      </section>
    </>
  );
};

export default ProductDetailsPage;
