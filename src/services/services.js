import { supabase } from './supabase'

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
    includedPersons:personsincluded
  )
  `
        )
        .eq('id', `${groupId}`)
}

function mockCreateGroup(group) {
    const { groupName, owner } = group
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
    const { groupName, owner } = group

    const resul = {}

    try {
        //  Create Group record  and return it
        const { data: groupData, error: groupError } = await supabase
            .from('expense_group')
            .insert([{ name: groupName }])
            .select()

        if (!groupError) {
            console.log(groupData)
            const [data] = groupData
            const { id: groupId } = data

            // Insertar al creador
            const { data: personData, error } = await supabase
                .from('person')
                .insert([{ name: owner, group_id: groupId, is_group_owner: true }])

            resul.groupId = 45
            resul.ok = true
        }
    } catch (error) {
        resul.ok = false
        resul.error = error
    }

    return resul
}

export { mockCreateGroup, createGruop, getGroup, getGroups }
