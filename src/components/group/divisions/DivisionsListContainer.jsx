import { useState } from 'react'
import Card2 from '../../common/Card2'
import Tabs from '../../common/Tabs'
import CashDivisions from './CashDivisions'
import CreditDivisions from './CreditDivisions'

const DivisionsListContainer = () => {
    const [currentSelected, setCurrentSelected] = useState(0)
    const handleCurrentSelected = selected => setCurrentSelected(selected)

    const gridRows = currentSelected === 1 ? '40px_40px_auto' : '40px_auto'
    return (
        <Card2 className={`relative grid grid-rows-[${gridRows}] gap-4 row-span-2 items-start w-full`}>
            <Tabs
                tabsNames={['efectivo', 'credito']}
                className={'absolute top-4 right-3 w-36'}
                currentSelected={currentSelected}
                handleCurrentSelected={handleCurrentSelected}
            />

            <section>
                <h3 className='text-lg'>Divisiones</h3>
            </section>

            {currentSelected === 0 ? <CashDivisions /> : <CreditDivisions />}
        </Card2>
    )
}

export default DivisionsListContainer
