import Header from "../../components/Header";
import HeroCarousel from "./HeroCarousel";
import RecentPosts from "./RecentPosts";
import RecentEvents from "./RecentEvents";
import Footer from "../../components/Footer";
import Page from "../../components/Page";

export const Home = () => {
  return (
    <Page>
      <HeroCarousel />
      <RecentPosts />
      <RecentEvents />
    </Page>
  );
};
