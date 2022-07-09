import {
    Box,
    Image,
    Text,
    Flex
} from '@chakra-ui/react';

type card = {
    imgSrc: string;
    text: string;
    price: string;
    sizeRange: string;
}

const Card = ( {imgSrc, text, price, sizeRange}:card ) => {
    return (
        <Box p={3} w={{ base: 190, lg: '24%' }} h={[250, '100%']} >
            <Box boxShadow='md' borderRadius={5}><Image src={imgSrc} h={{ base: 200, lg: '20%' }} borderRadius={5}/></Box>
            <Flex justifyContent='space-between'>
                <Text visibility='hidden'>{sizeRange}</Text>
                <a href="/" style={{textDecoration : 'none'}}><Text align='center' textStyle={['sm', 'h6']} textColor='primary.600' fontWeight={700}>{text}</Text></a>
                <Text textColor='gray.400' fontWeight={700} fontSize={['sm', 'lg']}>{sizeRange}</Text>
            </Flex>
            <Text align='center' fontSize={['sm', 'md']} textColor='primary.600'>{price}</Text>
        </Box>
        
    )
}

export default Card;