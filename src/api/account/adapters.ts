import { IAccount, AccountServer, permissionLevelsList } from './types'

export const adaptUser = (user: AccountServer): IAccount => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    phone: user.phone,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    studioIds: user.studios,
    comment: user.comment,
    socials: user.socials,
    role: permissionLevelsList[user.profile.permissionLevel],
    profile: user.profile,
    isFavorite: user.isFavorite ?? false,
})

export const adaptUsers = (users: AccountServer[]): IAccount[] => users.map(adaptUser)
