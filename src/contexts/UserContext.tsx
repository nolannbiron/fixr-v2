import { createContext, ReactNode, useContext, useReducer } from 'react'
import { IAccount } from '../api/account/types'
import { useGetAccount } from '../api/account/useAccount'
import { useApp } from './AppContext'
import { useTranslation } from 'react-i18next'
import { Spinner, Flex, useToast } from '@chakra-ui/react'

export type IUser = IAccount

export type Action = { type: 'update'; payload: Partial<IUser> } | { type: 'LOGOUT' }

const UserContext = createContext<{ state: IUser; dispatch: React.Dispatch<Action> } | undefined>(undefined)

function userReducer(state: IUser, action: Action): IUser {
    switch (action.type) {
        case 'update': {
            return { ...state, ...action.payload }
        }
        case 'LOGOUT': {
            return {} as IUser
        }
        default: {
            return state
        }
    }
}

interface ProviderProps {
    children: ReactNode
}
function UserProvider({ children }: ProviderProps) {
    const { t } = useTranslation()
    const [state, dispatch] = useReducer(userReducer, {} as IUser)
    const { state: stateApp, dispatch: dispatchApp } = useApp()
    const { data, isLoading, isFetched, isSuccess, isError } = useGetAccount()
    const toast = useToast({ position: 'top-right' })

    if (isError && stateApp.isLoggedIn) {
        toast({ title: t('toast.error.login'), status: 'error' })
        dispatch({ type: 'LOGOUT' })
        dispatchApp({ type: 'LOGOUT' })
        return <></>
    }

    if (isLoading)
        return (
            <Flex className="h-screen w-screen" align="center" justify="center">
                <Spinner />
            </Flex>
        )

    if (!Object.keys(state).length && isFetched && isSuccess && data) {
        const user = data.user
        console.log(user)
        dispatch({ type: 'update', payload: user })
        if (user.studioIds.length) {
            !stateApp.studioId && dispatchApp({ type: 'SET_STUDIO_ID', payload: user.studioIds[0] })
        }
    }

    const value = { state, dispatch }
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

function useUser() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}

export { UserProvider, useUser }
