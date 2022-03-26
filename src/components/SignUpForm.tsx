import {
    Box,
    Flex,
    Heading,
    Image,
    VStack,
    Input,
    Button,
    Text,
    Divider,
    FormControl,
    FormLabel
  } from "@chakra-ui/react";
 
import { ArrowForwardIcon } from "@chakra-ui/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import CognitoClient from "../utils/aws/cognito/cognitoClient";
import routes from "../utils/constants/routes";

  const SignUpForm = () => {
    const navigate = useNavigate()
    const [email, setEmail] = React.useState('')
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [givenName, setGivenName] = React.useState('')
    const [familyName, setFamilyName] = React.useState('')

    const onSubmitSignUp = async (event: any) => {
        try {
            event.preventDefault();
            await CognitoClient.signUp(email, password, familyName, givenName, phoneNumber)
            navigate(routes.CONFIRM_SIGN_UP)
        } catch (err:any) {
            switch (err.code) {
                case 'UsernameExistsException':
                    alert('Email already exists')
                    break
                default:
                    alert(err)
            }
        }
    }


    return (
        <Box borderWidth={1} borderRadius={2} p={4} margin="auto" mt={20} mb={20} boxShadow='sm'>
            <VStack py={5} px={{ base: 5, md: 10 }} spacing={3}>
                <Image src="../../images/SCSE-Logo.png" boxSize={16}/>
                <Heading fontSize={['lg', '2xl']}>Registration</Heading>
                <form onSubmit={onSubmitSignUp}>
                    <FormControl>
                        <Flex flexDirection='column' w={[280, 450]}>
                            <FormLabel htmlFor='given_name'>Given name</FormLabel>
                            <Input id='given_name' type='text' placeholder='Bob The Builder' mb={4} onChange={event => setGivenName(event.target.value)}/>
                            <FormLabel htmlFor='family_name'>Family name</FormLabel>
                            <Input id='family_name' type='text' placeholder='Bob The Builder' mb={4} onChange={event => setFamilyName(event.target.value)}/>
                            <FormLabel htmlFor='email'>Email</FormLabel>
                            <Input id='email' type='email' placeholder='bob@ntu.edu.sg' mb={4} onChange={ event => setEmail(event.target.value) }/>
                            <FormLabel>Phone Number *Optional</FormLabel>
                            <Input id='phoneNumber' placeholder='Phone Number *Optional' mb={4} onChange={ event => setPhoneNumber(event.target.value) }/>
                            <FormLabel>Set Password</FormLabel>
                            <Input id='password' mb={2} type='password' onChange={event => setPassword(event.target.value)}/>
                            <Text fontSize='xs' textColor='primary.600'>*Password must include at least 1 special character</Text>
                            <Text fontSize='xs' textColor='primary.600'>*Password must include at least 1 numeric digit</Text>
                            <Input id='confirmpassword' placeholder='Confirm Password' mt={4} mb={8} onChange={event => setConfirmPassword(event.target.value)}/>
                            <Divider w={[352, '100%']} alignSelf='center' borderColor='blackAlpha.500'/>
                            <Button colorScheme='primary' bgColor='primary.600' mt={8} borderRadius={0} type="submit">Submit <ArrowForwardIcon ml={2}/></Button>
                        </Flex>
                    </FormControl>
                </form>
            </VStack>
        </Box>

    );
  };
  
  export default SignUpForm;
  