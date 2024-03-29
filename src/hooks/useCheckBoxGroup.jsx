import { useState } from 'react'

const useCheckBoxGroup = defaultCheckedList => {
    const [checkAll, setCheckAll] = useState(true)
    const [checkedList, setCheckedList] = useState(defaultCheckedList)

    const onCheckAllChange = () => {
        const newCheckedList = checkAll ? [] : defaultCheckedList

        setCheckedList(newCheckedList)

        setCheckAll(!checkAll)
    }

    const onCheckBoxChange = e => {
        const { value, checked } = e.target

        const parsedValue = parseInt(value)

        let newCheckedList

        if (!checked) {
            newCheckedList = checkedList.filter(elem => elem !== parsedValue)
            setCheckAll(false)
        } else newCheckedList = [...checkedList, parsedValue]

        setCheckedList(newCheckedList)
    }

    const optionIsChecked = value => {
        const optionIndex = checkedList.findIndex(item => item === value)
        return checkedList[optionIndex]
    }

    return {
        checkAll,
        onCheckAllChange,
        checkedList,
        onCheckBoxChange,
        optionIsChecked
    }
}

export default useCheckBoxGroup
