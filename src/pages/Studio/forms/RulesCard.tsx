import {
    BoxProps,
    Button,
    Divider,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Stack,
    Textarea,
} from '@chakra-ui/react'
import Card from '../../../components/Card/Card'

export default function RulesCard(props: BoxProps): JSX.Element {
    return (
        <Card {...props}>
            <Stack spacing="5" px={{ base: '4', md: '6' }} py={{ base: '5', md: '6' }}>
                <FormControl id="bio">
                    <FormLabel>Règles</FormLabel>
                    <Textarea
                        _placeholder={{ fontStyle: 'italic', color: 'subtle' }}
                        placeholder="Interdiction de fumer à l'intérieur"
                        rows={13}
                        resize="none"
                    />
                    <FormHelperText color="subtle">Write a short introduction about yourself</FormHelperText>
                </FormControl>
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
