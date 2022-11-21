import { BoxProps, Divider, FormControl, FormHelperText, FormLabel, Stack, useToast, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { IStudio } from '../../../../api/studio/types'
import {
    useCreateStudioDetails,
    useDeleteStudioDetails,
    useUpdateStudioDetails,
} from '../../../../api/studio/useStudio'
import Card from '../../../../components/Card/Card'
import NewListItem from './NewListItem'
import ListItem from './Item'

interface Props extends BoxProps {
    studio: IStudio
    detailsKey: keyof IStudio['details']
    subtitle?: string
}

export default function RulesCard({ studio, subtitle, detailsKey, ...props }: Props): JSX.Element {
    const [values, setValues] = useState(studio.details[detailsKey])
    const { mutate: add } = useCreateStudioDetails({ studioId: studio.id, type: detailsKey })
    const { mutate: remove } = useDeleteStudioDetails({ studioId: studio.id, type: detailsKey })
    const { mutate: update } = useUpdateStudioDetails({ studioId: studio.id, type: detailsKey })
    const toast = useToast({ position: 'top-right' })

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
                <FormControl id={detailsKey}>
                    <FormLabel>{detailsKey}</FormLabel>
                    <VStack spacing={3}>
                        {values?.map((item) => (
                            <ListItem
                                key={item._id}
                                value={item.data}
                                onRemove={() => handleRemove(item._id)}
                                onUpdate={(value) => handleUpdate(value, item._id)}
                            />
                        ))}
                    </VStack>
                    <NewListItem onAdd={handleAdd} />
                    <FormHelperText color="subtle">{subtitle}</FormHelperText>
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
