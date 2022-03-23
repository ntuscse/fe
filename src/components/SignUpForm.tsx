import {
    Box,
    Flex,
    Heading,
    Image,
    VStack,
    Input,
    Button,
    Text,
    Divider
  } from "@chakra-ui/react";

import {
    FormControl,
    FormLabel,
} from "@chakra-ui/form-control"
 
import { ArrowForwardIcon } from "@chakra-ui/icons";

  const SignUpForm = () => {
    return (
        <Box borderWidth={1} borderRadius={2} p={4} margin="auto" mt={20} mb={20} boxShadow='sm'>
            <VStack py={5} px={{ base: 5, md: 10 }} spacing={3}>
                <Image src="../../images/SCSE-Logo.png" boxSize={16}/>
                <Heading fontSize={['lg', '2xl']}>Registration</Heading>
                <FormControl>
                    <Flex flexDirection='column' w={[280, 450]}>
                        <FormLabel htmlFor='name'>Full name</FormLabel>
                        <Input id='fullname' type='text' placeholder='Bob The Builder' mb={4}/>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <Input id='email' type='email' placeholder='bob@ntu.edu.sg' mb={4}/>
                        <FormLabel>Phone Number *Optional</FormLabel>
                        <Input id='phoneNumber' placeholder='Phone Number *Optional' mb={4}/>
                        <FormLabel>Set Password</FormLabel>
                        <Input id='password' mb={2} type='password'/>
                        <Text fontSize='xs' textColor='primary.600'>*Password must include at least 1 special character</Text>
                        <Text fontSize='xs' textColor='primary.600'>*Password must include at least 1 numeric digit</Text>
                        <Input id='confirmpassword' placeholder='Confirm Password' mt={4} mb={8}/>
                        <Divider w={[352, '100%']} alignSelf='center' borderColor='blackAlpha.500'/>
                        <Button colorScheme='primary' bgColor='primary.600' mt={8} borderRadius={0}>Submit <ArrowForwardIcon ml={2}/></Button>
                    </Flex>
                </FormControl>
            </VStack>
        </Box>

    );
  };
  
  export default SignUpForm;
  