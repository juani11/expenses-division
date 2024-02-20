const usePageSEO = () => {
    const setMetaTag = (attr, key, content) => {
        const element = document.querySelector(`meta[${attr}="${key}"]`)

        element.setAttribute('content', content)
    }

    const setOpenGraphDescription = description => {
        setMetaTag('property', 'og:description', description)
    }

    return setOpenGraphDescription
}

export default usePageSEO
