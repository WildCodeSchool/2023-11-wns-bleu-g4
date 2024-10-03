import ProductDetails from "@/features/admin/product/ProductDetails";
import ProductPictures from "@/features/admin/product/ProductPictures";
import ProductStocks from "@/features/admin/product/ProductStocks";
import { useGetProductByIdQuery } from "@/graphql/Product/generated/getProductById.generated";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import Loading from "@/shared/components/Loading";
import { useRouter } from "next/router";

export default function ProductPage() {
  const { query } = useRouter();
  const productId = Number(query.id);
  const { data, loading } = useGetProductByIdQuery({ variables: { productId: productId } });
  const product = data?.getProductById;

  return (
    <LayoutAdmin pageTitle="Product">
      <h2>Informations</h2>
      {loading ? (
        <div className="flex w-full justify-center items-center h-[calc(100dvh-48px-45px-1rem)]">
          <Loading loading={loading} />
        </div>
      ) : (
        <section className="flex flex-col gap-4 lg:flex-row lg:gap-8">
          <ProductDetails product={product!} />
          <div className="flex flex-col w-full gap-4 lg:gap-8">
            <ProductPictures product={product!} />
            <ProductStocks product={product!} />
          </div>
        </section>
      )}
    </LayoutAdmin>
  );
}
