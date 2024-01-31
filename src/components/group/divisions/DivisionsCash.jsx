import { useState } from 'react'
import useModal from '../../../hooks/useModal'
import { calculateFinalResult } from '../../../logic/logic'
import { useGroupStore } from '../../../store/store'
import Card from '../../common/Card'
import ModalDrawer from '../../common/ModalDrawer'
import DivisionListItem from './DivisionListItem'
import PersonsList from './DivisionsDetail/PersonsList'
import EmptyDivisionsList from './EmptyDivisionsList'
import DetailPerPerson from './DivisionsDetail/DetailPerPerson'

const DivisionsCash = () => {
    const persons = useGroupStore(state => state.persons)
    const expenses = useGroupStore(state => state.expenses)

    const { finalResult, involvedExpenses } = calculateFinalResult(persons, expenses)

    const { openModal, closeModal, modalIsOpen } = useModal()

    return (
        <Card className='animate-fade'>
            {finalResult.length === 0 ? (
                <EmptyDivisionsList
                    title='Aún no hay divisiones con Efectivo/Débito...'
                    subtitle='Acá verás cuánto le corresponde pagar a cada integrante'
                />
            ) : (
                <>
                    <section id='detail' className='flex justify-center'>
                        <button
                            className='py-1 px-3 my-6 rounded text-sm bg-gray-100 hover:bg-gray-50  dark:bg-slate-600 dark:hover:bg-slate-500'
                            onClick={openModal}
                        >
                            Ver detalle
                        </button>
                        <ModalDrawer
                            title={`Detalle de las divisiones`}
                            isOpen={modalIsOpen}
                            closeModal={closeModal}
                        >
                            <DetailPerPerson expensesInMonth={involvedExpenses} />
                        </ModalDrawer>
                    </section>
                    <ul>
                        {finalResult.map((division, index) => (
                            <DivisionListItem key={index} division={division} />
                        ))}
                    </ul>
                </>
            )}
        </Card>
    )
}

export default DivisionsCash
