const Card = ({ className, children }) => {
    return (
        <div
            className={`shadow bg-white py-5 px-2 rounded dark:bg-slate-800 dark:border dark:border-slate-700 ${className}`}
        >
            {children}
        </div>
    )
}

export default Card
