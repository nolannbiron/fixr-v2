import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    useBreakpointValue,
    useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useLogin } from '../../api/auth/useAuth'
import { useApp } from '../../contexts/AppContext'
import { useUser } from '../../contexts/UserContext'
import { setTokens } from '../../utils/localStorage'
import Logo from './components/Logo'

import PasswordField from './components/PasswordField'

export default function LoginPage(): JSX.Element {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { mutate: login } = useLogin()
    const { dispatch: dispatchUser } = useUser()
    const { state } = useLocation()
    const { dispatch: dispatchApp } = useApp()

    const handleSubmit = (e: any) => {
        e.preventDefault()
        login(
            { email, password },
            {
                onSuccess: (data) => {
                    const user = data.user
                    dispatchUser({ type: 'update', payload: user })
                    dispatchApp({
                        type: 'SET_JWT',
                        payload: { token: data.token, refreshToken: data.refreshToken },
                    })
                    setTokens({ accessToken: data.token, refreshToken: data.refreshToken })

                    const from = state?.from?.pathname || '/'
                    location.replace(from)
                },
                onError: (data, error) => {
                    console.log(data, error)
                },
            }
        )
    }

    return (
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <Stack spacing="8">
                <Stack spacing="6">
                    <Logo />
                    <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                        <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>Log in to your account</Heading>
                        {/* <HStack spacing="1" justify="center">
                        <Text color="muted">Don't have an account?</Text>
                        <Button variant="link" colorScheme="blue">
                            Sign up
                        </Button>
                    </HStack> */}
                    </Stack>
                </Stack>
                <Box
                    py={{ base: '0', sm: '8' }}
                    px={{ base: '4', sm: '10' }}
                    bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
                    boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
                    borderRadius={{ base: 'none', sm: 'xl' }}
                >
                    <Stack as="form" onSubmit={handleSubmit} spacing="6">
                        <Stack spacing="5">
                            <FormControl>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.currentTarget.value)}
                                    id="email"
                                    type="email"
                                />
                            </FormControl>
                            <PasswordField value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
                        </Stack>
                        <HStack justify="space-between">
                            <Checkbox defaultChecked>Remember me</Checkbox>
                            <Button variant="link" colorScheme="blue" size="sm">
                                Forgot password?
                            </Button>
                        </HStack>
                        <Stack spacing="6">
                            <Button type="submit" variant="primary">
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    )
}
