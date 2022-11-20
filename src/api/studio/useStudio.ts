import { IStudio } from './types'
import axios from '../../utils/axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import { adaptServerStudio, adaptServerStudios } from './adapters'

interface ResponseStudio extends BaseReponse {
    studio: IStudio
}

const studioKeys = {
    all: ['studio'],
    detail: (studioId?: string) => [...studioKeys.all, studioId],
}

export const useGetStudio = ({ studioId }: { studioId?: string }) => {
    return useQuery<ResponseStudio, AxiosError, ResponseStudio>(
        studioKeys.detail(studioId),
        () =>
            axios
                .get(`/studio/${studioId}`)
                .then((res) => ({ ...res.data, studio: adaptServerStudio(res.data.studio) })),
        { enabled: !!studioId }
    )
}

interface ResponseStudios extends BaseReponse {
    studios: IStudio[]
}

export const useGetStudios = () => {
    return useQuery<ResponseStudios, AxiosError, ResponseStudios>(studioKeys.all, () =>
        axios.get('/studios').then((res) => ({ ...res.data, studios: adaptServerStudios(res.data.studios) }))
    )
}

export const useUpdateStudio = () => {
    const queryClient = useQueryClient()
    return useMutation<ResponseStudio, AxiosError, Partial<IStudio> & { id: string }, ResponseStudio>(
        (studio) => axios.patch(`/studio/${studio.id}`, studio).then((res) => res.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(studioKeys.all)
            },
        }
    )
}

export const useUploadStudioPictures = ({ studioId }: { studioId?: string }) => {
    const queryClient = useQueryClient()
    return useMutation<ResponseStudio, AxiosError, FormData, ResponseStudio>(
        (studio) =>
            axios
                .patch(`/studio/${studioId}`, studio, { headers: { 'Content-Type': 'multipart/form-data' } })
                .then((res) => res.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(studioKeys.all)
            },
        }
    )
}

export const useDeleteStudioPicture = () => {
    const queryClient = useQueryClient()
    return useMutation<ResponseStudio, AxiosError, { studioId: string; pictureId: string }, ResponseStudio>(
        ({ studioId, pictureId }) => axios.delete(`/studio/${studioId}/picture/${pictureId}`).then((res) => res.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(studioKeys.all)
            },
        }
    )
}

export const useCreateStudioDetails = ({ studioId, type }: { studioId?: string; type: keyof IStudio['details'] }) => {
    const queryClient = useQueryClient()
    return useMutation<ResponseStudio, AxiosError, { data: string }, ResponseStudio>(
        ({ data }) => axios.post(`/studio/${studioId}/${type}`, { data }).then((res) => res.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(studioKeys.all)
            },
        }
    )
}

export const useUpdateStudioDetails = ({ studioId, type }: { studioId?: string; type: keyof IStudio['details'] }) => {
    const queryClient = useQueryClient()
    return useMutation<ResponseStudio, AxiosError, { data: string; id: string }, ResponseStudio>(
        ({ data, id }) => axios.patch(`/studio/${studioId}/${type}/${id}`, { data }).then((res) => res.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(studioKeys.all)
            },
        }
    )
}

export const useDeleteStudioDetails = ({ studioId, type }: { studioId?: string; type: keyof IStudio['details'] }) => {
    const queryClient = useQueryClient()
    return useMutation<ResponseStudio, AxiosError, { id: string }, ResponseStudio>(
        ({ id }) => axios.delete(`/studio/${studioId}/${type}/${id}`).then((res) => res.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(studioKeys.all)
            },
        }
    )
}
