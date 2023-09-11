import { DIVISIONS_CASH, DIVISIONS_CREDIT } from '../../../constants'
import { useGroupStore } from '../../../store/store'
import CardContentWithMenu from '../../common/CardContentWithMenu'
import CardHeader from '../../common/CardHeader'
import Skeleton from '../../common/Skeleton/Skeleton'
import SkeletonWrapper from '../../common/Skeleton/SkeletonWrapper'
import DivisionListCredit from './DivisionListCredit'
import DivisionsList from './DivisionsList'

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
    [DIVISIONS_CASH]: DivisionsList,
    [DIVISIONS_CREDIT]: DivisionListCredit
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
