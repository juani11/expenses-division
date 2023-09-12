import NewGroupFormContent from '../components/group/NewGroupFormContent'
import NewGroupHeader from '../components/group/NewGroupHeader'
import { ErrorIcon } from '../components/icons/icons'
import { PeopleIllustration } from '../components/illustrations/Illustrations'
import NewGroupFormProvider from '../context/newGorupContext'
import useNewGroupForm from '../hooks/useNewGroupForm'

const NewGroup = () => {
    const newGroupFormProps = useNewGroupForm()

    const { error, onFinish } = newGroupFormProps

    return (
        <>
            <form onSubmit={onFinish()}>
                <div className='flex flex-col-reverse justify-center items-center pt-20 md:gap-20 md:flex-row md:mt-0 md:pt-0'>
                    <div className='flex flex-col gap-10 justify-center items-center md:h-screen '>
                        <NewGroupHeader />

                        <NewGroupFormProvider {...newGroupFormProps}>
                            <NewGroupFormContent />
                        </NewGroupFormProvider>
                        {error && (
                            <p className='text-black flex justify-between gap-5 items-center border border-red-100 bg-red-100 p-4 text-lg rounded-lg'>
                                <ErrorIcon />
                                {error}
                            </p>
                        )}
                    </div>
                    <div className='md:block w-[430px] h-[230px] md:w-[530px] md:h-[330px]'>
                        <PeopleIllustration width='full' height='full' />
                    </div>
                </div>
            </form>
        </>
    )
}

export default NewGroup
