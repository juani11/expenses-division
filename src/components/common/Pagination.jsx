import ChevronLeft from '../svg/ChevronLeft'
import ChevronRight from '../svg/ChevronRight'

const Pagination = ({ cantPages, currentPage, prevPage, nextPage, changeCurrentPage }) => {
    return (
        <div className='flex justify-end items-center gap-2 mt-2'>
            {currentPage > 1 && (
                <button className='px-3 py-1 rounded-md hover:bg-gray-100' onClick={prevPage}>
                    <ChevronLeft />
                </button>
            )}
            {[...Array(cantPages)].map((_, index) => (
                <button
                    key={index}
                    className={`px-3 py-1 rounded-md hover:bg-gray-100 ${
                        index + 1 === currentPage && 'bg-gray-100 font-bold'
                    }  `}
                    onClick={changeCurrentPage}
                    value={index + 1}
                >
                    {index + 1}
                </button>
            ))}
            <div className='w-8'>
                {currentPage < cantPages && (
                    <button className='px-3 py-1 rounded-md hover:bg-gray-100' onClick={nextPage}>
                        <ChevronRight />
                    </button>
                )}
            </div>
        </div>
    )
}

export default Pagination
