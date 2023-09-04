const SkeletonShimmer = () => {
    return (
        <div className='shimmer-wrapper animate-loading absolute h-full w-full top-0 left-0 '>
            <div className='shimmer w-1/2 h-full bg-white dark:bg-slate-900 opacity-30 skew-x-[-20deg]'></div>
        </div>
    )
}

export default SkeletonShimmer
