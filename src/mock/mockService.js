const mockService = data => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ res: data })
        }, 2000)
    })
}

export { mockService }
