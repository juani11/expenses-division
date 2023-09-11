const CardHeader = ({ title, children }) => {
    return (
        <div className='flex justify-between items-center py-2'>
            <h3 className='uppercase'>{title}</h3>
            {children}
        </div>
    )
}

export default CardHeader
