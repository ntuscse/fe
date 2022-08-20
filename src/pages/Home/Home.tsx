import HeroCarousel from "./HeroCarousel";
import RecentPosts from "./RecentPosts";
import RecentEvents from "./RecentEvents";
import Page from "../../components/Page";

export const Home = () => {
  return (
    <Page contentWidth="100%" contentPadding={[0]}>
      <HeroCarousel />
      <RecentPosts />
      <RecentEvents />
    </Page>
  );
};
