import { totalAmountOfExpenses } from '../../logic/logic'
import { useGroupStore } from '../../store/store'
import { currencyFormat } from '../../utils/utils'
import Avatar from '../common/Avatar'
import MoneySVG from '../svg/MoneySVG'
import PeopleSelfieSVG from '../svg/PeopleSelfieSVG'
import GroupHeaderLoading from './GroupHeaderLoading'

const GroupHeaderInfo = ({ groupName = 'viaje brasil', cantPersons = 1 }) => {
    const expenses = useGroupStore(state => state.expenses)

    const totalAmount = currencyFormat(totalAmountOfExpenses(expenses))

    return (
        <>
            <div className='flex items-center w-96 justify-center gap-5 mt-6'>
                <Avatar color='primary'>{groupName?.charAt(0).toUpperCase()}</Avatar>
                <div className='flex flex-col items-start gap-2'>
                    <h2 className='m-0 capitalize'>{groupName}</h2>
                    {/* <Button size='xs' onClick={openModal}>
                        Editar
                    </Button>
                    <FormProvider {...methods}>
                        <ModalDrawerForm
                            title='Nuevo gasto'
                            isOpen={modalIsOpen}
                            closeModal={closeModal}
                            modalIsLoading={modalIsLoading}
                        >
                            <AddExpenseFormContent />
                        </ModalDrawerForm>
                    </FormProvider> */}
                </div>
            </div>

            <div className='flex items-center justify-between gap-10 mt-6 w-96'>
                <div className='flex flex-col items-center'>
                    <h4 className='m-0'>Total Gastos</h4>
                    <div className='flex justify-start items-center'>
                        <div className='shrink-0'>
                            <MoneySVG width={80} height={50} />
                        </div>
                        <div className='relative'>
                            <h3 className='absolute top-2 '>$</h3>
                            <h1 className='px-4'>{totalAmount}</h1>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col items-center  m-auto'>
                    <h4 className='m-0'>Personas </h4>{' '}
                    <div className='flex justify-between items-center gap-4 '>
                        <h1 className='grow'>{cantPersons}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

const GroupHeaderImage = () => {
    return (
        <div className='hidden md:block md:absolute md:right-0 lg:right-80 '>
            <PeopleSelfieSVG width={350} height={300} />
        </div>
    )
}
const GroupHeader = props => {
    const loading = useGroupStore(state => state.loading)

    return (
        <div className='flex flex-col-reverse items-center md:flex-row md:relative '>
            <div className='flex flex-col gap-3 '>
                {loading ? <GroupHeaderLoading /> : <GroupHeaderInfo {...props} />}
            </div>
            <GroupHeaderImage />
        </div>
    )
}

export default GroupHeader
