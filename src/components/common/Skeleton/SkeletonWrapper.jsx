import SkeletonShimmer from './SkeletonShimmer'

const SkeletonWrapper = ({ children }) => {
    return (
        <div className='relative overflow-hidden'>
            {children}
            <SkeletonShimmer />
        </div>
    )
}

export default SkeletonWrapper
