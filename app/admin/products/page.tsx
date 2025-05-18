import Link from "next/link";
import { getAllProducts, deleteProduct } from "@/lib/actions/product.action";
import { formatId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import convertIDR from "@/utils/currency";
import Pagination from "@/components/shared/pagination";
import DeleteDialog from "@/components/shared/delete-dialog";
import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const AdminProductsPage = async (props: {
  searchParams: Promise<{ page: string; query: string; category: string }>;
}) => {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.query || "";
  const category = searchParams.category || "";

  const products = await getAllProducts({
    query: searchText,
    page,
    category,
  });

  return (
    <div className="space-y-2">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <h1 className="h2-bold">Products</h1>
        </div>
        <Button asChild variant="default">
          <Link href="/admin/products/create">Create Product</Link>
        </Button>
      </div>
      {searchText && (
        <div>
          Filtered by <i>&quot;{searchText}&quot;</i>{" "}
          <Link href="/admin/products">
            <Button variant="outline" size="sm" className="ml-2">
              Remove Filter
            </Button>
          </Link>
        </div>
      )}

      {/* DESKTOP */}
      <div className="md:block overflow-x-auto hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>IMAGE</TableHead>
              <TableHead className="text-center">PRICE</TableHead>
              <TableHead>CATEGORY</TableHead>
              <TableHead>STOCK</TableHead>
              <TableHead>RATING</TableHead>
              <TableHead className="w-[100px]">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.data.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="align-middle">
                  {formatId(product.id)}
                </TableCell>
                <TableCell className="align-middle">{product.name}</TableCell>
                <TableCell className="align-middle">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="mx-auto"
                  />
                </TableCell>
                <TableCell className="text-center align-middle">
                  {convertIDR(product.price)}
                </TableCell>
                <TableCell className="align-middle">
                  {product.category}
                </TableCell>
                <TableCell className="align-middle">{product.stock}</TableCell>
                <TableCell className="align-middle">{product.rating}</TableCell>
                <TableCell className="align-middle">
                  <div className="flex justify-center gap-1">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/products/${product.id}`}>Edit</Link>
                    </Button>
                    <DeleteDialog id={product.id} action={deleteProduct} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* MOBILE*/}
      <div className="overflow-x-auto md:hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NAME</TableHead>
              <TableHead>IMAGE</TableHead>
              <TableHead>DETAILS</TableHead>

              <TableHead className="w-[100px]">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.data.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="align-middle text-[10px] leading-[14px]">
                  {product.name}
                </TableCell>
                <TableCell className="align-middle">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="mx-auto"
                  />
                </TableCell>

                <TableCell className="align-middle">
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="default" size="sm">
                        Details
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent className="p-4">
                      <DrawerHeader>
                        <DrawerTitle>{product.name}</DrawerTitle>
                      </DrawerHeader>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Price:</strong> {convertIDR(product.price)}
                        </div>
                        <div>
                          <strong>Category:</strong> {product.category}
                        </div>
                        <div>
                          <strong>Stock:</strong> {product.stock}
                        </div>
                        <div>
                          <strong>Rating:</strong> {product.rating}
                        </div>
                        <div className="mt-2 flex gap-2 overflow-x-auto">
                          {product.images.map((img, index) => (
                            <Image
                              key={index}
                              src={img}
                              alt={`${product.name} image ${index + 1}`}
                              width={100}
                              height={100}
                              className="rounded shrink-0"
                            />
                          ))}
                        </div>
                      </div>
                    </DrawerContent>
                  </Drawer>
                </TableCell>

                <TableCell>
                  <div className="flex ">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/products/${product.id}`}>Edit</Link>
                    </Button>
                    <DeleteDialog id={product.id} action={deleteProduct} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {products?.totalPages && products.totalPages > 1 && (
        <Pagination page={page} totalPages={products.totalPages} />
      )}
    </div>
  );
};

export default AdminProductsPage;
