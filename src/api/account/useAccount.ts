import { adaptUser } from './adapters'
import { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import axios from '../../utils/axios'
import { getAccessToken } from '../../utils/localStorage'
import { IUser } from '../../contexts/UserContext'

export const accountKeys = {
    me: ['account'],
}

interface ResponseAccount extends BaseReponse {
    user: IUser
}

export function useGetAccount() {
    return useQuery<ResponseAccount, AxiosError, ResponseAccount>(
        accountKeys.me,
        () => axios.get('/account').then((res) => ({ ...res.data, user: adaptUser(res.data.user) })),
        {
            enabled: !!getAccessToken(),
        }
    )
}
