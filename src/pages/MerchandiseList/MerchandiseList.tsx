import {
    Flex,
    Divider,
    Text,
    Select,
    Center,
    Heading,
    useBreakpointValue
} from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import Card from "./Card";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Page from "../../components/Page";
import { QueryKeys } from "../../utils/constants/queryKeys";
import { api } from "../../services/api";


const merchandise = [
    {
        text: "Sweater #1",
        price: "$25.00",
        imgSrc: "/images/img1.png",
        sizeRange: "S-L"
    },
    {
        text: "Sweater #2",
        price: "$25.00",
        imgSrc: "/images/img2.png",
        sizeRange: "S-L"
    },
    {
        text: "Sweater #3",
        price: "$25.00",
        imgSrc: "/images/img3.png",
        sizeRange: "S-L"
    },
    {
        text: "Sweater #4",
        price: "$25.00",
        imgSrc: "/images/img4.png",
        sizeRange: "S-L"
    },
    {
        text: "Sweater #1",
        price: "$25.00",
        imgSrc: "/images/img1.png",
        sizeRange: "S-L"
    },
    {
        text: "Sweater #2",
        price: "$25.00",
        imgSrc: "/images/img2.png",
        sizeRange: "S-L"
    },
    {
        text: "Sweater #3",
        price: "$25.00",
        imgSrc: "/images/img3.png",
        sizeRange: "S-L"
    },
    {
        text: "Sweater #4",
        price: "$25.00",
        imgSrc: "/images/img4.png",
        sizeRange: "S-L"
    },
]

const merchandiseList = merchandise.map((obj, index) => <Card key={index.toString()} text={obj.text} price={obj.price} imgSrc={obj.imgSrc} sizeRange={obj.sizeRange}/>);

export const MerchandiseList = () => {
    const selectSize = useBreakpointValue({ base: 'xs', md: 'sm' });

    const { data: products, isLoading, isError } = useQuery([QueryKeys.PRODUCTS], api.getProducts, {
        enabled: true,
    });

    return (
        <Page>
            <Text textAlign='center' textStyle={['h6', 'h5']} textColor='primary.600' mt={5} mb={5}>SCSE Merchandise</Text>
            <Select bgColor={['white', 'gray.100']} w={125} h={8} alignSelf='center' borderRadius={20} placeholder='Product Type' size='xs' />
            <Flex justifyContent='space-between' my={5} alignItems='center'>
                <Heading ml={[5, 16]} fontSize={['md', '2xl']} textColor={['primary.600', 'black']}>New Drop</Heading>

                <Flex mr={[5, 20]} alignItems='center'>
                    <Text mr={[3, 5]} fontSize={['xs', 'xl']} textColor='primary.600'>Sort By:</Text>

                    <Select w={[100, 180]} placeholder='Date - New to Old' size={selectSize} borderRadius={6}/>
                </Flex>

            </Flex>
            <Center mb={5}>
                <Divider w={['90%', '91%']} borderColor='blackAlpha.500'/>
            </Center>

            <Flex wrap='wrap' justifyContent='space-evenly' mb={5} px={[0, 10]}>
                {merchandiseList}
            </Flex>
        </Page>

    )
}

