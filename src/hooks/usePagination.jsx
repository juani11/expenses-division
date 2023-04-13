import { useEffect, useState } from 'react'

const PAGINATION_MAX_ITEMS_PER_PAGE = 3

const usePagination = items => {
    const [currentPage, setCurrentPage] = useState(1)

    const cantItems = items.length

    const indexBegin = (currentPage - 1) * PAGINATION_MAX_ITEMS_PER_PAGE
    const indexEnd = indexBegin + PAGINATION_MAX_ITEMS_PER_PAGE

    const cantPages = Math.ceil(cantItems / PAGINATION_MAX_ITEMS_PER_PAGE)
    const showPagination = cantItems > PAGINATION_MAX_ITEMS_PER_PAGE

    const changeCurrentPage = e => {
        setCurrentPage(parseInt(e.target.value))
    }

    const prevPage = () => setCurrentPage(currentPage - 1)
    const nextPage = () => setCurrentPage(currentPage + 1)

    const itemsInCurrentPage = items && items.slice(indexBegin, indexEnd)

    useEffect(() => {
        if (itemsInCurrentPage.length === 0) prevPage()
    })

    return {
        cantPages,
        currentPage,
        changeCurrentPage,
        prevPage,
        nextPage,
        showPagination,
        itemsInCurrentPage
    }
}
export default usePagination
