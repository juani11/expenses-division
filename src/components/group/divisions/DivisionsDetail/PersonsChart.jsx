import Chart from 'react-apexcharts'
import { formatedAmount } from '../../../../utils/utils'

const currencyFormat = num => (num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : '0')
const seriesInitialState = {
    name: 'Dif ',
    data: []
}

const optionsInitialState = {
    colors: ['#6c63ff'],

    tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        shared: true,
        intersect: false,
        theme: 'dark',
        style: {
            fontFamily: 'Poiret One '
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
        categories: [],
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
                // return formatedAmount(y)
            },
            style: {
                fontFamily: 'Poiret One',
                cssClass: 'dark:fill-gray-400'
            },
            offsetX: -15
        }
    }
}

const PersonChart = ({ expensesNames, expensesDiff }) => {
    const series = [{ ...seriesInitialState, data: expensesDiff }]
    const options = {
        ...optionsInitialState,
        xaxis: { ...optionsInitialState.xaxis, categories: expensesNames }
    }

    return <Chart options={options} series={series} type='bar' height={350} />
}

export default PersonChart
