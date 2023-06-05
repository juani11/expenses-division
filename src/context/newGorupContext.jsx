import { createContext } from 'react'

export const NewGroupFormContext = createContext()

const NewGroupFormProvider = ({ children, ...newGroupFormProps }) => {
    return (
        <NewGroupFormContext.Provider value={{ ...newGroupFormProps }}>
            {children}
        </NewGroupFormContext.Provider>
    )
}

export default NewGroupFormProvider
