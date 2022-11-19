import { CheckIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { HStack, Stack, Text, useColorModeValue, useOutsideClick, VStack } from '@chakra-ui/react'
import { useRef, useState } from 'react'

interface SelectOptions<T> {
    label: string
    value: T
    wrapper?: JSX.Element
}

interface Props<T> {
    value: string
    onChange: (value: T) => void
    options?: SelectOptions<T>[]
    active?: T
}

export default function SelectList<T>({ value, options, active, onChange }: Props<T>): JSX.Element {
    const ref = useRef(null)
    const [open, setOpen] = useState(false)
    useOutsideClick({
        ref,
        handler: () => setOpen(false),
    })

    const handleSelect = (value: T) => {
        onChange(value)
        setOpen(false)
    }

    return (
        <Stack w="full" flex={1} className="group" ref={ref} position="relative">
            <HStack
                justify="space-between"
                bg="bg-subtle"
                w="full"
                borderRadius="md"
                borderWidth={1}
                borderStyle="solid"
                borderColor={useColorModeValue('sm-dark', 'bg-muted')}
                p="3"
                transition="all 0.2s"
                textTransform="uppercase"
                _groupHover={{
                    bg: useColorModeValue('bg-muted', 'bg-subtle'),
                    borderColor: useColorModeValue('bg-muted', 'accent'),
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                }}
                onClick={() => setOpen(!open)}
            >
                <HStack w="full" spacing="2">
                    {options?.find((option) => option.value === active)?.wrapper}
                    <Text maxW="90%" className="truncate" fontWeight={600} fontSize="md">
                        {value}
                    </Text>
                </HStack>
                <ChevronDownIcon fontSize={22} opacity={0.9} />
            </HStack>
            {open && options && (
                <Stack w="full" position="absolute" top="100%" zIndex={9999}>
                    <VStack
                        bg="bg-subtle"
                        align="start"
                        borderRadius="md"
                        borderWidth={1}
                        borderStyle="solid"
                        borderColor="bg-muted"
                        p="1"
                        transition="all 0.2s"
                        textTransform="uppercase"
                        w="full"
                    >
                        {options.map((option) => (
                            <HStack
                                bg="bg-subtle"
                                _hover={{
                                    bg: active === option.value ? undefined : 'bg-muted',
                                }}
                                key={`OptionSelectList-${option.value}`}
                                spacing="2"
                                p="2"
                                w="full"
                                rounded="md"
                                cursor={active === option.value ? 'default' : 'pointer'}
                                justify="space-between"
                                align="center"
                                onClick={() => handleSelect(option.value)}
                            >
                                <HStack spacing="2">
                                    {option.wrapper}

                                    <Text fontWeight={600} noOfLines={1} fontSize="md">
                                        {option.label}
                                    </Text>
                                </HStack>
                                {active === option.value && <CheckIcon fontSize={12} opacity={0.8} />}
                            </HStack>
                        ))}
                    </VStack>
                </Stack>
            )}
        </Stack>
    )
}
