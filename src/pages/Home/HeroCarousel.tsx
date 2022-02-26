import { Image } from "@chakra-ui/react";
import Carousel, { Slide } from "../../components/Carousel";

const slideImageUris = [
  "https://images.unsplash.com/photo-1523381294911-8d3cead13475?fit=crop&w=1080&q=85",
  "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?fit=crop&w=1080&q=85",
  "https://images.unsplash.com/photo-1626497764746-6dc36546b388?fit=crop&w=1080&q=85",
  "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?fit=crop&w=1080&q=85",
  "https://images.unsplash.com/photo-1602810319428-019690571b5b?fit=crop&w=1080&q=85",
];

const slides: Slide[] = slideImageUris.map((uri, index) => ({
  id: (index + 1).toString(),
  component: (
    <Image
      width="100%"
      height="70vh"
      objectFit="cover"
      src={uri}
      alt={`Slide-${index + 1}`}
    />
  ),
}));

const HeroCarousel = () => {
  return <Carousel slides={slides} />;
};

export default HeroCarousel;
