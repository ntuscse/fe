import React from "react";
import { Flex, Grid, GridItem, Image, Text, Divider } from "@chakra-ui/react";
import { OrderItemType } from "../../typings/order-status";

export type OrderItemProps = {
  isMobile: boolean;
  data: OrderItemType;
};

const OrderItem: React.FC<OrderItemProps> = (props: OrderItemProps) => {
  const { isMobile, data } = props;

  const flexItemConfig = {
    alignItems: "center",
    h: isMobile ? "auto" : 100,
    justifyContent: isMobile ? "start" : "center",
  };

  return (
    <>
      <Flex my="4" justifyContent="left">
        <Image width="100" height="100" objectFit="cover" src={data.imgUrl} />
        <Grid
          flex={1}
          templateColumns={!isMobile ? "3fr repeat(3, 1fr)" : "3fr"}
        >
          <GridItem pl="4">
            <Flex h={isMobile ? "auto" : 100} alignItems="center">
              <Text fontSize={isMobile ? "xs" : "md"}>
                {data.itemName}
                <br />
                Size: {data.size}
              </Text>
            </Flex>
          </GridItem>
          <GridItem pl="4">
            <Flex {...flexItemConfig}>
              <Text fontSize={isMobile ? "xs" : "md"}>
                {isMobile && "Unit Price:"} ${data.price.toFixed(2)}
              </Text>
            </Flex>
          </GridItem>
          <GridItem pl="4">
            <Flex {...flexItemConfig}>
              <Text fontSize={isMobile ? "xs" : "md"}>
                {isMobile && "Quantity:"} {`x${data.quantity}`}
              </Text>
            </Flex>
          </GridItem>
          <GridItem pl="4">
            <Flex {...flexItemConfig}>
              <Text fontSize={isMobile ? "xs" : "md"}>
                {isMobile && "Subtotal:"} $
                {(data.price * data.quantity).toFixed(2)}
              </Text>
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
      <Divider />
    </>
  );
};

export default OrderItem;
