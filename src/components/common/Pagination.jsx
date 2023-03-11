const Pagination = ({ cantPages, currentPage, changeCurrentPage }) => {
    return (
        <div className='flex justify-end items-center gap-2 mt-2'>
            <button className='px-3 py-1 '>{'<'}</button>
            {[...Array(cantPages)].map((_, index) => (
                <button
                    key={index}
                    className={`px-3 py-1 ${index + 1 === currentPage && 'bg-gray-200'} rounded-md`}
                    onClick={changeCurrentPage}
                    value={index + 1}
                >
                    {index + 1}
                </button>
            ))}

            <button className='px-3 py-1 '>{'>'}</button>
        </div>
    )
}

export default Pagination
