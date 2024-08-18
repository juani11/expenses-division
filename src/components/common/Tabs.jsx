import { useState } from 'react'

const Tabs = ({ tabsNames, className }) => {
    const cantTabs = tabsNames.length
    const tabSelectorWidth = Math.round(100 / cantTabs)
    const tabSelectorWidthStyle = `${tabSelectorWidth}%`

    const [currentSelected, setCurrentSelected] = useState({ index: 0, translate: 0 })

    const handleCurrentSelected = selected => {
        const percentage = 100 * selected
        setCurrentSelected({
            index: selected,
            translate: percentage
        })
    }

    return (
        <div
            className={` bg-gray-100 rounded-full flex justify-between py-1  border-gray-100 border dark:bg-gray-800 dark:border-slate-800 ${className}`}
        >
            <div
                className={`absolute h-[90%] left-0 right-0 top-0 bottom-0 mt-auto mb-auto bg-white dark:bg-gray-600 rounded-full transition-transform`}
                style={{
                    width: tabSelectorWidthStyle,
                    transform: `translateX(${currentSelected.translate}%)`
                }}
            ></div>
            {tabsNames.map((tabName, index) => (
                <span
                    key={tabName}
                    className={`cursor-pointer py-1 text-xs capitalize z-10 w-1/2 text-center  ${
                        currentSelected !== tabName && 'hover:opacity-75 transition-opacity'
                    }`}
                    onClick={() => handleCurrentSelected(index)}
                >
                    {tabName}
                </span>
            ))}
        </div>
    )
}

export default Tabs
