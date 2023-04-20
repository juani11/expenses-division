import Chart from 'react-apexcharts'
import { useEffect, useState } from 'react'
import { currencyFormat } from '../../utils/utils'
import { expensesPerPerson } from '../../logic/logic'
import { useGroupStore } from '../../store/store'

const PersonStatistics = ({ personsName }) => {
    const expenses = useGroupStore(state => state.expenses)

    const totalSpendPerPerson = expensesPerPerson(expenses)
    const totalSpendPerPersonKeys = Object.keys(totalSpendPerPerson)

    const personsSeries = totalSpendPerPersonKeys.map(personId => totalSpendPerPerson[personId].amount)
    const [series, setSeries] = useState(personsSeries)
    const [options, setOptions] = useState({
        chart: {
            width: 180,
            height: 100,
            type: 'donut'
        },
        labels: [...personsName],
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        fontFamily: 'Poiret One, sans-serif',
                        total: {
                            show: true,
                            fontSize: '22px',
                            label: 'Total',
                            fontFamily: 'Poiret One, sans-serif',
                            fontWeight: 600,
                            formatter: function (w) {
                                const total = w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b
                                }, 0)

                                return currencyFormat(total)
                            }
                        },
                        value: {
                            show: true,
                            fontFamily: 'Poiret One, sans-serif',
                            fontWeight: 600,

                            formatter: function (val) {
                                return currencyFormat(val)
                            }
                        }
                    }
                }
            }
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                        height: 150
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        ]
    })

    useEffect(() => {
        setSeries(personsSeries)
    }, [personsSeries])

    return (
        <div className='shadow-lg bg-white py-5 px-2 rounded-xl mt-10 '>
            <Chart width={400} options={options} series={series} type='donut' />
        </div>
    )
}

export default PersonStatistics
