import CardItem from "@/features/home/categories/CardItem";
import BentoGrid from "@/features/home/infos/BentoGrid";
import Layout from "@/layouts/Layout";
import Welcome from "@/features/home/welcome/Welcome";

export default function Home() {
  return (
    <Layout pageTitle="Home">
      <Welcome/>
      <BentoGrid />
      <CardItem />
    </Layout>
  );
}
