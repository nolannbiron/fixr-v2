import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'

interface Props extends BoxProps {
    children?: React.ReactNode
}

export default function Card({ children, ...props }: Props): JSX.Element {
    return (
        <Box bg="bg-surface" boxShadow={useColorModeValue('sm', 'sm-dark')} borderRadius="lg" {...props}>
            {children}
        </Box>
    )
}
