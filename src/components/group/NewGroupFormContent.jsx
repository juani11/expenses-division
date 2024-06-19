import useAuth from '../../hooks/useAuth'
import useNewGroupFormContext from '../../hooks/useNewGroupFormContext'
import Button from '../common/Button'
import Input from './../Input'
import Members from './Members'

const formFieldsRules = {
    groupName: {
        required: 'Debe ingresar el nombre del grupo',
        maxLength: {
            value: 30,
            message: `Debe ingresar un máximo de 30 carácteres`
        }
    },
    owner: {
        required: 'Debes ingresar tu nombre',
        maxLength: {
            value: 30,
            message: `Debe ingresar un máximo de 30 carácteres`
        }
    }
}

const NewGroupFormContent = () => {
    const newGroupFormContext = useNewGroupFormContext()
    const { registerField, errorsFields, setValue, loading } = newGroupFormContext

    const { groupName: groupNameRules, owner: ownerRules } = formFieldsRules

    const { session } = useAuth()

    const initialName = session?.name
    const userEmail = session?.email

    setValue('owner', initialName)
    setValue('userEmail', userEmail)

    return (
        <>
            <div className='w-full flex flex-col md:divide-x md:flex-row '>
                <div className='flex flex-col  gap-10 px-10 mb-10 md:mb-0 md:w-1/2'>
                    <div className='w-full'>
                        <Input
                            label='Nombre del grupo'
                            controlledProps={{
                                ...registerField('groupName', groupNameRules)
                            }}
                            error={errorsFields.groupName}
                        />
                    </div>
                    <div className='w-full'>
                        <Input
                            label='Tu Nombre'
                            controlledProps={{
                                ...registerField('owner', ownerRules)
                            }}
                            error={errorsFields.owner}
                        />
                    </div>
                </div>
                <Members />
            </div>

            <div className='w-full p-10'>
                <Button type='submit' width='w-full' loading={loading}>
                    crear grupo de gastos
                </Button>
            </div>
        </>
    )
}

export default NewGroupFormContent
