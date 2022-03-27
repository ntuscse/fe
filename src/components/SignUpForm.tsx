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
import Joi from 'joi';
import { joiPassword } from 'joi-password';
import React from "react";
import { useNavigate } from "react-router-dom";
import CognitoClient from "../utils/aws/cognito/cognitoClient";
import routes from "../utils/constants/routes";
import ErrorUI from "./ErrorUI";

  const SignUpForm = () => {
    const navigate = useNavigate()
    const [email, setEmail] = React.useState('')
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [givenName, setGivenName] = React.useState('')
    const [familyName, setFamilyName] = React.useState('')
    const [error, setError] = React.useState({
        errorTitle: '',
        errorDescription: '',
        hasError: false
    })
    const [validationError, setValidationError] = React.useState({
        errorMessage: '',
        hasError: false
    })

    const formValidation = async () => {
        const emailValidator = Joi.string().email({tlds: {allow: false}}).required().label('Email')
        const passwordValidator = joiPassword
                                    .string()
                                    .min(8)
                                    .noWhiteSpaces()
                                    .minOfSpecialCharacters(1)
                                    .minOfNumeric(1)
                                    .minOfUppercase(1)
                                    .minOfLowercase(1)
                                    .label('Password')
        const phoneValidator = Joi.string().regex(/^\+[1-9]\d{1,14}$/).label('Phone Number').messages({
            "string.pattern.base": "Phone number must be in the format +65xxxxxxxxxx"
        })
        const confirmPasswordValidator = () => {
            if (password === confirmPassword) {
                return Joi.valid(true)
            } 
            throw new Error('Passwords do not match')
        }
        try {
            await emailValidator.validateAsync(email)
            await passwordValidator.validateAsync(password)
            await phoneValidator.validateAsync(phoneNumber)
            confirmPasswordValidator()
            setValidationError({
                errorMessage: '',
                hasError: false
            })
        } catch (err: any) {
            setValidationError({
                errorMessage: err.message,
                hasError: true
            })
            return false
        }
        return true
    }

    const onSubmitSignUp = async (event: any) => {
        event.preventDefault();
        setValidationError({
            errorMessage: '',
            hasError: false
        })
        setError({
            errorTitle: '',
            errorDescription: '',
            hasError: false
        })
        const isValidated = await formValidation()
        if (!isValidated) {
            return
        }
        try {
            await CognitoClient.signUp(email, password, familyName, givenName, phoneNumber)
            navigate(routes.CONFIRM_SIGN_UP)
        } catch (err:any) {
            switch (err.code) {
                case 'UserLambdaValidationException':
                    setError({
                        errorTitle: 'Sign up failed',
                        errorDescription: 'Invalid email domain',
                        hasError: true
                    })
                    break
                case 'UsernameExistsException':
                    setError({
                        errorTitle: 'Signup failed',
                        errorDescription: 'User already exist',
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
                <form onSubmit={onSubmitSignUp}>
                    <FormControl>
                        <Flex flexDirection='column' w={[280, 450]}>
                            { error.hasError && <ErrorUI errorTitle={error.errorTitle} errorDescription={error.errorDescription}/>}
                            { validationError.hasError && <ErrorUI errorTitle='Validation Error' errorDescription={validationError.errorMessage}/>}
                            <FormLabel htmlFor='given_name'>Given name</FormLabel>
                            <Input required id='given_name' type='text' placeholder='Bob The Builder' mb={4} onChange={event => setGivenName(event.target.value)}/>
                            <FormLabel htmlFor='family_name'>Family name</FormLabel>
                            <Input required id='family_name' type='text' placeholder='Bob The Builder' mb={4} onChange={event => setFamilyName(event.target.value)}/>
                            <FormLabel htmlFor='email'>Email</FormLabel>
                            <Input required id='email' type='text' placeholder='bob@ntu.edu.sg' mb={4} onChange={ event => setEmail(event.target.value) }/>
                            <FormLabel>Phone Number *Optional</FormLabel>
                            <Input id='phoneNumber' placeholder='Phone Number *Optional' mb={4} onChange={ event => setPhoneNumber(event.target.value) }/>
                            <FormLabel>Set Password</FormLabel>
                            <Input required id='password' mb={2} type='password' onChange={event => setPassword(event.target.value)}/>
                            <Text fontSize='xs' textColor='primary.600'>*Password must include at least 1 special character</Text>
                            <Text fontSize='xs' textColor='primary.600'>*Password must include at least 1 numeric digit</Text>
                            <Text fontSize='xs' textColor='primary.600'>*Password must include at least 1 uppercase and lowercase character</Text>
                            <Input required id='confirmpassword' type='password' placeholder='Confirm Password' mt={4} mb={8} onChange={event => setConfirmPassword(event.target.value)}/>
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
  