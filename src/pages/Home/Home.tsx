import HeroCarousel from "./HeroCarousel";
import RecentPosts from "./RecentPosts";
import RecentEvents from "./RecentEvents";

export const Home = () => {
  return (
    <div>
      <HeroCarousel />
      <RecentPosts />
      <RecentEvents />
    </div>
  );
};
