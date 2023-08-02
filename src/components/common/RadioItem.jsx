import CheckSVG from '../svg/CheckSVG'

// ${
//     selectedValue === name &&
//     !withCheckIcon &&
//     'bg-primary-500 text-white hover:bg-primary-500 '
// }

const RadioItem = ({ item, selectedValue, onClick, withCheckIcon, children }) => {
    const { name, title, description, icon } = item
    return (
        <>
            <div
                className={`border cursor-pointer relative hover:bg-gray-50
                ${selectedValue === name && 'border-primary-500'}
               
                `}
                onClick={() => onClick(name)}
            >
                {children}

                {selectedValue === name && withCheckIcon && (
                    <CheckSVG className=' fill-primary absolute right-4 top-2' />
                )}
                {description && <p className='text-xs pb-4 pl-4 ml-0.5 my-2 '>{description}</p>}
            </div>

            {/* <div
                className={`border p-4 cursor-pointer relative hover:bg-gray-50 ${
                    selectedValue === name && 'border-primary-500 '
                }`}
                onClick={() => onClick(name)}
            >
                <div className='flex  items-center gap-3'>
                    {icon && icon}
                    <h5 className='m-0'>{title}</h5>
                </div>

                {selectedValue === name && <CheckSVG className=' fill-primary absolute right-4 top-2' />}
                {description && <p className='text-xs my-2 mx-0.5'>{description}</p>}
            </div> */}
        </>
    )
}
export default RadioItem
