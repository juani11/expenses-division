import { LEFT } from '../../../constants'
import useIncludeExcludePerson from '../../../hooks/useIncludeExcludePerson'
import useNotification from '../../../hooks/useNotification'
import { INCLUDE } from '../../../store/store'
import { capitalizeFirstLetter } from '../../../utils/utils'
import IconButton from '../../common/IconButton'
import Tooltip from '../../common/Tooltip'
import { UserPlusIcon, UserMinusIcon } from '../../icons/icons'

const IncludePersonBtn = ({ onClick }) => {
    return <IconButton variant='light' onClick={onClick} icon={UserPlusIcon} />
}
const ExcludePersonBtn = ({ onClick }) => {
    return <IconButton variant='light' onClick={onClick} icon={UserMinusIcon} />
}

const ManagePersonInExpense = ({ action, person: { id, name }, callback, expenseId }) => {
    const formatedPersonName = capitalizeFirstLetter(name)

    const managePersonProps =
        action === INCLUDE
            ? {
                  onSuccessMsg: 'Persona incluida al gasto correctamente!',
                  onErrorMsg: 'Se produjo un error al incluir la persona al gasto',
                  tooltipTitle: `¿Incluir a ${formatedPersonName} al gasto?`,
                  tooltipComponent: IncludePersonBtn
              }
            : {
                  onSuccessMsg: 'Persona excluida del gasto correctamente!',
                  onErrorMsg: 'Se produjo un error al excluir la persona del gasto',
                  tooltipTitle: `¿Excluir a ${formatedPersonName} del gasto?`,
                  tooltipComponent: ExcludePersonBtn
              }

    const { onSuccessMsg, onErrorMsg, tooltipTitle, tooltipComponent } = managePersonProps

    const updateIncludedPersonsInExpense = useIncludeExcludePerson(expenseId)
    const { successNotification, errorNotification } = useNotification()

    const onOkTooltip = () => {
        const newIncludedPersonsInExpense = callback(action, id)
        return updateIncludedPersonsInExpense(newIncludedPersonsInExpense)
    }

    const onSuccess = () => successNotification(onSuccessMsg)
    const onError = () => errorNotification(onErrorMsg)

    return (
        <Tooltip
            title={tooltipTitle}
            callbackOnOk={onOkTooltip}
            component={tooltipComponent}
            position={LEFT}
            onSuccess={onSuccess}
            onError={onError}
        />
    )
}

export default ManagePersonInExpense
