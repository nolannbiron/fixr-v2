import { Avatar, Box, Circle, useOutsideClick } from '@chakra-ui/react'
import { HiPencil } from 'react-icons/hi'
import { GithubPicker } from 'react-color'
import { useEffect, useRef, useState } from 'react'
import { getTextColor } from '../../utils'

interface Props {
    name?: string
    color: string
    onColorChange?: (color: string) => void
}

export const pickerDefaultColors = [
    '#B80000',
    '#DB3E00',
    '#FCCB00',
    '#008B02',
    '#006B76',
    '#1273DE',
    '#004DCF',
    '#5300EB',
]

export default function AvatarColorPicker({ name, color: baseColor, onColorChange }: Props): JSX.Element {
    const ref = useRef(null)
    const [open, setOpen] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [color, setColor] = useState(baseColor)

    useEffect(() => {
        setColor(baseColor)
    }, [baseColor])

    useOutsideClick({
        ref,
        handler: () => setOpen(false),
    })

    const handleColor = (color: { hex: string }) => {
        setColor(color.hex)
        !!onColorChange && onColorChange(color.hex)
        setOpen(false)
    }

    return (
        <>
            <Box
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                ref={ref}
                position="relative"
            >
                <Avatar color={getTextColor(color)} bg={color} size="lg" rounded="lg" name={name} />
                {isHovering && (
                    <Circle
                        cursor="pointer"
                        onClick={() => setOpen(!open)}
                        position="absolute"
                        top="-2"
                        right="-2"
                        p={1}
                        bg="bg-muted"
                    >
                        <HiPencil size={14} />
                    </Circle>
                )}
                {open && (
                    <Box zIndex={9999} w="full" top="2" left="10" pt={4} position="absolute">
                        <GithubPicker
                            width="100%"
                            color={color}
                            colors={Object.values(pickerDefaultColors)}
                            onSwatchHover={(e) => setColor(e.hex)}
                            onChange={handleColor}
                            onChangeComplete={handleColor}
                        />
                    </Box>
                )}
            </Box>
        </>
    )
}
