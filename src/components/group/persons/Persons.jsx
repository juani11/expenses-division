import { PERSONS_LIST, PERSONS_TOTALS } from '../../../constants'
import { useGroupStore } from '../../../store/store'
import CardContentWithMenu from '../../common/CardContentWithMenu'
import CardHeader from '../../common/CardHeader'
import PersonsList from './PersonsList'
import PersonsLoading from './PersonsLoading'
import PersonsTotals from './PersonsTotals'

const menuItemsComponents = {
    [PERSONS_LIST]: PersonsList,
    [PERSONS_TOTALS]: PersonsTotals
}

const Persons = () => {
    const loading = useGroupStore(state => state.loading)

    return (
        <section id='persons'>
            <CardHeader title={'personas'} />
            {loading ? <PersonsLoading /> : <CardContentWithMenu menuItemsComponents={menuItemsComponents} />}
        </section>
    )
}

export default Persons
