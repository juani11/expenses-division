import NewGroupFormContent from '../components/group/NewGroupFormContent'
import NewGroupHeader from '../components/group/NewGroupHeader'
import ErrorSVG from '../components/svg/ErrorSVG'
import PeopleSVG from '../components/svg/PeopleSVG'
import NewGroupFormProvider from '../context/newGorupContext'
import useNewGroupForm from '../hooks/useNewGroupForm'

const NewGroup = () => {
    const newGroupFormProps = useNewGroupForm()

    const { error, onFinish } = newGroupFormProps

    return (
        <form onSubmit={onFinish()}>
            <div className='flex justify-center items-center gap-20 '>
                <div className='flex flex-col gap-10 font-primary justify-center items-center h-screen '>
                    <NewGroupHeader />

                    <NewGroupFormProvider {...newGroupFormProps}>
                        <NewGroupFormContent />
                    </NewGroupFormProvider>
                    {error && (
                        <p className='text-black flex justify-between gap-5 items-center border border-red-100 bg-red-100 p-4 text-lg rounded-lg'>
                            <ErrorSVG />
                            {error}
                        </p>
                    )}
                </div>
                <div className='hidden md:block'>
                    <PeopleSVG width={530} height={330} />
                </div>
            </div>
        </form>
    )
}

export default NewGroup
