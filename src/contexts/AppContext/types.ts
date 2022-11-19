import { AvailableCountryCode } from '../../i18n'
export interface ConnectionData {
    token: string
    refreshToken: string
}

export interface IAppState {
    isLoggedIn: boolean
    studioId?: string
    jwt?: ConnectionData
    countryCode: AvailableCountryCode
    isPrivate: boolean
}

export type IAppAction =
    | { type: 'LOGIN' }
    | { type: 'LOGOUT' }
    | { type: 'SET_STUDIO_ID'; payload: string }
    | { type: 'SET_JWT'; payload: ConnectionData }
    | { type: 'SET_PRIVATE'; payload: boolean }

export interface IAppContext {
    state: IAppState
    dispatch: React.Dispatch<IAppAction>
}
