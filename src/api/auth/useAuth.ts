import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import axios from '../../utils/axios'
import { IAccount } from '../account/types'

interface ResponseLogin extends BaseReponse {
    user: IAccount
    token: string
    refreshToken: string
}

interface RequestLoginData {
    email: string
    password: string
}

export const useLogin = () => {
    return useMutation<ResponseLogin, AxiosError, RequestLoginData, ResponseLogin>((data) =>
        axios.post('/admin/login', data).then((res) => res.data)
    )
}
