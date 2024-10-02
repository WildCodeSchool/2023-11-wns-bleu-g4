import { useGetAllBookingQuery } from "@/graphql/Booking/generated/GetAllBooking.generated";
import { useGetAllBrandsQuery } from "@/graphql/Brand/generated/getAllBrands.generated";
import { useGetAllCategoriesQuery } from "@/graphql/Category/generated/getAllCats.generated";
import { useGetAllProductsQuery } from "@/graphql/Product/generated/getAllProducts.generated";
import { useGetAllUsersQuery } from "@/graphql/User/generated/GetAllUsers.generated";
import {
    useGetAllParentCategoriesQuery
} from "@/graphql/ParentCategory/generated/getAllParentCategories.generated";
import {
    useGetAllProductCharacteristicsQuery
} from "@/graphql/ProductCharacteristic/generated/getAllProductCharacteristics.generated";
import Loading from "@/shared/components/Loading";

export default function Dashboard() {

    const { data: users } = useGetAllUsersQuery();
    const totalUsers = users?.getAllUsers.total ?? 0;

    const { data: bookings } = useGetAllBookingQuery();
    const totalBookings = bookings?.getAllBooking.total ?? 0;

    const { data: products } = useGetAllProductsQuery();
    const totalProducts = products?.getAllProducts.total ?? 0;

    const { data: brands } = useGetAllBrandsQuery();
    const totalBrands = brands?.getAllBrands.total ?? 0;

    const { data: characteristics } = useGetAllProductCharacteristicsQuery();
    const totalCharacteristics = characteristics?.getAllProductCharacteristics.total ?? 0;

    const { data: categories } = useGetAllCategoriesQuery();
    const totalCat = categories?.getAllCategories.length ?? 0;

    const { data: subcategories } = useGetAllParentCategoriesQuery();
    const totalParentCat = subcategories?.getAllParentCategories.length ?? 0;

    const totalCategories = totalCat + totalParentCat;

    const loading =
        !users || !bookings || !products || !brands || !characteristics || !categories || !subcategories;

    return (
        loading ? (
            <Loading loading={loading} />
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-10 max-w-screen-2xl mx-auto">
                <DashboardCard title="Bookings" total={totalBookings} />
                <DashboardCard title="Customers" total={totalUsers} />
                <DashboardCard title="Products" total={totalProducts} />
                <DashboardCard title="Product Characteristics" total={totalCharacteristics} />
                <DashboardCard title="Brands" total={totalBrands} />
                <DashboardCard title="Categories" total={totalCategories} />
            </div>
        )
    );
};

const DashboardCard = ({ title, total }: { title: string, total: number }) => {
    return (
        <div className="dark:bg-cactus-400 bg-cactus-300 p-4 rounded-md shadow-md text-light">
            <p className="text-lg">{title}</p>
            <h2 className="text-4xl font-semibold">{total}</h2>
        </div>
    );
};
