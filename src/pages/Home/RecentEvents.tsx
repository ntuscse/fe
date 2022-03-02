import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ChakraProps,
  Flex,
  Heading,
  Image,
  Show,
  Text,
} from "@chakra-ui/react";
import Carousel from "../../components/Carousel";

type Event = {
  imageUri: string;
  title: string;
  body: string;
};

type EventCardProps = ChakraProps & {
  event: Event;
  // eslint-disable-next-line react/require-default-props
  showButtonOnRight?: boolean;
};

const events: Event[] = Array(6).fill({
  imageUri:
    "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80",
  title: "Some Event",
  body: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt",
});

const EventCard = ({ event, showButtonOnRight, ...props }: EventCardProps) => {
  const { imageUri, title, body } = event;
  return (
    <Box
      w={{ base: "auto", md: 320 }}
      boxShadow={{ base: "base", md: "lg" }}
      rounded="md"
      bg="white"
      {...props}
    >
      <Image src={imageUri} roundedTop="md" />
      <Flex direction="column" px={6} py={4}>
        <Heading size="lg">{title}</Heading>
        <Text>{body}</Text>
        <Button
          mt={4}
          mb={2}
          rightIcon={<ArrowForwardIcon />}
          size={showButtonOnRight ? "sm" : "md"}
          alignSelf={showButtonOnRight ? "flex-end" : "flex-start"}
        >
          Learn More
        </Button>
      </Flex>
    </Box>
  );
};

const RecentEvents = () => {
  return (
    <Box pb={12} maxWidth="1400px" mx="auto">
      <Heading px={12}>Recent Events</Heading>
      <Show below="md">
        {events.map((event, index) => (
          <EventCard
            key={index.toString()}
            event={event}
            mx={{ base: 6, md: 12 }}
            mb={8}
            showButtonOnRight
          />
        ))}
      </Show>
      <Show above="md">
        <Carousel
          slides={events.map((event, index) => ({
            id: (index + 1).toString(),
            component: <EventCard event={event} />,
          }))}
          options={{
            slidesPerView: "auto",
            spaceBetween: 32,
            loop: false,
            autoplay: false,
            style: {
              padding: 24,
              paddingLeft: 42,
              paddingRight: 42,
              paddingTop: 12,
            },
          }}
        />
      </Show>
    </Box>
  );
};

export default RecentEvents;
