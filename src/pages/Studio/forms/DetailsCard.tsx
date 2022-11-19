import {
    Box,
    BoxProps,
    Button,
    Divider,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    HStack,
    Input,
    Stack,
    Textarea,
    useToast,
} from '@chakra-ui/react'
import { FormEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IStudio } from '../../../api/studio/types'
import { useDeleteStudioPicture, useUpdateStudio } from '../../../api/studio/useStudio'
import useUploadPictures from '../../../api/studio/useUploadPictures'
import Card from '../../../components/Card/Card'
import AvatarColorPicker from '../../../components/FormLayout/AvatarColorPicker'
import MultiplePictures from '../../../components/FormLayout/Pictures/MultiplePictures'

interface Props extends BoxProps {
    studio: IStudio
}

export default function DetailsCard({ studio, ...props }: Props): JSX.Element {
    const { t } = useTranslation()
    const [formData, setFormData] = useState<Partial<IStudio>>(studio)
    const uploadPicture = useUploadPictures({ studioId: studio.id })
    const { mutate: deletePicture } = useDeleteStudioPicture()
    const { mutate: updateStudio } = useUpdateStudio()
    const toast = useToast({ position: 'top-right' })

    useEffect(() => {
        setFormData(studio)
    }, [studio])

    const handleChange = (key: keyof Partial<IStudio>, value: IStudio[keyof IStudio]) => {
        setFormData({ ...formData, [key]: value })
    }

    const handleDrop = (acceptedFiles: File[]) => {
        uploadPicture(acceptedFiles)
    }

    const handleDeletePicture = (pictureId: string) => {
        const newPictures = formData.pictures?.filter((picture) => picture._id !== pictureId)
        setFormData({ ...formData, pictures: newPictures })
        deletePicture(
            { studioId: studio.id, pictureId },
            {
                onSuccess: () => {
                    console.log('success')
                },
                onError: () => {
                    console.log('error')
                },
            }
        )
    }

    const handleChangeColor = (color: string) => {
        updateStudio({ id: studio.id, settings: { theme: { color } } })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        updateStudio(
            { id: studio.id, ...formData },
            {
                onSuccess: () => {
                    toast({ title: 'Studio updated', status: 'success' })
                },
                onError: () => {
                    toast({ title: 'Error', status: 'error' })
                },
            }
        )
    }

    const canUpdate = formData.name !== studio.name || formData.description !== studio.description

    return (
        <Card as="form" onSubmit={handleSubmit} {...props}>
            <Stack spacing="5" px={{ base: '4', md: '6' }} py={{ base: '5', md: '6' }}>
                <HStack spacing={4}>
                    <Box w="fit-content">
                        <AvatarColorPicker
                            onColorChange={handleChangeColor}
                            name={formData.name}
                            color={studio.settings?.theme.color ?? '#FFFFFF'}
                        />
                    </Box>
                    <FormControl id="name">
                        <FormLabel>{t('studio.name')}</FormLabel>
                        <HStack>
                            <Input
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.currentTarget.value)}
                            />
                        </HStack>
                    </FormControl>
                </HStack>
                <FormControl overflow="hiden" id="picture">
                    <FormLabel>{t('studio.images')}</FormLabel>
                    <MultiplePictures pictures={formData.pictures} onDelete={handleDeletePicture} onDrop={handleDrop} />
                </FormControl>
                <FormControl id="bio">
                    <FormLabel>{t('studio.description.')}</FormLabel>
                    <Textarea
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.currentTarget.value)}
                        rows={6}
                        resize="none"
                    />
                    <FormHelperText color="subtle">{t('studio.description.subText')}</FormHelperText>
                </FormControl>
            </Stack>
            <Divider />
            <Flex direction="row-reverse" py="4" px={{ base: '4', md: '6' }}>
                <Button isDisabled={!canUpdate} type="submit" variant="primary">
                    {t('button.save')}
                </Button>
            </Flex>
        </Card>
    )
}
