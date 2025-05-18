import { getAllCategories } from "@/lib/actions/product.action";
import Link from "next/link";

const CategoryOptions = async () => {
  const categories = await getAllCategories();

  return (
    <div className="flex items-center">
      <div className="flex items-center gap-8">
        <Link
          href={`/category/new-and-featured`}
          className="text-md font-medium hover:text-slate-700 transition-all cursor-pointer hover:underline"
        >
          New & Featured
        </Link>
        {categories.map((x) => (
          <Link
            key={x.category}
            href={`/search?category=${x.category}`}
            className="text-md font-medium hover:text-slate-700 transition-all cursor-pointer hover:underline"
          >
            {x.category}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryOptions;
