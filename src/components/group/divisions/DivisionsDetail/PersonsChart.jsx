import Chart from 'react-apexcharts'
import { formatedAmount } from '../../../../utils/utils'

const currencyFormat = num => (num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : '0')
const seriesInitialState = {
    name: 'Total ',

    data: [-2520, -30000, 0, 21500, 3000, -7300]
    // data: [0, 60000]
}

const optionsInitialState = {
    colors: ['#6c63ff'],

    tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        shared: true,
        intersect: false,
        style: {
            fontFamily: 'Lexend '
        }
    },

    chart: {
        height: 350,
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            borderRadius: 5,
            borderRadiusApplication: 'end',
            columnWidth: '50%',
            dataLabels: {
                position: 'top' // top, center, bottom
            },
            colors: {
                ranges: [
                    {
                        from: -1000000,
                        to: 0,
                        color: '#10101C'
                    }
                ]
            }
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            type: 'vertical',
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            colorStops: [
                [
                    {
                        offset: 0,
                        color: '#4318FF',
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: 'rgba(67, 24, 255, 1)',
                        opacity: 0.28
                    }
                ]
            ]
        }
    },
    dataLabels: {
        enabled: false,
        formatter: function (val) {
            if (val === 0) return 'Excluido'
            return val < 0 ? '- $' + currencyFormat(Math.abs(val)) : '$' + currencyFormat(val)
        },
        style: {
            fontFamily: 'Poiret One',
            cssClass: 'text-xs rounded'
        },
        background: {
            enabled: true,
            foreColor: '#000',
            padding: 5,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: '#fff',
            opacity: 0.9,
            dropShadow: {
                enabled: true,
                top: 1,
                left: 1,
                blur: 1,
                color: '#000',
                opacity: 0.45
            }
        }
    },

    grid: {
        borderColor: '#efefef',
        strokeDashArray: 1
    },
    xaxis: {
        categories: [
            'Regalo papá',
            'Entradas Disney on ice',
            'Cena sistons',
            'Compras cotto',
            'Fernet',
            'Cena Mar de las pampas'
            // 'Nostrud sint amet mollit eu.',
            // 'Lorem id sint fugiat ea nostrud sit cupidatat pariatur incididunt eiusmod ullamco.',
            // 'Qui excepteur consectetur officia officia et eiusmod irure id duis adipisicing.',
            // 'Et eu sunt ad elit do magna Lorem esse.'
        ],
        labels: {
            style: {
                fontFamily: 'Poiret One',
                cssClass: 'text-xs fill-gray-500 dark:fill-gray-400 max-w-1 '
            },
            trim: true,
            rotate: 0,
            hideOverlappingLabels: false
        }
    },
    yaxis: {
        labels: {
            show: true,
            align: 'right',
            formatter: function (y) {
                return y < 0 ? '- $' + currencyFormat(Math.abs(y)) : '$' + currencyFormat(y)
            },
            style: {
                fontFamily: 'Poiret One'
            },
            offsetX: -15
        }
    }
}
const PersonChart = ({ expensesNames, expensesDiff, personName, totalToPay, totalDiff }) => {
    const series = [{ ...seriesInitialState, data: expensesDiff }]
    const options = {
        ...optionsInitialState,
        xaxis: { ...optionsInitialState.xaxis, categories: expensesNames }
    }

    return (
        <div className='grid gap-10'>
            <div className='grid xl:grid-cols-1 grid-cols-1 gap-4'>
                <section id='chart' className=' grid  gap-2 py-5   '>
                    <section className=' '>
                        <header className='flex justify-between gap-4'>
                            <section id='total' className=' flex flex-col gap-2'>
                                <span className='opacity-70 text-sm'>Total de gastos</span>
                                <span className='text-3xl font-bold'>{formatedAmount(totalToPay)}</span>
                            </section>

                            <section id='total_detail' className='grid gap-2'>
                                <div className='flex flex-col  gap-1'>
                                    <span className=' text-sm'>
                                        <span className='font-bold'>{personName}</span>{' '}
                                        <span className='text-sm font-light'>
                                            {totalDiff < 0 ? 'debe dar' : 'debe recibir'}
                                        </span>
                                    </span>
                                    <span
                                        className={`text-xl font-bold ${
                                            totalDiff < 0 ? 'bg-red-500' : totalDiff > 0 && 'bg-green-500'
                                        } text-white px-2 py-0.5 rounded`}
                                    >
                                        {formatedAmount(totalDiff)}
                                    </span>
                                </div>

                                <div className='flex items-center gap-3  '>
                                    <div className='flex flex-col  gap-1'>
                                        <span className='opacity-70 text-xs'>
                                            {/* Pagado por Franco */}
                                            Total a recibir
                                        </span>
                                        <span className='text-sm   text-[#6c63ff] px-1 '>
                                            ${currencyFormat(24500)}
                                        </span>
                                    </div>
                                    <div className='flex flex-col  gap-1'>
                                        <span className='opacity-70 text-xs'>Total a dar</span>
                                        <span className='text-sm  text-[#10101c] px-1 '>
                                            ${currencyFormat(39820)}
                                        </span>
                                    </div>
                                </div>
                            </section>
                        </header>
                    </section>
                    <section id='chart'>
                        <div className=''>
                            <Chart options={options} series={series} type='bar' height={350} />
                        </div>
                    </section>
                </section>
            </div>
        </div>
    )
}

export default PersonChart
