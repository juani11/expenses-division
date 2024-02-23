import { group } from '../mock/mockData'
import { supabase } from './supabase'

//  GROUP

async function getGroups() {
    const { data: expenseGroup, error } = await supabase.from('expense_group').select(`
    *,
    persons:person (
      id,
      name,
      is_group_owner
    )
  `)

    console.log({ expenseGroup, error })
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
    return await supabase
        .from('expense_group')
        .select(
            `
  name,
  persons:person (
    id,
    name,
    is_group_owner
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
async function createGruop(group) {
    const { groupName, owner, members } = group

    // const resul = {}

    // try {
    //  Create Group record and return it
    // const { data: groupData, error: groupError } = await supabase
    //     .from('expense_group')
    //     .insert([{ name: groupName }])
    //     .select()

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
    const { new_group_id: groupId, public_group_id: publicGroupId } = groupData

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
            is_group_owner: true
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
    return { publicGroupId }
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

export {
    mockCreateGroup,
    createGruop,
    mockGetGroup,
    getGroup,
    getGroups,
    createExpense,
    deleteExpense,
    updateIncludedPersonsOnExpense
}
