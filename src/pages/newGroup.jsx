import { useForm } from 'react-hook-form'
import NewGroupFormContent from '../components/group/NewGroupFormContent'
import PeopleSVG from '../components/svg/PeopleSVG'
import useNewGroupForm from '../hooks/useNewGroupForm'

const NewGroupHeader = () => {
    return (
        <div className='w-1/2 '>
            <h2>Crea un nuevo grupo para dividir los gastos</h2>
            <p>
                Exercitation tempor anim officia cillum minim cupidatat occaecat qui esse cupidatat sunt
                adipisicing.
            </p>
        </div>
    )
}

const NewGroup = () => {
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm()

    const { loading, error, onSubmit } = useNewGroupForm()

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex justify-center items-center'>
                <div className='flex flex-col gap-10 font-primary mt-20 items-center'>
                    <NewGroupHeader />

                    <NewGroupFormContent loading={loading} register={register} errors={errors} />

                    {error && <p className='text-red-500 border-red-500 bg-red-50 h-14 p-5'>{error}</p>}
                </div>
                <div className='hidden md:block'>
                    <PeopleSVG width={538} height={338} />
                </div>
            </div>
        </form>
    )
}

export default NewGroup
