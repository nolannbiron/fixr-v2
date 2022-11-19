import { Navigate, useLocation } from 'react-router-dom'
import { useApp } from '../../contexts/AppContext'

export default function RequireAuth({ children }: { children: JSX.Element }): JSX.Element {
    const { state: stateApp } = useApp()
    const location = useLocation()

    if (!stateApp.isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} />
    }

    return children
}
