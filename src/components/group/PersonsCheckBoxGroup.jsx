import { useEffect } from 'react'
import { useController } from 'react-hook-form'
import useCheckBoxGroup from '../../hooks/useCheckBoxGroup'
import { currencyFormat, toFloat } from '../../utils/utils'
import CheckBox from '../common/CheckBox'
import Label from '../common/Label'

const PersonsCheckBoxGroup = ({ persons, control, amount, name }) => {
    // // control by react hook form
    const { field, fieldState } = useController({
        control,
        name,
        rules: { required: 'Debe indicar al menos una persona incluida en el gasto' }
    })

    const { error } = fieldState

    const defaultCheckedList = persons.map(person => person.name)

    const {
        checkAll,
        onCheckAllChange,
        checkedList,
        onCheckBoxChange,
        optionIsChecked: personIsChecked
    } = useCheckBoxGroup(defaultCheckedList)

    const amountPerCheckedPerson = currencyFormat(toFloat(amount / checkedList.length))

    useEffect(() => {
        field.onChange(defaultCheckedList)
    }, [])

    useEffect(() => {
        field.onChange(checkedList)
    }, [checkedList])

    return (
        <div className='flex flex-col'>
            <Label>Personas a incluir en el gasto</Label>

            <CheckBox label='TODOS' checked={checkAll} onChange={onCheckAllChange} />
            <hr />
            {persons.map(person => {
                const { id, name } = person

                const personChecked = personIsChecked(name)

                return (
                    <div key={id} className='flex justify-between items-center '>
                        <CheckBox label={name} checked={personChecked ?? false} onChange={onCheckBoxChange} />

                        {personChecked && <p className='m-0 text-2xl'>{amountPerCheckedPerson}</p>}
                    </div>
                )
            })}
            {error && <p className='text-red-500 '>{error.message}</p>}
        </div>
    )
}

export default PersonsCheckBoxGroup
