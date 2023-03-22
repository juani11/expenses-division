import { useGroupStore } from '../../store/store'
import Avatar from '../common/Avatar'
import Tooltip from '../common/Tooltip'
import CloseSVG from '../svg/CloseSVG'

const RemoveIcon = ({ onClick }) => (
    <Avatar size={'sm'} color={'hover:bg-gray-100'} onClick={onClick}>
        <CloseSVG />
    </Avatar>
)
const RemoveExpense = ({ expenseName, expenseId }) => {
    const removeExpense = useGroupStore(state => state.removeExpense)

    const callbackOnOk = () => removeExpense(expenseId)

    return (
        <Tooltip
            title={`Seguro que desea eliminar el gasto "${expenseName}"?`}
            callbackOnOk={callbackOnOk}
            component={RemoveIcon}
        />
    )
}

export default RemoveExpense
