import { AxiosError } from 'axios'
import { useMutation, useQuery } from 'react-query'
import axios from '../../utils/axios'
import { IService } from './types'

const serviceKeys = {
    all: ['service'],
    detail: (serviceId: string) => [...serviceKeys.all, serviceId],
}

interface ResponseService extends BaseReponse {
    service: IService
}

interface Props {
    serviceId: string
}

export const useGetService = ({ serviceId }: Props) => {
    return useQuery<ResponseService, AxiosError, ResponseService>(serviceKeys.detail(serviceId), () =>
        axios.get(`/service/${serviceId}`).then((res) => res.data)
    )
}

interface ResponseServices extends BaseReponse {
    service: IService[]
}

export const useGetServices = () => {
    return useQuery<ResponseServices, AxiosError, ResponseServices>(serviceKeys.all, () =>
        axios.get('/services').then((res) => res.data)
    )
}

export const useUploadFiles = ({ serviceId }: Partial<Props>) => {
    return useMutation<ResponseService, AxiosError, { files: FileList }, ResponseService>((files) =>
        axios.post(`/service/${serviceId}/files`, { file: files }).then((res) => res.data)
    )
}
