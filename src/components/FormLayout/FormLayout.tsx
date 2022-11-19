import { Box, Flex, Stack, Text } from '@chakra-ui/react'

interface Props {
    title: string
    description?: string
    children?: React.ReactNode
}

export default function FormLayout({ title, description, children }: Props): JSX.Element {
    return (
        <Stack direction={{ base: 'column', lg: 'row' }} spacing={{ base: '5', lg: '8' }} justify="space-between">
            <Box maxW={{ base: 'full', lg: '44', xl: '80' }} flexShrink={1}>
                <Text fontSize="lg" fontWeight="medium">
                    {title}
                </Text>
                {description && (
                    <Text color="muted" fontSize="sm">
                        {description}
                    </Text>
                )}
            </Box>
            <Flex justify="end" maxW={{ base: '100%', lg: '70%' }} flex={1}>
                {children}
            </Flex>
        </Stack>
    )
}
