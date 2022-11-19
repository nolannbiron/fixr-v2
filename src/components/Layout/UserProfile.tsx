import { Avatar, Box, HStack, IconButton, Text, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'
import { FiLogOut } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { capitalize } from '../../utils'

interface UserProfileProps {
    name: string
    email: string
}

export default function UserProfile({ name, email }: UserProfileProps) {
    return (
        <HStack cursor="default" maxW="full" spacing="4" align="center" justify="space-between">
            <HStack maxW="56" spacing="3">
                <Avatar bg={useColorModeValue('blue.600', 'blue.300')} name={name} boxSize="10" />
                <Box pr={10} w="full">
                    <Text fontWeight="medium" fontSize="sm">
                        {capitalize(name)}
                    </Text>
                    <Text noOfLines={1} color="muted" fontSize="sm">
                        {email}
                    </Text>
                </Box>
            </HStack>
            <Link to="/logout" style={{ marginInlineStart: 0 }}>
                <IconButton variant="ghost" as="span" ms={0} icon={<FiLogOut />} aria-label="Logout" />
            </Link>
        </HStack>
    )
}
