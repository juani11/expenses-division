import { useEffect } from 'react'
import { useController } from 'react-hook-form'
import useCheckBoxGroup from '../../../hooks/useCheckBoxGroup'
import { currencyFormat, toFloat } from '../../../utils/utils'
import CheckBox from '../../common/CheckBox'
import Label from '../../common/Label'

const amountClassname = `leading-none  font-bold text-sm`

const PersonsCheckBoxGroup = ({ persons, control, amount, name }) => {
    // control by react hook form
    const { field, fieldState } = useController({
        control,
        name,
        rules: { required: 'Debe indicar al menos una persona incluida en el gasto' }
    })

    const { error } = fieldState

    const defaultCheckedList = persons.map(person => person.id)

    const {
        checkAll,
        onCheckAllChange,
        checkedList,
        onCheckBoxChange,
        optionIsChecked: personIsChecked
    } = useCheckBoxGroup(defaultCheckedList)

    // const amountPerCheckedPerson = currencyFormat(toFloat(amount / checkedList.length))
    const amountPerCheckedPerson = amount / checkedList.length

    useEffect(() => {
        // send data to react hook form
        field.onChange(defaultCheckedList)
    }, [])

    useEffect(() => {
        // send data to react hook form
        field.onChange(checkedList)
    }, [checkedList])

    return (
        <div className='flex flex-col '>
            <Label>Personas a incluir en el gasto</Label>

            <div className='pt-1'>
                <CheckBox label='TODOS' checked={checkAll} onChange={onCheckAllChange} />
                <hr className='dark:border-t-slate-700 my-2' />
                {persons.map(person => {
                    const { id, name } = person

                    const personChecked = personIsChecked(id)

                    return (
                        <div key={id} className=' h-5 flex gap-10 items-center capitalize py-4 '>
                            <CheckBox
                                label={name}
                                checked={personChecked ?? false}
                                value={id}
                                onChange={onCheckBoxChange}
                            />

                            {personChecked && (
                                <span className={`${amountClassname} ml-auto`}>{`$${currencyFormat(
                                    amountPerCheckedPerson
                                )}`}</span>
                            )}
                            {/* <p className='m-0 text-xl'>$ {amountPerCheckedPerson}</p>} */}
                        </div>
                    )
                })}
            </div>
            {/* {error && <p className='text-red-500 '>{error.message}</p>} */}
        </div>
    )
}

export default PersonsCheckBoxGroup
