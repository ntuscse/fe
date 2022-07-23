import HeroCarousel from "./HeroCarousel";
import RecentPosts from "./RecentPosts";
import RecentEvents from "./RecentEvents";
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
