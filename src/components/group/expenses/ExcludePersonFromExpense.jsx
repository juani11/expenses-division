import { LEFT } from '../../../constants'
import useIncludeExcludePerson from '../../../hooks/useIncludeExcludePerson'
import useNotification from '../../../hooks/useNotification'
import { EXCLUDE } from '../../../store/store'
import { capitalizeFirstLetter } from '../../../utils/utils'
import IconButton from '../../common/IconButton'
import Tooltip from '../../common/Tooltip'
import { UserMinusIcon } from '../../icons/icons'

export const ExcludePersonBtn = ({ onClick }) => {
    return <IconButton variant='light' onClick={onClick} icon={UserMinusIcon} />
}

const ExcludePersonFromExpense = ({ person: { id, name }, callback, expenseId }) => {
    const updateIncludedPersonsInExpense = useIncludeExcludePerson(expenseId)
    const { successNotification, errorNotification } = useNotification()

    const onOkTooltip = () => {
        const newIncludedPersonsInExpense = callback(EXCLUDE, id)
        return updateIncludedPersonsInExpense(newIncludedPersonsInExpense)
    }

    const onSuccess = () => successNotification('Persona excluida del gasto correctamente!')
    const onError = () => errorNotification('Se produjo un error al excluir la persona del gasto')

    return (
        <Tooltip
            title={`¿Excluir a ${capitalizeFirstLetter(name)} del gasto?`}
            callbackOnOk={onOkTooltip}
            component={ExcludePersonBtn}
            position={LEFT}
            onSuccess={onSuccess}
            onError={onError}
        />
    )
}

export default ExcludePersonFromExpense
