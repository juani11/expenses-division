import CheckSVG from '../svg/CheckSVG'

// ${
//     selectedValue === name &&
//     !withCheckIcon &&
//     'bg-primary-500 text-white hover:bg-primary-500 '
// }

const RadioItem = ({ item, selectedValue, onClick, withCheckIcon, children }) => {
    const { id, description } = item
    return (
        <>
            <div
                className={`border rounded cursor-pointer relative hover:bg-gray-50
                ${selectedValue === id && 'border-primary-500'}
                `}
                onClick={() => onClick(id)}
            >
                {children}

                {selectedValue === id && withCheckIcon && (
                    <CheckSVG className=' fill-primary absolute right-4 top-2' />
                )}
                {description && <p className='text-xs pb-4 pl-4 ml-0.5 my-2 '>{description}</p>}
            </div>
        </>
    )
}
export default RadioItem
