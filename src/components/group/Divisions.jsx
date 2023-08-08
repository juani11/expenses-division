import useCardMenu from '../../hooks/useCardMenu'
import { useGroupStore } from '../../store/store'
import CardHeader from '../common/CardHeader'
import CardMenu from '../common/CardMenu'
import Skeleton from '../common/Skeleton/Skeleton'
import SkeletonWrapper from '../common/Skeleton/SkeletonWrapper'
import DivisionListCredit from './DivisionListCredit'
import DivisionsList from './DivisionsList'

const DivisionsLoading = () => {
    return (
        <SkeletonWrapper>
            <div className='h-72'>
                <Skeleton type='BOX' />
            </div>
        </SkeletonWrapper>
    )
}

export const DIVISIONS_CASH = 'efectivo'
export const DIVISIONS_CREDIT = 'crédito'

const menuItemsComponents = {
    [DIVISIONS_CASH]: DivisionsList,
    [DIVISIONS_CREDIT]: DivisionListCredit
}

const menuItems = [DIVISIONS_CASH, DIVISIONS_CREDIT]

const Divisions = () => {
    const loading = useGroupStore(state => state.loading)

    const { menuItemSelected, changeMenuOption, MenuItemContent } = useCardMenu(menuItemsComponents)
    return (
        <div>
            <section id='divisions'>
                <CardHeader title={'divisiones'} />
                {loading ? (
                    <DivisionsLoading />
                ) : (
                    <>
                        <CardMenu
                            menuItems={menuItems}
                            menuItemSelected={menuItemSelected}
                            changeMenuOption={changeMenuOption}
                        />
                        <MenuItemContent />
                    </>
                )}
            </section>
        </div>
    )
}

export default Divisions
