import { Icon } from '@chakra-ui/icons'
import {
    Box,
    Divider,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Kbd,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react'
import { FiSearch, FiSettings } from 'react-icons/fi'
import { useMatch } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'
import { useGetRoutesConfig } from '../Navigation/Routes'
import ChangeStudio from './ChangeStudio'
import LogoPro from './LogoPro'
import NavButton from './NavButton'
import UserProfile from './UserProfile'

export default function Sidebar() {
    const { navbar, settings } = useGetRoutesConfig()
    const { state: user } = useUser()

    return (
        <Flex as="section" minH="100vh" bg="bg-canvas">
            <Flex
                flex="1"
                bg="bg-surface"
                overflowY="auto"
                borderRight={useColorModeValue('1px solid #E2E8F0', '1px solid #4A5568')}
                boxShadow={useColorModeValue('sm', 'sm-dark')}
                w={{ base: 'full', sm: 'xs' }}
                py={{ base: '6', sm: '8' }}
                px={{ base: '4', sm: '6' }}
            >
                <Stack justify="space-between" spacing="1" w="full">
                    <Stack spacing={{ base: '5', sm: '6' }} shouldWrapChildren>
                        <LogoPro />
                        <ChangeStudio />
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <Icon as={FiSearch} color="muted" boxSize="5" />
                            </InputLeftElement>
                            <Input placeholder="Search" />
                            <InputRightElement mr="3" w="fit-content" pointerEvents="none">
                                <Box as="span" fontSize="13">
                                    <Kbd fontSize="14">⌘</Kbd>
                                    <Kbd ml={1} fontSize="13">
                                        k
                                    </Kbd>
                                </Box>
                            </InputRightElement>
                        </InputGroup>
                        <Box>
                            {Object.entries(navbar).map(([, routes], index) => (
                                <Box key={index}>
                                    {index !== 0 && (
                                        <>
                                            <Divider my={3} />
                                        </>
                                    )}
                                    <Stack spacing="1">
                                        {routes.map((route) => (
                                            <NavButton
                                                key={route.name}
                                                to={route.path}
                                                isActive={!!useMatch(route.path)}
                                                label={route.name}
                                                icon={route.icon}
                                                emoji={route.emoji}
                                            />
                                        ))}
                                    </Stack>
                                </Box>
                            ))}
                        </Box>
                    </Stack>
                    <Stack maxW="full" spacing={{ base: '5', sm: '6' }}>
                        <Stack spacing="1">
                            <NavButton
                                isActive={!!useMatch(settings.path)}
                                to={settings.path}
                                label={settings.name}
                                icon={FiSettings}
                                emoji={settings.emoji}
                            />
                        </Stack>
                        {/* <Box bg="bg-subtle" px="4" py="5" borderRadius="lg">
                            <Stack spacing="4">
                                <Stack spacing="1">
                                    <Text fontSize="sm" fontWeight="medium">
                                        Almost there
                                    </Text>
                                    <Text fontSize="sm" color="muted">
                                        Fill in some more information about you and your person.
                                    </Text>
                                </Stack>
                                <Progress value={80} size="sm" aria-label="Profile Update Progress" />
                                <HStack spacing="3">
                                    <Button variant="link" size="sm">
                                        Dismiss
                                    </Button>
                                    <Button variant="link" size="sm" colorScheme="blue">
                                        Update profile
                                    </Button>
                                </HStack>
                            </Stack>
                        </Box> */}
                        <Divider />
                        <UserProfile name={user?.firstName + ' ' + user?.lastName} email={user?.email} />
                    </Stack>
                </Stack>
            </Flex>
        </Flex>
    )
}
