import { MinusIcon } from '@chakra-ui/icons'
import { AspectRatio, Box, Circle, HStack, Image } from '@chakra-ui/react'
import { IPicture } from '../../../api/studio/types'
import Dropzone from './Dropzone'

interface Props {
    pictures?: IPicture[]
    onDrop?: (acceptedFiles: File[]) => void
    onDelete?: (pictureId: string) => void
}

export default function MultiplePictures({ pictures, onDrop, onDelete }: Props): JSX.Element {
    return (
        <Box position="relative" overflow="hidden" borderRadius="lg">
            {!!pictures?.length && (
                <HStack pb={4} overflowX="scroll" align="stretch" spacing={{ base: '3', md: '3' }} wrap="nowrap">
                    {pictures.map((picture) => (
                        <Box w={{ base: '45%', lg: '25%' }} key={picture._id} position="relative" flexShrink={0}>
                            <AspectRatio w="full">
                                <Image
                                    objectFit="contain"
                                    h="full"
                                    w="full"
                                    bg="bg-subtle"
                                    borderRadius="lg"
                                    src={picture.url}
                                />
                            </AspectRatio>
                            <Circle
                                _hover={{
                                    bg: 'red.500',
                                    color: 'white',
                                    shadow: 'md',
                                    cursor: 'pointer',
                                }}
                                onClick={() => !!onDelete && onDelete(picture._id)}
                                position="absolute"
                                top="2px"
                                right="2px"
                                bg="red.600"
                                display="flex"
                                rounded="full"
                                p={1}
                            >
                                <MinusIcon boxSize={4} />
                            </Circle>
                        </Box>
                    ))}
                </HStack>
            )}

            <Dropzone onDrop={onDrop} h="full" />
        </Box>
    )
}
