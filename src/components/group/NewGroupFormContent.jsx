import Button from '../common/Button'
import Input from './../Input'

const NewGroupFormContent = ({ loading, register, errors }) => {
    return (
        <>
            <div className='w-1/2'>
                <Input
                    label='Nombre del grupo'
                    controlledProps={{
                        ...register('groupName', {
                            required: 'Debe ingresar el nombre del grupo',
                            maxLength: {
                                value: 20,
                                message: `Debe ingresar un máximo de 20 carácteres`
                            }
                        })
                    }}
                    error={errors.groupName}
                />
            </div>
            <div className='w-1/2'>
                <Input
                    label='Tu Nombre'
                    controlledProps={{
                        ...register('owner', {
                            required: 'Debes ingresar tu nombre',
                            maxLength: {
                                value: 20,
                                message: `Debe ingresar un máximo de 20 carácteres`
                            }
                        })
                    }}
                    error={errors.owner}
                />
            </div>
            <div className='w-1/2'>
                <Button type='submit' width='w-full' loading={loading}>
                    crear grupo de gastos
                </Button>
            </div>
        </>
    )
}

export default NewGroupFormContent
