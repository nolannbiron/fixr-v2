import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Navigation from './components/Navigation/Navigation'
import { AppProvider } from './contexts/AppContext'
import { UserProvider } from './contexts/UserContext'
import theme from './theme'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
})

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <AppProvider>
                    <UserProvider>
                        <Navigation />
                    </UserProvider>
                </AppProvider>
            </ChakraProvider>
        </QueryClientProvider>
    )
}

export default App
