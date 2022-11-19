import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { theme as themePro } from '@chakra-ui/pro-theme'

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: true,
}

const theme = extendTheme({ ...themePro, config })

export default theme
