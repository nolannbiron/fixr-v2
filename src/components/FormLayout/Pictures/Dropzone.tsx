import { Button, Center, CenterProps, Icon, Square, Stack, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { FiUploadCloud } from 'react-icons/fi'
import { useDropzone } from 'react-dropzone'

interface Props extends Omit<CenterProps, 'onDrop'> {
    onDrop?: (acceptedFiles: File[]) => void
}

export default function Dropzone({ onDrop, ...props }: Props): JSX.Element {
    const { getRootProps, isDragActive, getInputProps } = useDropzone({
        noClick: true,
        onDrop: onDrop,
        validator: (file) => {
            // > 5MB
            if (file.size > 5000000) {
                return {
                    code: 'file-too-large',
                    message: 'File is too large',
                }
            }

            if (!file.type.startsWith('image/')) {
                return {
                    code: 'file-not-image',
                    message: 'File is not an image',
                }
            }

            return null
        },
    })

    return (
        <Center
            {...(getRootProps() as any)}
            borderWidth="1px"
            borderRadius="lg"
            px="6"
            py="4"
            h="full"
            position="relative"
            borderStyle={isDragActive ? 'dashed' : 'solid'}
            bg={useColorModeValue('white', 'gray.800')}
            {...props}
            as="label"
            className="group"
            cursor="pointer"
        >
            <>
                <input type="file" {...getInputProps()} />
                {isDragActive && (
                    <Stack justify="center" align="center" position="absolute" inset="0" zIndex={10} bg="bg-subtle">
                        <Stack justify="center" align="center" color="muted">
                            <Icon as={FiUploadCloud} boxSize="6" color="muted" />
                            <Text fontSize="lg" mb="2" fontWeight="bold">
                                Déposer vos fichiers ici
                            </Text>
                        </Stack>
                    </Stack>
                )}
                <VStack spacing="3">
                    <Square size="10" bg="bg-subtle" borderRadius="lg">
                        <Icon as={FiUploadCloud} boxSize="5" color="muted" />
                    </Square>
                    <VStack spacing="1">
                        <Stack
                            noOfLines={2}
                            textAlign="center"
                            direction={{ base: 'column', xl: 'row' }}
                            spacing="1"
                            whiteSpace="nowrap"
                        >
                            <Button
                                _groupHover={{
                                    color: 'blue.300',
                                }}
                                as="span"
                                pointerEvents="auto"
                                variant="link"
                                colorScheme="blue"
                                size="sm"
                            >
                                Click to upload
                            </Button>
                            <Text fontSize="sm" color="muted">
                                or drag and drop
                            </Text>
                        </Stack>
                        {/* <Hide below="xl">
                        <Text textAlign="center" fontSize="xs" color="muted">
                            PNG, JPG or GIF up to 2MB
                        </Text>
                    </Hide> */}
                    </VStack>
                </VStack>
            </>
        </Center>
    )
}
