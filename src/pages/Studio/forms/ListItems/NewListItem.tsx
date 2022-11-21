import { AddIcon } from '@chakra-ui/icons'
import { HStack, IconButton, Input } from '@chakra-ui/react'
import { FormEvent, useState } from 'react'

interface Props {
    onAdd: (value: string) => void
}

export default function NewListItem({ onAdd }: Props): JSX.Element {
    const [value, setValue] = useState('')

    const handleAdd = (e: FormEvent) => {
        e.preventDefault()
        onAdd(value)
        setValue('')
    }

    return (
        <HStack as="form" onSubmit={handleAdd} mt={3}>
            <Input value={value} onChange={(e) => setValue(e.target.value)} />
            <IconButton onClick={handleAdd} aria-label="Add item" icon={<AddIcon />} />
        </HStack>
    )
}
