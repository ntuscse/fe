import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeroCarousel from "./HeroCarousel";
import RecentPosts from "./RecentPosts";

export const Home = () => {
  return (
    <div>
      <Header />
      <HeroCarousel />
      <RecentPosts />
      <Footer />
    </div>
  );
};
