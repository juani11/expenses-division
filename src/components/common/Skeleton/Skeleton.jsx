const skeletonTypes = {
    TEXT: 'w-full h-5',
    H2TITLE: 'w-full h-9 rounded-md',
    H4TITLE: 'w-full h-6 rounded-md',
    H5TITLE: 'w-1/2 h-5 rounded-md',
    AVATAR: 'w-16 h-16 rounded-full',
    BOX: 'w-full h-full rounded-xl',
    BUTTON: 'w-36 h-14 rounded-lg'
}

const Skeleton = ({ type }) => {
    const classes = skeletonTypes[type]
    return <div className={`my-2 bg-gray-200 ${classes}`}></div>
}

export default Skeleton
