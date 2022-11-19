// import { useTranslation } from 'react-i18next'
import Login from '../../pages/Auth/Login'
// import Logout from '../../pages/Auth/Logout'
import RequireAnonymous from './RequireAnonymous'
import RequireAuth from './RequireAuth'
import { RoutesConfig } from './types'
// import Artist from '../../pages/Admin/ArtistModal'
// import Home from '../../pages/Home'
import RequireAdmin from './RequireAdmin'
// import { HomeIcon, MusicalNoteIcon, UsersIcon, BuildingOfficeIcon } from '@heroicons/react/24/solid'
// import { ArtistsPage } from '../../pages/Admin/Artists'
// import { ServicesPage } from '../../pages/Admin/Services'
import RequireEmployee from './RequireEmployee'
// import Studio from '../../pages/Admin/Studio/Studio'
import { useTranslation } from 'react-i18next'
import { FiHome, FiMusic, FiUsers } from 'react-icons/fi'
import { HiBell, HiLightningBolt, HiOfficeBuilding } from 'react-icons/hi'
import Logout from '../../pages/Auth/Logout'
import StudioPage from '../../pages/Studio/Studio'

export const useGetRoutesConfig = (): RoutesConfig => {
    const { t } = useTranslation()

    return {
        navbar: {
            main: [
                {
                    path: '/activities',
                    name: t('navbar.activities'),
                    icon: HiLightningBolt,
                    component: (
                        <RequireAuth>
                            <></>
                        </RequireAuth>
                    ),
                },
                {
                    path: '/notifications',
                    name: t('navbar.notifications'),
                    icon: HiBell,
                    component: (
                        <RequireAuth>
                            <></>
                        </RequireAuth>
                    ),
                },
            ],
            [`${t('navbar.main')}`]: [
                {
                    path: '/',
                    icon: FiHome,
                    emoji: '🏠',
                    name: t('navbar.home'),
                    component: (
                        <RequireAuth>
                            <>Coucou</>
                        </RequireAuth>
                    ),
                },
                {
                    path: '/artists',
                    icon: FiUsers,
                    emoji: '👨‍🎤',
                    name: t('navbar.artists'),
                    component: (
                        <RequireAuth>
                            <RequireEmployee>
                                <></>
                                {/* <ArtistsPage /> */}
                            </RequireEmployee>
                        </RequireAuth>
                    ),
                },
                {
                    path: '/orders',
                    icon: FiMusic,
                    emoji: '📦',
                    name: t('navbar.orders'),
                    component: (
                        <RequireAuth>
                            <RequireEmployee>
                                <></>
                                {/* <ServicesPage /> */}
                            </RequireEmployee>
                        </RequireAuth>
                    ),
                },
            ],
        },
        general: [
            {
                path: '/artist/:artistId',
                component: (
                    <RequireAuth>
                        <RequireEmployee>
                            <></>
                            {/* <Artist /> */}
                        </RequireEmployee>
                    </RequireAuth>
                ),
            },
            {
                path: '/login',
                component: (
                    <RequireAnonymous>
                        <Login />
                    </RequireAnonymous>
                ),
            },
            {
                path: '/logout',
                component: (
                    <RequireAuth>
                        <Logout />
                    </RequireAuth>
                ),
            },
        ],
        settings: {
            path: '/studio',
            icon: HiOfficeBuilding,
            emoji: '🏢',
            name: t('studio.title'),
            component: (
                <RequireAuth>
                    <RequireAdmin>
                        <StudioPage />
                    </RequireAdmin>
                </RequireAuth>
            ),
        },
    }
}
