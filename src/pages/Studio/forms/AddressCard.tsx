import {
    BoxProps,
    Button,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Stack,
    useToast,
} from '@chakra-ui/react'
import { FormEvent, useEffect, useState } from 'react'
import { IStudio } from '../../../api/studio/types'
import { useUpdateStudio } from '../../../api/studio/useStudio'
import Card from '../../../components/Card/Card'

interface Props extends BoxProps {
    studio: IStudio
}

export default function AddressForm({ studio, ...props }: Props): JSX.Element {
    const [formData, setFormData] = useState<Partial<IStudio['address']>>(studio.address)
    const { mutate: updateStudio } = useUpdateStudio()
    const toast = useToast({ position: 'top-right' })

    useEffect(() => {
        setFormData(studio.address)
    }, [studio.address])

    const handleChange = (
        key: keyof Partial<IStudio['address']>,
        value: IStudio['address'][keyof IStudio['address']]
    ) => {
        setFormData({ ...formData, [key]: value })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log(formData)
        updateStudio(
            { id: studio.id, address: formData },
            {
                onSuccess: () => {
                    toast({
                        title: 'Adresse mise à jour',
                        description: 'Votre adresse a bien été mise à jour.',
                        status: 'success',
                    })
                },
            }
        )
    }

    return (
        <Card as="form" onSubmit={handleSubmit} {...props}>
            <Stack spacing="5" px={{ base: '4', md: '6' }} py={{ base: '5', md: '6' }}>
                <HStack>
                    <FormControl w="auto" id="number">
                        <FormLabel>Numéro</FormLabel>
                        <Input
                            value={formData.streetNumber ?? ''}
                            onChange={(e) => handleChange('streetNumber', e.target.value)}
                            w="full"
                        />
                    </FormControl>
                    <FormControl w="85%" flex={1} id="street">
                        <FormLabel>Street</FormLabel>
                        <Input
                            value={formData.street ?? ''}
                            onChange={(e) => handleChange('street', e.currentTarget.value)}
                        />
                    </FormControl>
                </HStack>
                <Stack spacing="6" direction={{ base: 'column', md: 'row' }}>
                    <FormControl id="city">
                        <FormLabel>City</FormLabel>
                        <Input
                            value={formData.city ?? ''}
                            onChange={(e) => handleChange('city', e.currentTarget.value)}
                        />
                    </FormControl>
                    <FormControl id="zip">
                        <FormLabel>Postal Code</FormLabel>
                        <Input
                            value={formData.postalCode ?? ''}
                            onChange={(e) => handleChange('postalCode', e.currentTarget.value)}
                        />
                    </FormControl>
                </Stack>
            </Stack>
            <Divider />
            <Flex direction="row-reverse" py="4" px={{ base: '4', md: '6' }}>
                <Button isDisabled={formData === studio.address} onClick={handleSubmit} type="submit" variant="primary">
                    Enregistrer
                </Button>
            </Flex>
        </Card>
    )
}
