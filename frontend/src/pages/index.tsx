import CardItem from "@/features/home/categories/CardItem";
import BentoGrid from "@/features/home/infos/BentoGrid";
import Layout from "@/layouts/Layout";

export default function Home() {
  return (
    <Layout pageTitle="Home">
      <BentoGrid />
      <CardItem />
    </Layout>
  );
}
