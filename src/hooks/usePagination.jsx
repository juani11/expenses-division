import { useState } from 'react'

const PAGINATION_MAX_ITEMS_PER_PAGE = 3

const usePagination = cantItems => {
    const [currentPage, setCurrentPage] = useState(1)

    const indexBegin = (currentPage - 1) * PAGINATION_MAX_ITEMS_PER_PAGE
    const indexEnd = indexBegin + PAGINATION_MAX_ITEMS_PER_PAGE

    const cantPages = Math.ceil(cantItems / PAGINATION_MAX_ITEMS_PER_PAGE)
    const showPagination = cantItems > PAGINATION_MAX_ITEMS_PER_PAGE

    const changeCurrentPage = e => {
        setCurrentPage(parseInt(e.target.value))
    }

    const prevPage = () => setCurrentPage(currentPage - 1)
    const nextPage = () => setCurrentPage(currentPage + 1)

    return {
        cantPages,
        currentPage,
        changeCurrentPage,
        prevPage,
        nextPage,
        showPagination,
        indexBegin,
        indexEnd
    }
}
export default usePagination
