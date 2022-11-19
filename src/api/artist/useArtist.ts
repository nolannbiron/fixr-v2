import { ArtistSort } from './types'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useApp } from '../../contexts/AppContext'
import { IUser } from '../../contexts/UserContext'
import axios from '../../utils/axios'
import { adaptUser, adaptUsers } from '../account/adapters'

const artistKeys = {
    all: ['artist'],
    list: (studioId?: string) => [...artistKeys.all, studioId] as const,
    detail: (artistId?: string) => [...artistKeys.all, artistId] as const,
    infinite: (studioId?: string, filters?: Record<string, unknown>) =>
        [...artistKeys.all, 'infinite', studioId, ...(filters ? [filters] : [])] as const,
}

interface ResponseArtist extends BaseReponse {
    artist: IUser
}

export const useGetArtist = ({ artistId }: { artistId?: string }) => {
    return useQuery<ResponseArtist, AxiosError, ResponseArtist>(
        artistKeys.detail(artistId),
        () => axios.get(`/artist/${artistId}`).then((res) => ({ ...res.data, artist: adaptUser(res.data.artist) })),
        { enabled: !!artistId }
    )
}

interface ResponseArtists extends BaseReponse {
    artists: IUser[]
    total: number
}

interface InfiniteProps {
    filters?: Record<string, unknown>
    sort?: ArtistSort
    search?: string
    limit?: number
    page?: number
}

export function useGetArtists({ filters, search, page, limit, sort }: InfiniteProps) {
    const {
        state: { studioId },
    } = useApp()

    return useQuery<ResponseArtists, AxiosError, ResponseArtists>(
        artistKeys.infinite(studioId, { filters, limit, page, search, sort }),
        () =>
            axios
                .get('/artists', {
                    params: {
                        studios: studioId,
                        filters,
                        page,
                        amount: limit,
                        search,
                        ...sort,
                    },
                })
                .then((res) => ({
                    ...res.data,
                    artists: adaptUsers(res.data.artists),
                })),
        {
            enabled: !!studioId,
            onSettled: (data, error) => {
                console.log({ data, error })
            },
        }
    )
}

export const useUpdateArtist = () => {
    const queryClient = useQueryClient()

    return useMutation<ResponseArtist, AxiosError, Partial<IUser>, ResponseArtist>(
        (data) =>
            axios
                .patch(`/artist/${data.id}`, data)
                .then((res) => ({ ...res.data, artist: adaptUser(res.data.artist) })),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(artistKeys.all)
            },
        }
    )
}

export const useCreateArtist = () => {
    const {
        state: { studioId },
    } = useApp()
    const queryClient = useQueryClient()
    return useMutation<ResponseArtist, AxiosError, Partial<IUser>, ResponseArtist>(
        artistKeys.all,
        (artist) => axios.post(`/artist`, { ...artist, studioId }).then((res) => res.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(artistKeys.all)
            },
        }
    )
}

export const useDeleteArtist = () => {
    const queryClient = useQueryClient()
    return useMutation<ResponseArtist, AxiosError, { artistId: string }, ResponseArtist>(
        ({ artistId }) => axios.delete(`/artist/${artistId}`).then((res) => res.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(artistKeys.all)
            },
        }
    )
}
