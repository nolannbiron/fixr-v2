import { As } from '@chakra-ui/react'

export interface PathComponent {
    path: string
    component: JSX.Element
}

export interface Route extends PathComponent {
    name: string
    icon: As
    emoji?: string
    hidden?: boolean
}

export type NavbarRoutes = {
    main: Route[]
    [key: string]: Route[]
}
export interface RoutesConfig {
    navbar: NavbarRoutes
    general: PathComponent[]
    settings: Route
}
