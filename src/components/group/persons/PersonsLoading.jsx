import Skeleton from '../../common/Skeleton/Skeleton'
import SkeletonWrapper from '../../common/Skeleton/SkeletonWrapper'

const PersonsLoading = () => {
    return (
        <SkeletonWrapper>
            <div className='mb-2 h-12'>
                <Skeleton type='BOX' />
            </div>
            <div className='h-64'>
                <Skeleton type='BOX' />
            </div>
        </SkeletonWrapper>
    )
}

export default PersonsLoading
