import { Box, Container, Flex, Heading, HStack, Stack, useBreakpointValue, Text, Icon } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-use'
import { useApp } from '../../contexts/AppContext'
import { useGetRoutesConfig } from '../Navigation/Routes'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function Layout(): JSX.Element {
    const isDesktop = useBreakpointValue({ base: false, lg: true })
    const {
        state: { isLoggedIn },
    } = useApp()
    const { navbar, settings } = useGetRoutesConfig()
    const location = useLocation()
    const routes = [...Object.values(navbar).flatMap((routes) => routes), settings]
    const activePage = routes.flatMap((routes) => routes).find((route) => route.path === location.pathname)

    return (
        <Flex
            as="section"
            w="full"
            direction={{ base: 'column', lg: 'row' }}
            height="100vh"
            bg="bg-canvas"
            overflowY="hidden"
        >
            {isLoggedIn ? isDesktop ? <Sidebar /> : <Navbar /> : <></>}
            <Box overflowY="auto" py="8" flex="1">
                <Container flex="1">
                    {activePage && isLoggedIn && (
                        <Stack mb={8} spacing="8">
                            <Heading display="flex" as="h1" size="md">
                                <HStack spacing="3" align={activePage.emoji ? 'baseline' : 'center'}>
                                    {activePage.emoji ? (
                                        <Text fontSize="4xl">{activePage.emoji}</Text>
                                    ) : (
                                        <Icon as={activePage.icon} boxSize="8" color="subtle" />
                                    )}
                                    <Text>{activePage.name}</Text>
                                </HStack>
                            </Heading>
                        </Stack>
                    )}
                    <Outlet />
                </Container>
            </Box>
        </Flex>
    )
}
