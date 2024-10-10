import { useGroupStore } from '../../../store/store'
import Skeleton from '../../common/Skeleton/Skeleton'
import SkeletonWrapper from '../../common/Skeleton/SkeletonWrapper'
import DivisionsListContainer from './DivisionsListContainer'

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

    return <section id='divisions'>{loading ? <DivisionsLoading /> : <DivisionsListContainer />}</section>
}

export default Divisions
