import ChevronLeft from '../svg/ChevronLeft'
import ChevronRight from '../svg/ChevronRight'

const Pagination = ({ cantPages, currentPage, prevPage, nextPage, changeCurrentPage }) => {
    return (
        <div className='flex justify-end items-center gap-2 mt-10'>
            {currentPage > 1 && (
                <button className='px-3 py-2  hover:bg-gray-100 dark:hover:bg-slate-700' onClick={prevPage}>
                    <ChevronLeft />
                </button>
            )}
            {[...Array(cantPages)].map((_, index) => (
                <button
                    key={index}
                    className={`px-3 py-1 hover:bg-gray-100 dark:hover:bg-slate-700 ${
                        index + 1 === currentPage && 'bg-gray-100 dark:bg-slate-700 font-bold'
                    }  `}
                    onClick={changeCurrentPage}
                    value={index + 1}
                >
                    {index + 1}
                </button>
            ))}
            <div>
                {currentPage < cantPages && (
                    <button
                        className='px-3 py-2  hover:bg-gray-100 dark:hover:bg-slate-700'
                        onClick={nextPage}
                    >
                        <ChevronRight />
                    </button>
                )}
            </div>
        </div>
    )
}

export default Pagination
