import React, { createContext, useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import useLocalStorage from 'react-use/lib/useLocalStorage'
import { AvailableCountryCode, countries, defaultCountryCode } from '../../i18n'
import { clearTokens, getAccessToken, getRefreshToken } from '../../utils/localStorage'
import { IAppState, IAppContext, IAppAction } from './types'

export const AppContext = createContext<IAppContext | undefined>(undefined)

const reducer = (state: IAppState, action: IAppAction) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: true,
            }
        case 'LOGOUT':
            clearTokens()
            return { ...state, jwt: undefined, isLoggedIn: false }
        case 'SET_STUDIO_ID':
            return {
                ...state,
                studioId: action.payload,
            }
        case 'SET_PRIVATE':
            localStorage.setItem('isPrivate', JSON.stringify(action.payload))
            return {
                ...state,
                isPrivate: action.payload,
            }
            break
        default:
            return state
    }
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const { i18n } = useTranslation()
    const [localCountryCode, setLocalCountryCode] = useLocalStorage<AvailableCountryCode>(
        'countryCode',
        defaultCountryCode
    )
    const [localStudioId, setLocalStudioId] = useLocalStorage<string>('studioId')
    const initialState: IAppState = {
        studioId: localStudioId,
        isLoggedIn: false,
        countryCode: localCountryCode ?? defaultCountryCode,
        isPrivate: JSON.parse(localStorage.getItem('isPrivate') || 'false'),
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    const selectedLanguage = countries[state.countryCode].language

    if (selectedLanguage !== i18n.language) i18n.changeLanguage(selectedLanguage)

    useEffect(() => {
        setLocalCountryCode(state.countryCode)
        //eslint-disable-next-line
    }, [state.countryCode])

    useEffect(() => {
        !!state.studioId && setLocalStudioId(state.studioId)
        //eslint-disable-next-line
    }, [state.studioId])

    useEffect(() => {
        if (!state.jwt) {
            const token = getAccessToken()
            const refreshToken = getRefreshToken()
            if (token && refreshToken) {
                dispatch({ type: 'SET_JWT', payload: { token, refreshToken } })
                dispatch({ type: 'LOGIN' })
            }
        } else if (state.jwt && !state.isLoggedIn) {
            dispatch({ type: 'LOGIN' })
        }
    }, [state.jwt, state.isLoggedIn])

    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export const useApp = () => {
    const context = React.useContext(AppContext)
    if (context === undefined) {
        throw new Error('useApp must be used within a AppProvider')
    }
    return context
}
