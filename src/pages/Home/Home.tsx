import Header from "../../components/Header";
import HeroCarousel from "./HeroCarousel";
import RecentPosts from "./RecentPosts";
import RecentEvents from "./RecentEvents";
import Footer from "../../components/Footer";

export const Home = () => {
  return (
    <div>
      <Header />
      <HeroCarousel />
      <RecentPosts />
      <RecentEvents />
      <Footer />
    </div>
  );
};
