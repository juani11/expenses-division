import { ChevronLeftIcon, ChevronRightIcon } from '../../icons/icons'

const className = 'px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-slate-700'

export const ChevronLeftBtn = ({ onClick }) => {
    return (
        <button className={className} onClick={onClick}>
            <ChevronLeftIcon />
        </button>
    )
}

export const ChevronRightBtn = ({ onClick }) => {
    return (
        <button className={className} onClick={onClick}>
            <ChevronRightIcon />
        </button>
    )
}
