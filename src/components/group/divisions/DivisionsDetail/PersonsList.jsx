const PersonsList = ({ persons, selectedPerson, handleChangeSelectedPerson }) => {
    return (
        <ul
            id='persons'
            className=' flex justify-center flex-wrap gap-2 py-6 sticky top-0 bg-white z-10 [animation-timeline:scroll()] [animation-range:0_200px] [animation-name:toRight]  [animation-fill-mode:both] dark:bg-slate-800 '
        >
            {persons.map(person => (
                <li
                    key={person.id}
                    className={`px-3 py-1 rounded-md text-sm font-bold cursor-pointer transition capitalize
                        ${
                            person.id === selectedPerson.id
                                ? 'bg-black hover:bg-black border border-black text-white dark:bg-white dark:text-black'
                                : 'bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600'
                        }
                    }`}
                    onClick={() => handleChangeSelectedPerson(person)}
                >
                    {person.name}
                </li>
            ))}
        </ul>
    )
}
export default PersonsList
