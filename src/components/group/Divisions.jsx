import { useGroupStore } from '../../store/store'
import CardHeader from '../common/CardHeader'
import Skeleton from '../common/Skeleton/Skeleton'
import SkeletonWrapper from '../common/Skeleton/SkeletonWrapper'
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

const Divisions = () => {
    const loading = useGroupStore(state => state.loading)

    return (
        <section id='divisions'>
            <CardHeader title={'divisiones'} />
            {loading ? <DivisionsLoading /> : <DivisionsList />}
        </section>
    )
}

export default Divisions
