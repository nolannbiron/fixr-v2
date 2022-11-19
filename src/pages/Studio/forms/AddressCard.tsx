import { BoxProps, Button, Divider, Flex, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import { useState } from 'react'
import { IStudio } from '../../../api/studio/types'
import Card from '../../../components/Card/Card'

interface Props extends BoxProps {
    studio: IStudio
}

export default function AddressForm({ studio, ...props }: Props): JSX.Element {
    const [formData, setFormData] = useState<Partial<IStudio>>(studio)

    const handleChange = (key: keyof Partial<IStudio>, value: IStudio[keyof IStudio]) => {
        setFormData({ ...formData, [key]: value })
    }

    return (
        <Card as="form" {...props}>
            <Stack spacing="5" px={{ base: '4', md: '6' }} py={{ base: '5', md: '6' }}>
                <FormControl id="street">
                    <FormLabel>Street</FormLabel>
                    <Input value={formData.name} onChange={(e) => handleChange('name', e.currentTarget.value)} />
                </FormControl>
                <Stack spacing="6" direction={{ base: 'column', md: 'row' }}>
                    <FormControl id="city">
                        <FormLabel>City</FormLabel>
                        <Input defaultValue="Berlin" />
                    </FormControl>
                    <FormControl id="state">
                        <FormLabel>State / Province</FormLabel>
                        <Input />
                    </FormControl>
                    <FormControl id="zip">
                        <FormLabel>ZIP/ Postal Code</FormLabel>
                        <Input defaultValue="10961" />
                    </FormControl>
                </Stack>
            </Stack>
            <Divider />
            <Flex direction="row-reverse" py="4" px={{ base: '4', md: '6' }}>
                <Button type="submit" variant="primary">
                    Enregistrer
                </Button>
            </Flex>
        </Card>
    )
}
