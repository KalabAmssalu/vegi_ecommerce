import { ProductList } from "@/components/modules/products/ProductList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {};

const Productpage = (props: Props) => {
  return (
    <div>
      <div className="flex flex-1 flex-col px-4 items-center justify-center rounded-lg border border-dashed shadow-sm p-2">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Add our store products
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a product.
          </p>
          <Link href="/product/add">
            <Button className="mt-4">Add Product</Button>
          </Link>
        </div>
      </div>
      <ProductList />
    </div>
  );
};

export default Productpage;
