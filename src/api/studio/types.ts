import { IUser } from '../../contexts/UserContext'

export interface IPicture {
    _id: string
    createdAt: Date
    updatedAt: Date
    url: string
}

export interface IStudio {
    id: string
    name: string
    owner: string | IUser
    users: string[] | IUser[]
    adminToken: string
    description: string
    userToken: string
    pictures: IPicture[]
    createdAt: string
    updatedAt: string
    settings: {
        theme: {
            color: string
        }
    }
    address: {
        fullName?: string
        city?: string
        country?: string
        postalCode?: string
        street?: string
        streetNumber?: string
        coordinates?: number[]
    }
}

export interface ServerStudio {
    id: string
    name: string
    owner: string | IUser
    users: string[] | IUser[]
    description: string
    adminToken: string
    userToken: string
    pictures: IPicture[]
    createdAt: string
    updatedAt: string
    settings: {
        theme: {
            color: string
        }
    }
    address: {
        fullName?: string
        city?: string
        country?: string
        postalCode?: string
        street?: string
        streetNumber?: string
        coordinates?: number[]
    }
}
