import { EXCLUDE } from '../../../store/store'
import ManagePersonInExpense from './ManagePersonInExpense'

const ExcludePersonFromExpense = props => {
    return <ManagePersonInExpense action={EXCLUDE} {...props} />
}

export default ExcludePersonFromExpense
