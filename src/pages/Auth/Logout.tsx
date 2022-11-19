import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../contexts/AppContext'
import { useUser } from '../../contexts/UserContext'

export default function Logout(): JSX.Element {
    const navigate = useNavigate()
    const { dispatch: dispatchApp } = useApp()
    const { dispatch: dispatchUser } = useUser()

    useEffect(() => {
        dispatchApp({ type: 'LOGOUT' })
        dispatchUser({ type: 'LOGOUT' })
        navigate('/login')
    }, [dispatchApp, dispatchUser, navigate])

    return <></>
}
