import CardItemCarousel from "@/features/home/categories/CardItemCarousel";
import BentoGrid from "@/features/home/infos/BentoGrid";
import Welcome from "@/features/home/welcome/Welcome";
import Layout from "@/layouts/Layout";

export default function Home() {
  return (
    <Layout pageTitle="Home">
      <Welcome />
      <BentoGrid />
      <CardItemCarousel />
    </Layout>
  );
}
