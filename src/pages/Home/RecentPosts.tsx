import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

const posts = [1, 2, 3];

const RecentPosts = () => {
  const dualColumn = useBreakpointValue({ base: false, md: true });

  return (
    <Box p={12}>
      <Heading>Recent Posts</Heading>
      {posts.map((post, index) => {
        return (
          <Grid
            key={post.toString()}
            templateColumns="repeat(auto-fit, minmax(314px, 1fr));" // todo: replace 314px
            column={2}
            my={12}
            autoFlow="dense"
            columnGap={8}
            rowGap={4}
            dir={dualColumn && index % 2 === 1 ? "ltr" : "rtl"}
          >
            <GridItem>
              <Box boxShadow="dark-lg" rounded="md" bg="white">
                <Image
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80"
                  h={64}
                  objectFit="cover"
                  w="100%"
                  rounded="md"
                />
              </Box>
            </GridItem>
            <GridItem>
              <Flex direction="column" alignItems="flex-end">
                <Heading as="h4" size="lg" isTruncated>
                  Nth Post
                </Heading>
                <Text
                  my={4}
                  textAlign={dualColumn && index % 2 === 1 ? "right" : "left"}
                >
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                  odit aut fugit, sed quia consequuntur magni dolores eos qui
                  ratione voluptatem sequi nesciunt. Neque porro quisquam est.
                  Sed quia consequuntur magni dolores eos qui ratione voluptatem
                  sequi nesciunt. Neque porro quisquam est.
                </Text>
                <Button
                  variant={dualColumn && index % 2 === 1 ? "outline" : "solid"}
                  size={dualColumn ? "md" : "sm"}
                >
                  Learn More
                </Button>
              </Flex>
            </GridItem>
          </Grid>
        );
      })}
    </Box>
  );
};

export default RecentPosts;
