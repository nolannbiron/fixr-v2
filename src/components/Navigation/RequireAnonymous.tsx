import { Navigate } from 'react-router-dom'
import { useApp } from '../../contexts/AppContext'

export default function RequireAnonymous({ children }: { children: JSX.Element }): JSX.Element {
    const { state: stateApp } = useApp()

    console.log(stateApp)

    if (stateApp.isLoggedIn) {
        return <Navigate to="/" />
    }

    return children
}
