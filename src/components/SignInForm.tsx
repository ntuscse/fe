import {
    Box,
    Flex,
    Heading,
    Image,
    VStack,
    Input,
    Button,
    Text,
    FormControl,
    FormErrorMessage
  } from "@chakra-ui/react";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import React from "react";
import CognitoClient from "../utils/aws/cognito/cognitoClient";
import routes from "../utils/constants/routes";

const SignInForm = () => {
    const navigate = useNavigate()
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    let isError = false;

    const onSubmitSignIn = async (event: any) => {
        event.preventDefault()
        try {
            await CognitoClient.signIn(email, password)
            navigate(routes.HOME)
        } catch (err) {
            isError = true;
            alert(err);
            
        }
    }

    return (
        <Box borderWidth={1} borderRadius={2} p={4} margin='auto' mt={100} boxShadow='sm'>
            <VStack px={10} spacing={3} py={5}>
                <Image src="../../images/SCSE-Logo.png" boxSize={16}/> 
                <Heading fontSize={{ base: 'lg', md: '2xl' }}>Sign in</Heading>
                <form onSubmit={onSubmitSignIn}>
                    <FormControl>
                        <Flex flexDirection='column' w={[250, 450]} mt={4}>
                            <Input isInvalid={isError} id='email' type='email' placeholder='Email Address' mb={8} onChange={ event => setEmail(event.target.value) } />
                            <Input id='password' type='password' name='password' placeholder='Password' mb={4} onChange={event => setPassword(event.target.value)}/>
                            <Flex justifyContent='flex-end'><Text mb={10} fontSize='sm'>Forgot Password?</Text></Flex>
                            <Flex justifyContent='space-between' mb={0}>
                                <Text fontSize='sm' color='gray.700' fontWeight='semibold'>Create Account</Text>
                                <Button size='sm' borderRadius='0' py={5} bottom={2} type="submit">Sign In <ArrowForwardIcon ml={2}/></Button>
                            </Flex>
                        </Flex>
                    </FormControl>
                </form>
            </VStack>
        </Box>
    );
  };
  
export default SignInForm;