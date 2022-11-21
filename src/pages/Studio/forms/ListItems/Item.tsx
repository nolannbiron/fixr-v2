import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Flex, Icon, IconButton, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { useDebounce } from 'react-use'

interface Props {
    value: string
    onUpdate: (value: string) => void
    onRemove: () => void
}

export default function ListItem({ value, onUpdate, onRemove }: Props): JSX.Element {
    const [inputValue, setInputValue] = useState(value)
    const [isEditing, setIsEditing] = useState(false)

    useDebounce(
        () => {
            onUpdate(inputValue)
            setIsEditing(false)
        },
        600,
        [inputValue]
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleBlur = () => {
        setIsEditing(false)
    }

    return (
        <Flex w="full" align="center" className="gap-3">
            {isEditing ? (
                <Input onBlur={handleBlur} onChange={handleChange} value={inputValue} />
            ) : (
                <>
                    <p className="w-full">{value}</p>
                    <IconButton onClick={() => setIsEditing(true)} aria-label="Edit" icon={<Icon as={EditIcon} />} />
                </>
            )}
            <IconButton onClick={onRemove} aria-label="Remove" icon={<DeleteIcon />} />
        </Flex>
    )
}
