import { Spinner, Stack, StackDivider } from '@chakra-ui/react'
import AddressForm from './forms/AddressCard'
import FormLayout from '../../components/FormLayout/FormLayout'
import DetailsCard from './forms/DetailsCard'
import RulesCard from './forms/ListItems/ListItems'
import { useApp } from '../../contexts/AppContext'
import { useGetStudio } from '../../api/studio/useStudio'

export default function StudioPage(): JSX.Element {
    const {
        state: { studioId },
    } = useApp()
    const { data, isLoading, isError } = useGetStudio({ studioId })

    if (isLoading) return <Spinner />
    if (!data || isError) return <></>

    return (
        <Stack spacing="5" divider={<StackDivider />}>
            <FormLayout title="ℹ️ Général" description="Ces informations seront visibles par tous.">
                <DetailsCard studio={data.studio} flex={1} maxW={{ base: 'full', lg: '3xl' }} />
            </FormLayout>
            <FormLayout title="📍 Adresse" description="Le lieu où vous effectuerez les sessions.">
                <AddressForm studio={data.studio} flex={1} maxW={{ base: 'full', lg: '3xl' }} />
            </FormLayout>
            <FormLayout title="🍭 Extras" description="Les extras que vous proposez.">
                <RulesCard
                    detailsKey="extras"
                    subtitle=""
                    studio={data.studio}
                    flex={1}
                    maxW={{ base: 'full', lg: '3xl' }}
                />
            </FormLayout>
            <FormLayout title="🔒 Règles" description="Les règles de votre studio.">
                <RulesCard detailsKey="rules" studio={data.studio} flex={1} maxW={{ base: 'full', lg: '3xl' }} />
            </FormLayout>
        </Stack>
    )
}
