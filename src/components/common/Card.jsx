const Card = ({ className, children }) => {
    return (
        <div
            className={`shadow-lg bg-white py-5 px-6 rounded-2xl dark:bg-[hsl(240_10%_3.9%)] dark:border dark:border-slate-700 ${className}`}
        >
            {children}
        </div>
    )
}

export default Card
