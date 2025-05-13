import ProductCard from "@/components/shared/product/product-card";
import { Button } from "@/components/ui/button";
import { getAllCategories, getAllProducts } from "@/lib/actions/product.action";
import Link from "next/link";

const prices = [
  {
    name: "Rp500.000 - Rp1.000.000",
    value: "500000-1000000",
  },
  {
    name: "Rp1.000.000 - Rp2.000.000",
    value: "1000000-2000000",
  },
  {
    name: "Rp2.000.000 - Rp3.000.000",
    value: "2000000-3000000",
  },
  {
    name: "Rp3.000.000 & Up",
    value: "3000000-10000000",
  },
];

const ratings = [4, 3, 2, 1];

const sortOrders = ["Newest", "Lowest", "Highest", "Rating"];

export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string;
    category: string;
    price: string;
    rating: string;
  }>;
}) {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
  } = await props.searchParams;

  const isQuerySet = q && q !== "all" && q.trim() !== "";
  const isCategorySet =
    category && category !== "all" && category.trim() !== "";
  const isPriceSet = price && price !== "all" && price.trim() !== "";
  const isRatingSet = rating && rating !== "all" && rating.trim() !== "";

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `
      Search ${isQuerySet ? q : ""} 
      ${isCategorySet ? `: ${category}` : ""}
       ${isPriceSet ? `: Price ${price}` : ""}
       ${isRatingSet ? `: Rating ${rating}` : ""}
      `,
    };
  } else {
    return {
      title: "Search Products",
    };
  }
}

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;

  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };

    if (c) params.category = c;
    if (s) params.sort = s;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
  });

  const categories = await getAllCategories();

  return (
    <div className="grid md:grid-cols-5 md:gap-5 ">
      <div className="filter-links">
        {/* Category Links */}
        <div className="text-xl mb-2 mt-3">Category</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                className={`${
                  (category === "all" || category === "") && "font-bold"
                }`}
                href={getFilterUrl({ c: "all" })}
              >
                Any
              </Link>
            </li>
            {categories.map((x) => (
              <li key={x.category}>
                <Link
                  className={`${category === x.category && "font-bold"}`}
                  href={getFilterUrl({ c: x.category })}
                >
                  {x.category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <hr className="mt-4  border-black" />

        {/* Price Links */}
        <div className="text-xl mb-2 mt-3">Price</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                className={`${price === "all" && "font-bold"}`}
                href={getFilterUrl({ p: "all" })}
              >
                Any
              </Link>
            </li>
            {prices.map((i) => (
              <li key={i.value}>
                <Link
                  className={`${price === i.value && "font-bold"}`}
                  href={getFilterUrl({ p: i.value })}
                >
                  {i.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <hr className="mt-4  border-black" />

        {/* Rating Links */}
        <div className="text-xl mb-2 mt-3">Customer Ratings</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                className={`${rating === "all" && "font-bold"}`}
                href={getFilterUrl({ r: "all" })}
              >
                Any
              </Link>
            </li>
            {ratings.map((v) => (
              <li key={v}>
                <Link
                  className={`${rating === v.toString() && "font-bold"}`}
                  href={getFilterUrl({ r: `${v}` })}
                >
                  {v} Stars & Up
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <hr className="mt-4  border-black" />

        <div className="mt-6">
          {(q !== "all" && q !== "") ||
          (category !== "all" && category !== "") ||
          rating !== "all" ||
          price !== "all" ? (
            <Button variant="default" asChild>
              <Link href="/search">Clear Search</Link>
            </Button>
          ) : null}
        </div>
      </div>
      <div className="space-y-4 md:col-span-4 ">
        <div className="flex-between flex-col my-4 md:flex-row">
          <div className="flex items-center space-x-4 font-semibold">
            {q !== "all" && q !== "" && <span>Searched: {q}</span>}
            {category !== "all" && category !== "" && (
              <span>Category: {category}</span>
            )}
            {price !== "all" && <span>Price: {price}</span>}
            {rating !== "all" && <span>Rating: {rating} stars & up</span>}
          </div>
          <div>
            {/* SORT */}
            Sort By:{" "}
            {sortOrders.map((s) => (
              <Link
                key={s}
                className={`mx-2 ${sort === s && "font-bold"}`}
                href={getFilterUrl({ s })}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.data.length === 0 && <div>No products found</div>}
          {products.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
