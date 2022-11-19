import { Flex } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../Layout/Layout'
import { useGetRoutesConfig } from './Routes'

export default function Navigation(): JSX.Element {
    const { general, navbar, settings } = useGetRoutesConfig()
    return (
        <>
            <BrowserRouter>
                <Flex direction="column" w="full" h="full" className="w-full lg:h-screen lg:max-h-screen">
                    <Flex
                        direction={['column', 'column', 'column', 'row']}
                        justify="start"
                        w="full"
                        flex={1}
                        overflowY="hidden"
                    >
                        <Routes>
                            <Route element={<Layout />} path="/">
                                <>
                                    {general.map((route, index) => (
                                        <Route
                                            key={`general-route-${index}`}
                                            path={route.path}
                                            element={route.component}
                                        />
                                    ))}

                                    {Object.values(navbar)
                                        .flatMap((routes) => routes)
                                        .map((route) => (
                                            <Route
                                                key={`navbar-route-${route.name}`}
                                                path={route.path}
                                                element={route.component}
                                            />
                                        ))}

                                    <Route
                                        key={`navbar-route-${settings.name}`}
                                        path={settings.path}
                                        element={settings.component}
                                    />
                                </>
                            </Route>
                        </Routes>
                    </Flex>
                </Flex>
            </BrowserRouter>
        </>
    )
}
