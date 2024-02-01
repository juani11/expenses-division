import { DIVISIONS_CASH, DIVISIONS_CREDIT } from '../../../constants'
import { useGroupStore } from '../../../store/store'
import CardContentWithMenu from '../../common/CardContentWithMenu'
import CardHeader from '../../common/CardHeader'
import Skeleton from '../../common/Skeleton/Skeleton'
import SkeletonWrapper from '../../common/Skeleton/SkeletonWrapper'
import CashDivisions from './CashDivisions'
import CreditDivisions from './CreditDivisions'

const DivisionsLoading = () => {
    return (
        <SkeletonWrapper>
            <div className='h-72'>
                <Skeleton type='BOX' />
            </div>
        </SkeletonWrapper>
    )
}

const menuItemsComponents = {
    [DIVISIONS_CASH]: CashDivisions,
    [DIVISIONS_CREDIT]: CreditDivisions
}

const Divisions = () => {
    const loading = useGroupStore(state => state.loading)

    return (
        <section id='divisions'>
            <CardHeader title={'divisiones'} />
            {loading ? (
                <DivisionsLoading />
            ) : (
                <CardContentWithMenu menuItemsComponents={menuItemsComponents} />
            )}
        </section>
    )
}

export default Divisions
