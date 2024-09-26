import { useState } from 'react'

const tagVariantSelector = {
    default: {
        gray: 'bg-white',
        primary: 'bg-primary',
        secondary: 'bg-secondary '
    },
    light: {
        gray: 'bg-white',
        primary: 'bg-primary-50',
        secondary: 'bg-secondary-50 '
    }
    // outline: {
    //     primary: 'bg-transparent text-primary border border-primary  hover:text-white hover:bg-primary ',
    //     secondary: 'bg-transparent text-secondary border border-secondary hover:text-white hover:bg-secondary'
    // },
    // subtle: {
    //     primary: 'bg-transparent text-primary hover:bg-primary-50 ',
    //     secondary: 'bg-transparent text-secondary hover:bg-secondary-50 '
    // }
}

const tagVariantSelected = {
    default: {
        primary: 'text-white',
        secondary: 'text-white '
    },
    light: {
        primary: 'text-primary',
        secondary: 'text-secondary'
    }
    // outline: {
    //     primary: 'bg-transparent text-primary border border-primary  hover:text-white hover:bg-primary ',
    //     secondary: 'bg-transparent text-secondary border border-secondary hover:text-white hover:bg-secondary'
    // },
    // subtle: {
    //     primary: 'bg-transparent text-primary hover:bg-primary-50 ',
    //     secondary: 'bg-transparent text-secondary hover:bg-secondary-50 '
    // }
}

const Tabs = ({
    tabsNames,
    currentSelected,
    handleCurrentSelected,
    variant = 'default',
    color = 'gray',
    className
}) => {
    const cantTabs = tabsNames.length
    const tabSelectorWidth = Math.round(100 / cantTabs)
    const tabSelectorWidthStyle = `${tabSelectorWidth}%`

    const tagVntSelector = tagVariantSelector[variant][color]
    const tagVntSelected = tagVariantSelected[variant][color]

    const translate = 100 * currentSelected

    return (
        <div
            className={`bg-gray-100 rounded-full flex justify-between py-1  border-gray-100 border dark:bg-gray-800 dark:border-slate-800 ${className}`}
        >
            <div
                className={`absolute h-[90%] left-0 right-0 top-0 bottom-0 mt-auto mb-auto ${tagVntSelector}  dark:bg-gray-600 rounded-full transition-transform`}
                style={{
                    width: tabSelectorWidthStyle,
                    transform: `translateX(${translate}%)`
                }}
            ></div>
            {tabsNames.map((tabName, index) => (
                <span
                    key={tabName}
                    className={`cursor-pointer py-1 text-xs capitalize z-10 w-1/2 text-center  ${
                        currentSelected.index !== index
                            ? 'hover:opacity-75 transition-opacity'
                            : tagVntSelected
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
