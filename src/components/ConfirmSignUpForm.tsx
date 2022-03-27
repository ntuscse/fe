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
    FormLabel
  } from "@chakra-ui/react";
 
import { ArrowForwardIcon } from "@chakra-ui/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import CognitoClient from "../utils/aws/cognito/cognitoClient";
import routes from "../utils/constants/routes";
import ErrorUI from "./ErrorUI";

const ConfirmSignUpForm = () => {
    const navigate = useNavigate()
    const [email, setEmail] = React.useState('')
    const [code, setCode] = React.useState('')
    const [error, setError] = React.useState({
        errorTitle: '',
        errorDescription: '',
        hasError: false
    })


    const onSubmitConfirmSignUp = async (event: any) => {
        event.preventDefault();
        try {
            await CognitoClient.confirmSignUp(email, code)
            navigate(routes.SIGN_IN)
        } catch (err:any) {
            switch (err.code) {
                case 'CodeMismatchException':
                    setError({
                        errorTitle: 'Confirmation failed',
                        errorDescription: 'Invalid confirmation code',
                        hasError: true
                    })
                    break
                default:
                    setError({
                        errorTitle: 'Something went wrong',
                        errorDescription: err.toString(),
                        hasError: true
                    })
            }
        }
    }


    return (
        <Box borderWidth={1} borderRadius={2} p={4} margin="auto" mt={20} mb={20} boxShadow='sm'>
            <VStack py={5} px={{ base: 5, md: 10 }} spacing={3}>
                <Image src="../../images/SCSE-Logo.png" boxSize={16}/>
                <Heading fontSize={['lg', '2xl']}>Registration</Heading>
                <form onSubmit={onSubmitConfirmSignUp}>
                    <FormControl>
                        <Flex flexDirection='column' w={[280, 450]}>
                            <Text mt={4} mb={4}>Congratulations! You should have received an email with a verification code. Please input your verification code here.</Text>
                            { error.hasError && <ErrorUI errorTitle={error.errorTitle} errorDescription={error.errorDescription}/>}
                            <FormLabel htmlFor='code'>Email</FormLabel>
                            <Input id='code' type='email' placeholder="test@ntu.edu.sg" mb={4} onChange={event => setEmail(event.target.value)} required/>
                            <FormLabel htmlFor='code'>Verification Code</FormLabel>
                            <Input id='code' type='text' placeholder="123456" mb={4} onChange={event => setCode(event.target.value)} required/>
                            <Button colorScheme='primary' bgColor='primary.600' mt={8} borderRadius={0} type="submit">Submit <ArrowForwardIcon ml={2}/></Button>
                        </Flex>
                    </FormControl>
                </form> 
            </VStack>
        </Box>

    );
};

export default ConfirmSignUpForm;
  