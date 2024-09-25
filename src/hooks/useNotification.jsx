import { toast } from 'sonner'

const useNotification = () => {
    const successNotification = message => toast.success(message)
    const errorNotification = message => toast.error(message)

    return {
        successNotification,
        errorNotification
    }
}

export default useNotification
