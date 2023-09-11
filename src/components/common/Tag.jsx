const Tag = ({ children }) => {
    return (
        <span className='flex gap-2 items-center bg-primary-200 px-2 rounded py-1 text-sm font-bold text-primary dark:bg-primary-500 dark:text-slate-100'>
            {children}
        </span>
    )
}

export default Tag
