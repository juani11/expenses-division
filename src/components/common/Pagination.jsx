import { ArrowLefttIcon, ArrowRightIcon } from '../icons/icons'
import Button from './Button'

const PaginationButton = ({ onClick, children }) => {
    return (
        <Button
            size='icon'
            color='secondary'
            variant='light'
            onClick={onClick}
            className={`bg-gray-50 hover:bg-gray-100`}
        >
            {children}
        </Button>
    )
}
const PrevButton = ({ onClick }) => {
    return (
        <PaginationButton onClick={onClick}>
            <ArrowLefttIcon className={'w-4 h-4  '} />
        </PaginationButton>
    )
}
const NextButton = ({ onClick }) => {
    return (
        <PaginationButton onClick={onClick}>
            <ArrowRightIcon className={'w-4 h-4'} />
        </PaginationButton>
    )
}

const Pagination = ({ cantPages, currentPage, prevPage, nextPage, changeCurrentPage }) => {
    const percentage = 100 * currentPage
    // const translate = percentage

    const showPrevButton = currentPage !== 1
    const showNextButton = currentPage < cantPages
    return (
        <div className='relative flex items-center gap-1'>
            <div className='h-8 w-8'>{showPrevButton && <PrevButton onClick={prevPage} />}</div>

            {/* <div
                className={`absolute h-8 left-0 right-0 top-0 bottom-0 mt-auto mb-auto bg-primary dark:bg-gray-600 rounded transition-transform`}
                style={{
                    width: '32px',
                    transform: `translateX(${translate}%)`
                }}
            ></div> */}
            <ul className='flex items-center gap-1'>
                {[...Array(cantPages)].map((_, index) => (
                    <li
                        key={index}
                        size='xs'
                        color='secondary'
                        onClick={changeCurrentPage}
                        value={index + 1}
                        className={`h-8 w-8 py-1 px-1 flex justify-center items-center rounded text-xs cursor-pointer z-10  ${
                            index + 1 === currentPage
                                ? 'bg-primary-50 text-primary hover:bg-primary-100 font-bold transition-all'
                                : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                    >
                        {index + 1}
                    </li>
                ))}
            </ul>
            {showNextButton && <NextButton onClick={nextPage} />}
        </div>
    )
}

export default Pagination
