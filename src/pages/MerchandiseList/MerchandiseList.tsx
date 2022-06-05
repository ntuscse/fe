import {
    Flex,
    Divider,
    Text,
    Select,
    Center,
    Show,
    Hide,
    Heading,
} from "@chakra-ui/react";

import Card from "./Card";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const MerchandiseList = () => {
    return (
        <Flex direction='column'>
            <Header />
            <Text textAlign='center' textStyle={['h6', 'h5']} textColor='primary.600' mt={5} mb={5}>SCSE Merchandise</Text>
            <Select bgColor={['white', 'gray.100']} w={125} h={8} alignSelf='center' borderRadius={20} placeholder='Product Type' size='xs' />
            <Flex justifyContent='space-between' mt={5} mb={5} alignItems='center'>
                <Heading ml={[5, 20]} fontSize={['md', '2xl']} textColor={['primary.600', 'black']}>New Drop</Heading>
             
                <Flex mr={[5, 20]} alignItems='center'>
                    <Text mr={[3, 5]} fontSize={['xs', 'xl']} textColor='primary.600'>Sort By:</Text>
                    
                    <Hide above='sm'>
                        <Select w={[100, 180]} placeholder='Date - New to Old' size='xs' borderRadius={6}/>
                    </Hide>
                    <Show above='sm'>
                        <Select w={[100, 180]} placeholder='Date - New to Old' size='sm' borderRadius={6}/>
                    </Show>
                </Flex>
                
            </Flex>
            <Center mb={5}>
                <Divider w={['90%', '91%']} borderColor='blackAlpha.500'/>
            </Center>
            
            <Flex wrap='wrap' justifyContent='space-evenly' mb={5} px={[0, 10]}>
                <Card text="Sweater #1" price="$25.00" imgSrc="/images/img1.png" sizeRange="S-L"/>
                <Card text="Sweater #2" price="$25.00" imgSrc="/images/img2.png" sizeRange="S-L"/>
                <Card text="Sweater #3" price="$25.00" imgSrc="/images/img3.png" sizeRange="S-L"/>
                <Card text="Sweater #4" price="$25.00" imgSrc="/images/img4.png" sizeRange="S-L"/>
                <Card text="Sweater #1" price="$25.00" imgSrc="/images/img1.png" sizeRange="S-L"/>
                <Card text="Sweater #2" price="$25.00" imgSrc="/images/img2.png" sizeRange="S-L"/>
                <Card text="Sweater #3" price="$25.00" imgSrc="/images/img3.png" sizeRange="S-L"/>
                <Card text="Sweater #4" price="$25.00" imgSrc="/images/img4.png" sizeRange="S-L"/>
            </Flex>
            <Footer />
        </Flex>
        
    )
}

export default MerchandiseList;