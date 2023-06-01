import Skeleton from '../common/Skeleton/Skeleton'
import SkeletonWrapper from '../common/Skeleton/SkeletonWrapper'

const GroupHeaderLoading = () => {
    return (
        <SkeletonWrapper>
            <div className=' flex items-center w-96 justify-center gap-5 mt-6'>
                <Skeleton type='AVATAR' />
                <div className='w-1/3'>
                    <Skeleton type='H2TITLE' />
                </div>
            </div>
            <div className='flex items-center justify-evenly gap-10 mt-6 w-96'>
                <div className='flex flex-col items-center w-44'>
                    <div className='w-20'>
                        <Skeleton type='H4TITLE' />
                    </div>
                    <div className='flex justify-start items-center w-full gap-3 '>
                        <div className='w-1/3'>
                            <Skeleton type='H2TITLE' />
                        </div>
                        <div className='w-2/3'>
                            <Skeleton type='H2TITLE' />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col items-center'>
                    <div className='w-14'>
                        <Skeleton type='H4TITLE' />
                    </div>

                    <div className='w-24'>
                        <Skeleton type='H2TITLE' />
                    </div>
                </div>
            </div>
        </SkeletonWrapper>
    )
}

export default GroupHeaderLoading
