import { IStudio, ServerStudio } from './types'

export const adaptServerStudio = (serverStudio: ServerStudio): IStudio => {
    return {
        ...serverStudio,
        id: serverStudio.id,
        name: serverStudio.name,
        owner: serverStudio.owner,
        users: serverStudio.users,
        adminToken: serverStudio.adminToken,
        userToken: serverStudio.userToken,
        createdAt: serverStudio.createdAt,
        updatedAt: serverStudio.updatedAt,
        description: serverStudio.description,
        settings: serverStudio.settings,
        address: serverStudio.address,
    }
}

export const adaptServerStudios = (serverStudios: ServerStudio[]): IStudio[] => serverStudios.map(adaptServerStudio)
