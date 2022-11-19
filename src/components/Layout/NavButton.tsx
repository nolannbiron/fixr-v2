import { As, Button, ButtonProps, HStack, Icon, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

interface NavButtonProps extends ButtonProps {
    icon: As
    label: string
    to: string
    emoji?: string
}

export default function NavButton({ icon, emoji, label, to, ...buttonProps }: NavButtonProps) {
    return (
        <Link to={to} style={{ width: '100%', flex: 1 }}>
            <Button as="span" w="full" variant="ghost" justifyContent="start" {...buttonProps}>
                <HStack align={!emoji ? 'center' : 'baseline'} spacing="3">
                    {!emoji ? <Icon as={icon} boxSize="5" color="muted" /> : <Text fontSize="xl">{emoji}</Text>}
                    <Text>{label}</Text>
                </HStack>
            </Button>
        </Link>
    )
}
