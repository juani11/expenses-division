import { useState } from 'react'
import { useGroupStore } from '../../store/store'
import { updateUserEmailOfPerson } from '../../services/services'
import { LinkIcon } from '../icons/icons'
import Modal from '../common/Modal'
import CustomSelect from '../common/CustomSelect'
import useModal from '../../hooks/useModal'

const SyncWithCurrentUserProfileBtn = ({ userEmail, addGroup }) => {
    const [selectedPerson, setSelectedPerson] = useState(null)

    const handleChange = option =>
        setSelectedPerson({
            ...selectedPerson,
            id: option.id,
            value: option.value
        })

    const groupInfo = useGroupStore(state => state.info)
    const persons = useGroupStore(state => state.persons)

    const personsOptions = persons.map(({ id, name, userEmail }) => {
        const personAlreadyHasGroupInHisProfile = userEmail

        return {
            id,
            value: name,
            render: () => {
                return personAlreadyHasGroupInHisProfile ? (
                    <div className='flex gap-4 items-center cursor-not-allowed '>
                        {name}

                        <h6 className='m-0'>(Ya vinculado con {userEmail})</h6>
                    </div>
                ) : (
                    name
                )
            }
        }
    })

    const handleCLick = async () => {
        if (!selectedPerson) {
            console.log('No se seleccionó a la persona...')
            return
        }

        const personId = selectedPerson.id

        return updateUserEmailOfPerson(personId, userEmail)
            .then(res => {
                console.log(res)
                const { personIsOwner } = res

                // Actualizar el estado del usuario actual. (Se agrega el grupo que acaba de vincular en el estado de los grupos del usuario)
                addGroup({
                    publicId: groupInfo.publicId,
                    name: groupInfo.name,
                    createdAt: groupInfo.createdAt,
                    userIsOwner: personIsOwner
                })
            })
            .catch(error => console.log('error al agregar al vincular grupo al perfil del usuario', error))
    }

    const { openModal, closeModal, modalIsOpen, modalIsLoading, onSubmit } = useModal(handleCLick)
    return (
        <>
            <button
                className='text-xs gap-1 text-gray-900  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white rounded py-1.5 px-1.5 inline-flex items-center justify-center bg-white border-gray-200 border'
                onClick={openModal}
            >
                <LinkIcon /> <span>Vincular a mi perfil</span>
            </button>
            <Modal
                title={`Vincular grupo al perfil`}
                isOpen={modalIsOpen}
                closeModal={closeModal}
                callback={onSubmit}
                isLoading={modalIsLoading}
                withFooter
            >
                <div className='mt-5 flex flex-col gap-y-10 h-48'>
                    <section className='flex flex-col gap-2'>
                        <p>Selecciona qué persona eres dentro del grupo.</p>
                        <p>
                            Al confirmar, éste grupo quedará guardado en tu perfil
                            <span>
                                <strong> ({userEmail}) </strong>
                            </span>
                            <span>para que puedas consultarlo desde allí</span>
                        </p>
                    </section>

                    <CustomSelect
                        placeholder='Selecciona la persona'
                        options={personsOptions}
                        handleChange={handleChange}
                        selectedValue={selectedPerson?.value}
                        type={'form'}
                    />
                </div>
            </Modal>
        </>
    )
}
export default SyncWithCurrentUserProfileBtn
