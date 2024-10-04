import { INCLUDE } from '../../../store/store'
import ManagePersonInExpense from './ManagePersonInExpense'

const IncludePersonToExpense = props => {
    return <ManagePersonInExpense action={INCLUDE} {...props} />
}

export default IncludePersonToExpense
