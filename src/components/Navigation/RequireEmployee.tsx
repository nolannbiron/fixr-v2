import { Navigate, useLocation } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'

export default function RequireEmployee({ children }: { children: JSX.Element }): JSX.Element {
    const { state: user } = useUser()
    const location = useLocation()

    if (user.profile.permissionLevel > 2) {
        return <Navigate to="/" state={{ from: location }} />
    }

    return children
}
