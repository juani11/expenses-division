import ChevronLeft from '../../svg/ChevronLeft'
import ChevronRight from '../../svg/ChevronRight'

const className = 'px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-slate-700'

export const ChevronLeftBtn = ({ onClick }) => {
    return (
        <button className={className} onClick={onClick}>
            <ChevronLeft />
        </button>
    )
}

export const ChevronRightBtn = ({ onClick }) => {
    return (
        <button className={className} onClick={onClick}>
            <ChevronRight />
        </button>
    )
}
