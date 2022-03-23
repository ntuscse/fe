import {
    Box,
    Flex,
    Heading,
    Image,
    VStack,
    Input,
    Button,
    Text,
  } from "@chakra-ui/react";

import { ArrowForwardIcon } from "@chakra-ui/icons";

import {
    FormControl,
} from "@chakra-ui/form-control"
  

const SignInForm = () => {
    return (
        <Box borderWidth={1} borderRadius={2} p={4} margin='auto' mt={20} mb={20} boxShadow='sm'>
            <VStack px={10} spacing={3} py={5}>
                <Image src="../../images/SCSE-Logo.png" boxSize={16}/> 
                <Heading fontSize={{ base: 'lg', md: '2xl' }}>Sign in</Heading>
                <FormControl>
                    <Flex flexDirection='column' w={[250, 450]} mt={4}>
                        <Input id='email' type='email' placeholder='Email Address' mb={8}/>
                        <Input id='password' type='password' name='password' placeholder='Password' mb={4}/>
                        <Flex justifyContent='flex-end'><Text mb={10} fontSize='sm'>Forgot Password?</Text></Flex>
                        <Flex justifyContent='space-between' mb={0}>
                            <Text fontSize='sm' color='gray.700' fontWeight='semibold'>Create Account</Text>
                            <Button size='sm' borderRadius='0' py={5} bottom={2}>Sign In <ArrowForwardIcon ml={2}/></Button>
                        </Flex>
                    </Flex>
                </FormControl>
            </VStack>
        </Box>
    );
  };
  
  export default SignInForm;
  