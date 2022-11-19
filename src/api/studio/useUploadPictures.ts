import { useToast } from '@chakra-ui/react'
import { useUploadStudioPictures } from './useStudio'

interface Props {
    studioId: string | undefined
}

export default function useUploadPictures({ studioId }: Props) {
    const { mutate: mutateUploadPicture } = useUploadStudioPictures({ studioId })
    const toast = useToast({ position: 'top-right' })

    const uploadFiles = async (files: File[]) => {
        if (!files.length || !studioId) {
            toast({ title: 'An error occured while uploading the files' })
            return
        }

        const formData = new FormData()

        formData.append('id', studioId)

        files.forEach(async (file) => {
            formData.append('picture', file)
        })

        mutateUploadPicture(formData, {
            onSuccess: () => {
                toast({ title: 'Files uploaded successfully' })
            },
            onError: () => {
                toast({ title: 'An error occured while uploading the files' })
            },
        })
    }

    return uploadFiles
}
