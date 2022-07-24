import React, { useState } from "react";
import { Flex, Divider, Text, Select, Center, Heading, useBreakpointValue } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Card from "./Card";
import Page from "../../components/Page";
import { QueryKeys } from "../../utils/constants/queryKeys";
import { api } from "../../services/api";
import { productList } from "../../data/mock/product";
import { ProductType } from "../../typings/product";
import ProductListSkeleton from "./Skeleton";
import { fakeDelay } from "../../utils/functions/random";

enum SortType {
  DATE_DESCENDING = 0,
  DATE_ASCENDING = 1,
}

const fetchProductList = async () => {
  const res = await api.getProducts();
  await fakeDelay(1500);
  return res ?? productList;
};

export const MerchandiseList = () => {
  const selectSize = useBreakpointValue({ base: "xs", md: "sm" });
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { data: products, isLoading } = useQuery([QueryKeys.PRODUCTS], fetchProductList, {});
  const categories = products?.map((product: ProductType) => product?.productCategory.name);
  const uniqueCategories = categories?.filter((c: string, idx: number) => categories.indexOf(c) === idx);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <Page>
      <Text textAlign="center" textStyle={["h6", "h5"]} textColor="primary.600" mt={5} mb={5}>
        SCSE Merchandise
      </Text>
      <Select
        bgColor={["white", "gray.100"]}
        w="fit-content"
        textAlign="center"
        alignSelf="center"
        borderRadius="full"
        placeholder="All Product Type"
        size="xs"
        disabled={isLoading}
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        {uniqueCategories?.map((category: string, idx: number) => (
          <option key={idx.toString()} value={category}>
            {category}
          </option>
        ))}
      </Select>

      <Flex justifyContent="space-between" my={5} alignItems="center">
        <Heading fontSize={["md", "2xl"]} textColor={["primary.600", "black"]}>
          New Drop
        </Heading>
        <Flex alignItems="center">
          <Text mr={[3, 5]} fontSize={["sm", "xl"]} textColor="primary.600">
            Sort By:
          </Text>
          <Select w={[100, 180]} size={selectSize} borderRadius={6}>
            <option value={SortType.DATE_ASCENDING}>Date - New to Old</option>
            <option value={SortType.DATE_DESCENDING}>Date - Old to New</option>
          </Select>
        </Flex>
      </Flex>
      <Center>
        <Divider borderColor="blackAlpha.500" />
      </Center>
      {isLoading ? (
        <ProductListSkeleton />
      ) : (
        <Flex wrap="wrap" justifyContent="space-between" gap={2} mb={5}>
          {products
            ?.filter((product: ProductType) => {
              if (selectedCategory === "") return true;
              return product?.productCategory?.name === selectedCategory;
            })
            ?.map((item: ProductType, idx: number) => (
              <Card
                itemId={item.id}
                key={idx.toString()}
                text={item?.name}
                price={item?.price}
                imgSrc={item?.images?.[0]}
                sizeRange={`${item?.sizes?.[0]} - ${item.sizes?.[item.sizes.length - 1]}`}
              />
            ))}
        </Flex>
      )}
    </Page>
  );
};
