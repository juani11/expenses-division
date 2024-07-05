import CardHeader from './common/CardHeader'
import Skeleton from './common/Skeleton/Skeleton'
import SkeletonWrapper from './common/Skeleton/SkeletonWrapper'

const UserGroupsLoading = () => {
    return (
        <>
            <CardHeader title={'Mis grupos'}>
                <SkeletonWrapper>
                    <Skeleton type='BUTTON' />
                </SkeletonWrapper>
            </CardHeader>
            <SkeletonWrapper>
                <div className='h-72'>
                    <Skeleton type='BOX' />
                </div>
            </SkeletonWrapper>
        </>
    )
}

export default UserGroupsLoading
