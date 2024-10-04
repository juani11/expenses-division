import { LEFT } from '../../../constants'
import useIncludeExcludePerson from '../../../hooks/useIncludeExcludePerson'
import useNotification from '../../../hooks/useNotification'
import { INCLUDE } from '../../../store/store'
import { capitalizeFirstLetter } from '../../../utils/utils'
import IconButton from '../../common/IconButton'
import Tooltip from '../../common/Tooltip'
import { UserPlusIcon } from '../../icons/icons'

export const IncludePersonBtn = ({ onClick }) => {
    return <IconButton variant='light' onClick={onClick} icon={UserPlusIcon} />
}

const IncludePersonToExpense = ({ person: { id, name }, callback, expenseId }) => {
    const updateIncludedPersonsInExpense = useIncludeExcludePerson(expenseId)
    const { successNotification, errorNotification } = useNotification()

    const onOkTooltip = () => {
        const newIncludedPersonsInExpense = callback(INCLUDE, id)
        return updateIncludedPersonsInExpense(newIncludedPersonsInExpense)
    }

    const onSuccess = () => successNotification('Persona incluida al gasto correctamente!')
    const onError = () => errorNotification('Se produjo un error al incluir la persona al gasto')

    return (
        <Tooltip
            title={`¿Incluir a ${capitalizeFirstLetter(name)} al gasto?`}
            callbackOnOk={onOkTooltip}
            component={IncludePersonBtn}
            position={LEFT}
            onSuccess={onSuccess}
            onError={onError}
        />
    )
}
export default IncludePersonToExpense
