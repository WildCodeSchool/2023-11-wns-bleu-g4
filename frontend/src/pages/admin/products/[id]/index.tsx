import { productStocks } from "@/features/admin/helpers/dummyProducts";
import ProductDetails from "@/features/admin/product/ProductDetails";
import ProductPictures from "@/features/admin/product/ProductPictures";
import ProductStocks from "@/features/admin/product/ProductStocks";
import { useGetProductByIdQuery } from "@/graphql/Product/generated/getProductById.generated";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import { useRouter } from "next/router";

export default function ProductPage() {
  const { query } = useRouter();
  const productId = Number(query.id);
  const { data } = useGetProductByIdQuery({ variables: { productId: productId } });
  const product = data?.getProductById;

  return (
    <LayoutAdmin pageTitle="Product">
      <h2>Informations</h2>
      <section className="flex gap-8">
        <ProductDetails product={product!} />
        <ProductPictures product={product!} />
        {/* <ProductStocks product={product} /> */}
      </section>
    </LayoutAdmin>
  );
}
