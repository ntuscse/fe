import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import React from 'react'


type ErrorUIProps = {
    errorTitle: string,
    errorDescription: string,
}

const ErrorUI = (props: ErrorUIProps) => {
    const { errorTitle, errorDescription } = props
    return (
        <Alert status="error" mb={8}>
            <AlertIcon />
            <AlertTitle>{ errorTitle }</AlertTitle>
            <AlertDescription>{ errorDescription }</AlertDescription>
        </Alert>
    )
}

export default ErrorUI