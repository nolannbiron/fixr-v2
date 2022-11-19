import { IAccount } from './../account/types'

export interface ArtistSort {
    sortField: keyof IAccount
    sortOrder: 'asc' | 'desc'
}
