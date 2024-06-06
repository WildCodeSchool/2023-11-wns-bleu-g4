import { productStocks } from "@/features/admin/helpers/dummyProducts";
import ProductDetails from "@/features/admin/product/ProductDetails";
import ProductStocks from "@/features/admin/product/ProductStocks";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import { useRouter } from "next/router";

export default function ProductPage() {
    const { query } = useRouter();

    const product = {
        id: 1,
        reference: "REF001",
        name: "Product 1",
        description:
            "This is a product with a long description that is around 200 characters. It provides detailed information about the product, including its features, benefits, and usage instructions. Customers can read this description to make an informed decision before purchasing the product.",
        brand: "Brand 1",
        price: 10.99,
        thumbnail: "https://www.squid-surfboards.com/wp-content/uploads/2020/12/RASTA-copie.png",
        category: "Category 1",
        stocks: productStocks,
    };

    return (
        <LayoutAdmin pageTitle="Product">
            <section className="flex gap-8">
                <ProductDetails product={product} />
                <ProductStocks product={product} />
            </section>
        </LayoutAdmin>
    );
}
