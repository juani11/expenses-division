const Pagination = ({ cantPages, currentPage, prevPage, nextPage, changeCurrentPage }) => {
    return (
        <div className='flex justify-end items-center gap-2 mt-2'>
            {currentPage > 1 && (
                <button className='px-3 py-1' onClick={prevPage}>
                    {'<'}
                </button>
            )}
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
            <div className='w-8'>
                {currentPage < cantPages && (
                    <button className='px-3 py-1' onClick={nextPage}>
                        {'>'}
                    </button>
                )}
            </div>
        </div>
    )
}

export default Pagination
