import { useContext } from 'react'
import { NewGroupFormContext } from '../context/newGorupContext'

const useNewGroupFormContext = () => {
    const newGroupFormContext = useContext(NewGroupFormContext)
    return newGroupFormContext
}
export default useNewGroupFormContext
