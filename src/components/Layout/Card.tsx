import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'

export default function Card(props: BoxProps): JSX.Element {
    return (
        <Box minH="3xs" bg="bg-surface" boxShadow={useColorModeValue('sm', 'sm-dark')} borderRadius="lg" {...props} />
    )
}
