import { DeleteIcon } from '@chakra-ui/icons'
import {
    BoxProps,
    Divider,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    IconButton,
    Input,
    Stack,
    useToast,
    VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { IStudio } from '../../../api/studio/types'
import { useCreateStudioDetails, useDeleteStudioDetails, useUpdateStudioDetails } from '../../../api/studio/useStudio'
import Card from '../../../components/Card/Card'
import NewListItem from './NewListItem'

interface Props extends BoxProps {
    studio: IStudio
    detailsKey: keyof IStudio['details']
}

export default function RulesCard({ studio, detailsKey, ...props }: Props): JSX.Element {
    const [values, setValues] = useState(studio.details[detailsKey])
    const { mutate: add } = useCreateStudioDetails({ studioId: studio.id, type: detailsKey })
    const { mutate: remove } = useDeleteStudioDetails({ studioId: studio.id, type: detailsKey })
    const { mutate: update } = useUpdateStudioDetails({ studioId: studio.id, type: detailsKey })
    const toast = useToast({ position: 'top-right' })
    // const [debouncedValues, setDebouncedValues] = useState(values)

    useEffect(() => {
        setValues(studio.details[detailsKey])
    }, [studio, detailsKey])

    const handleAdd = (value: string) => {
        add(
            { data: value },
            {
                onSuccess: () => {
                    toast({
                        title: 'Success',
                        description: 'Studio updated',
                    })
                },
                onError: (error) => {
                    toast({
                        title: 'Error',
                        description: error.message,
                    })
                },
            }
        )
    }

    const handleRemove = (id: string) => {
        remove(
            { id },
            {
                onSuccess: () => {
                    toast({
                        title: 'Success',
                        description: 'Studio updated',
                    })
                },
            }
        )
    }

    const handleUpdate = (value: string, id: string) => {
        update(
            { id, data: value },
            {
                onSuccess: () => {
                    toast({
                        title: 'Success',
                        description: 'Studio updated',
                    })
                },
            }
        )
    }

    return (
        <Card {...props}>
            <Stack spacing="5" px={{ base: '4', md: '6' }} py={{ base: '5', md: '6' }}>
                <FormControl id="bio">
                    <FormLabel>{detailsKey}</FormLabel>
                    <VStack spacing={3}>
                        {values?.map((value, index) => (
                            <Flex w="full" key={value.id}>
                                <Input
                                    onChangeCapture={(e) => handleUpdate(e.currentTarget.value, value.id)}
                                    key={index}
                                    value={value.data}
                                />
                                <IconButton
                                    onClick={() => handleRemove(value.id)}
                                    aria-label="Remove"
                                    icon={<DeleteIcon />}
                                />
                            </Flex>
                        ))}
                    </VStack>
                    <NewListItem onAdd={handleAdd} />
                    <FormHelperText color="subtle">Write a short introduction about yourself</FormHelperText>
                </FormControl>
            </Stack>
            <Divider />
            {/* <Flex direction="row-reverse" py="4" px={{ base: '4', md: '6' }}>
                <Button type="submit" variant="primary">
                    Enregistrer
                </Button>
            </Flex> */}
        </Card>
    )
}
