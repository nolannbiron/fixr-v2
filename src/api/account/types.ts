export const permissionLevelsList = { 0: 'root', 1: 'admin', 2: 'employee', 3: 'user' } as const
export type permissionLevelKey = keyof typeof permissionLevelsList
export type permissionLevelName = typeof permissionLevelsList[permissionLevelKey]

export interface Profile {
    permissionLevel: permissionLevelKey
}

export interface IAccount {
    id: string
    firstName: string
    lastName: string
    phone: string
    username: string
    email: string
    profile: Profile
    role: 'user' | 'admin' | 'root' | 'employee'
    studioIds: string[]
    comment: string
    socials: Record<string, unknown>
    createdAt: Date
    updatedAt: Date
    isFavorite: boolean
}

export interface AccountServer {
    id: string
    firstName: string
    lastName: string
    username: string
    email: string
    phone: string
    password: string
    profile: Profile
    studios: string[]
    comment: string
    socials: Record<string, unknown>
    createdAt: Date
    updatedAt: Date
    isFavorite: boolean
}
