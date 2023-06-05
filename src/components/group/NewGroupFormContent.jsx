import useNewGroupFormContext from '../../hooks/useNewGroupFormContext'
import Button from '../common/Button'
import Input from './../Input'
import Members from './Members'

const formFieldsRules = {
    groupName: {
        required: 'Debe ingresar el nombre del grupo',
        maxLength: {
            value: 20,
            message: `Debe ingresar un máximo de 20 carácteres`
        }
    },
    owner: {
        required: 'Debes ingresar tu nombre',
        maxLength: {
            value: 20,
            message: `Debe ingresar un máximo de 20 carácteres`
        }
    }
}

const NewGroupFormContent = () => {
    const newGroupFormContext = useNewGroupFormContext()
    const { registerField, errorsFields, loading } = newGroupFormContext

    const { groupName: groupNameRules, owner: ownerRules } = formFieldsRules

    return (
        <>
            <div className='w-full flex  divide-x '>
                <div className='w-1/2 flex flex-col gap-10 px-10'>
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

            <div className='w-full px-10'>
                <Button type='submit' width='w-full' loading={loading}>
                    crear grupo de gastos
                </Button>
            </div>
        </>
    )
}

export default NewGroupFormContent
