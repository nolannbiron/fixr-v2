import { Avatar } from '@chakra-ui/react'
import { useGetStudio, useGetStudios } from '../../api/studio/useStudio'
import { useApp } from '../../contexts/AppContext'
import { getTextColor } from '../../utils'
import SelectList from '../SelectList/SelectList'

export default function ChangeStudio(): JSX.Element {
    const {
        state: { studioId },
        dispatch,
    } = useApp()
    const { data } = useGetStudio({ studioId })
    const { data: dataStudios } = useGetStudios()

    const options = dataStudios?.studios.map((studio) => ({
        label: studio.name,
        value: studio.id,
        wrapper: (
            <Avatar
                color={getTextColor(studio.settings.theme.color)}
                bg={studio.settings.theme.color}
                rounded="md"
                size="sm"
                name={studio.name}
            />
        ),
    }))

    const handleChange = (value: string) => {
        dispatch({ type: 'SET_STUDIO_ID', payload: value })
    }

    return (
        <SelectList
            active={data?.studio.id}
            onChange={handleChange}
            value={data?.studio.name ?? '-'}
            options={options}
        />
    )
}
