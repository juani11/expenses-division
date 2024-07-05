import { InvalidGroupError } from '../errors/errors'
import { group } from '../mock/mockData'
import { supabase } from './supabase'

//  GROUP

async function getUserGroups(userEmail) {
    const { data, error } = await supabase
        .from('person')
        .select(
            `
    is_group_owner,
    expenseGroup:expense_group (
      name,
      createdAt:created_at,
      publicId:public_id
    )
  `
        )
        .eq('user_email', `${userEmail}`)

    console.log({ data, error })

    if (error) throw Error('Se produjo un error al consultar los grupo del usuario')

    return data.map(elem => ({ userIsOwner: elem.is_group_owner, ...elem.expenseGroup }))
}

function mockGetGroup(groupId) {
    const mockSuccess = true
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            mockSuccess
                ? resolve({
                      ok: true,
                      error: null,
                      data: [group]
                  })
                : reject(new Error('Se produjo un error al crear el grupo'))
        }, 200)
    })
}

async function getGroup(groupId) {
    const { data: expenseGroup, error } = await supabase
        .from('expense_group')
        .select(
            `
            id,
            publicId:public_id,
  name,
  createdAt:created_at,
  persons:person (
    id,
    name,
    userEmail:user_email
  ),
  expenses:expense (
    id,
    name,
    amount,
    person:person_id,
    date:created_at,
    includedPersons:persons_included,
    type,
    creditTypeInfo:credit_type_info
  )
  `
        )
        .eq('public_id', `${groupId}`)

    if (error) throw Error('Se produjo un error al consultar el grupo')

    if (expenseGroup.length === 0) {
        throw new InvalidGroupError('El grupo no existe')
    }

    return expenseGroup
}

function mockCreateGroup(group) {
    const mockSuccess = true
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            mockSuccess
                ? resolve({
                      ok: true,
                      groupId: 3
                  })
                : reject(new Error('Se produjo un error al crear el grupo'))
        }, 2000)
    })
}
async function createGroup(group) {
    const { groupName, owner, userEmail, members } = group

    const { data: groupData, error: groupError } = await supabase.rpc('create_group', {
        group_name: groupName
    })

    if (groupError) {
        if (groupError.message === 'TypeError: Failed to fetch')
            // Throw Error de Conexion a internet....
            throw new Error('Error de conexión a internet...')

        // Throw otro error...
        throw new Error('Se produjo un error al crear el grupo. Inténtelo nuevamente')
    }

    console.log(groupData)

    // const [data] = groupData
    const { new_group_id: groupId, public_group_id: publicGroupId, created_at: createdAt } = groupData

    //  Agrego personas al grupo creado...
    let personsToAdd = members.map(member => ({
        name: member,
        group_id: groupId,
        is_group_owner: false
    }))

    personsToAdd = [
        ...personsToAdd,
        {
            name: owner,
            group_id: groupId,
            is_group_owner: true,
            user_email: userEmail
        }
    ]

    const { error: personError } = await supabase.from('person').insert([...personsToAdd])

    if (personError) throw new Error('Se produjo un error al agregar las personas al grupo')

    // resul.groupId = groupId
    // resul.ok = true
    // } catch (error) {
    //     resul.ok = false
    //     resul.error = error
    // }

    // return resul
    return { publicGroupId, createdAt }
}

//  EXPENSES

async function createExpense(expense) {
    const { name, amount, person, includedPersons, groupId, type, creditTypeInfo } = expense

    const { data: expenseData, error } = await supabase
        .from('expense')
        .insert([
            {
                name,
                amount,
                person_id: person,
                group_id: groupId,
                persons_included: includedPersons,
                type,
                credit_type_info: creditTypeInfo
            }
        ])
        .select()

    if (error) throw new Error('Se produjo un error al crear el gasto')

    const [data] = expenseData
    const { id } = data

    return id
}

async function deleteExpense(expenseId) {
    const { error } = await supabase.from('expense').delete().eq('id', expenseId)

    if (error) throw new Error('Se produjo un error al eliminar el gasto')
}

async function updateIncludedPersonsOnExpense(expenseId, includedPersons) {
    const { error } = await supabase
        .from('expense')
        .update({ persons_included: includedPersons })
        .eq('id', expenseId)

    if (error) throw new Error('Se produjo un error al eliminar el gasto')
}

async function updateUserEmailOfPerson(personId, userEmail) {
    const { data, error } = await supabase
        .from('person')
        .update({ user_email: userEmail })
        .eq('id', personId)
        .select('is_group_owner')

    console.log({ data, error })
    if (error) throw new Error('Se produjo un error al guardar el grupo en el perfil del usurio ')

    const [resul] = data
    const { is_group_owner: personIsOwner } = resul
    return { personIsOwner }
}

export {
    mockCreateGroup,
    createGroup,
    mockGetGroup,
    getUserGroups,
    getGroup,
    getUserGroups as getGroups,
    createExpense,
    deleteExpense,
    updateIncludedPersonsOnExpense,
    updateUserEmailOfPerson
}
