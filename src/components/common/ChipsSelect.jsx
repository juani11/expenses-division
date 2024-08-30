import { useEffect, useRef, useState } from 'react'
import { ArrowLefttIcon, ArrowRightIcon } from '../icons/icons'
import Button from './Button'

const translatexDistance = 50

const chipVariantStyles = {
    default: {
        gray: 'bg-gray-100 hover:bg-gray-200  dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600',
        gray_selected: 'bg-black hover:bg-black text-white dark:bg-white dark:text-black',
        primary: 'bg-primary text-white hover:bg-primary-400 ',
        primary_selected: 'bg-primary text-white hover:bg-primary-400 ',
        secondary: 'bg-secondary text-white hover:bg-secondary-400',
        secondary_selected: 'bg-secondary text-white hover:bg-secondary-400'
    },
    light: {
        primary: 'bg-primary-50 text-primary hover:bg-primary-100 ',
        primary_selected: 'bg-primary-50 text-primary hover:bg-primary-100 ',
        secondary: 'bg-secondary-50 text-secondary hover:bg-secondary-100 ',
        secondary_selected: 'bg-secondary-50 text-secondary hover:bg-secondary-100 '
    },
    outline: {
        primary: 'bg-transparent text-primary border border-primary  hover:text-white hover:bg-primary ',
        primary_selected:
            'bg-transparent text-primary border border-primary  hover:text-white hover:bg-primary ',
        secondary:
            'bg-transparent text-secondary border border-secondary hover:text-white hover:bg-secondary',
        secondary_selected:
            'bg-transparent text-secondary border border-secondary hover:text-white hover:bg-secondary'
    }
}

const PrevButton = ({ handleClick }) => {
    return (
        <div
            className='absolute bg-white dark:bg-black h-full w-20 '
            style={{ maskImage: 'linear-gradient(to right, black 38%, transparent)' }}
        >
            <Button
                size='icon'
                color='primary'
                variant='light'
                className='absolute my-auto top-0 bottom-0'
                onClick={handleClick}
            >
                <ArrowLefttIcon className={'w-4 h-4 '} />
            </Button>
        </div>
    )
}
const NextButton = ({ handleClick }) => {
    return (
        <div
            className='absolute right-0 bg-white dark:bg-black  h-full w-20 '
            style={{ maskImage: 'linear-gradient(to left, black 38%, transparent)' }}
        >
            <Button
                size='icon'
                color='primary'
                variant='light'
                onClick={handleClick}
                className='absolute right-0 my-auto top-0 bottom-0 '
            >
                <ArrowRightIcon className={'w-4 h-4 '} />
            </Button>
        </div>
    )
}

const ChipsSelect = ({
    chipsNames,
    selectedChip,
    handleChangeSelectedChip,
    id,
    className,
    variant = 'default',
    color = 'gray'
}) => {
    const [translatexHecho, setTranslatexHecho] = useState(0)
    const translatexDisponibleRef = useRef(0)

    const [withPrevNextButtons, setWithPrevNextButtons] = useState(false)

    const chipVariant = chipVariantStyles[variant][color]
    const chipVariantSelected = chipVariantStyles[variant][`${color}_selected`]

    useEffect(() => {
        const scrollContainerWidth = document.getElementById(`scrollContainer${id}`).offsetWidth
        const selectorWidth = document.getElementById(`chipsSelector${id}`).offsetWidth
        const diffWidth = selectorWidth - scrollContainerWidth
        translatexDisponibleRef.current = diffWidth

        setWithPrevNextButtons(selectorWidth > scrollContainerWidth)
    }, [])

    const handleNext = () => {
        // Si translatexHecho (distancia de translate hecha hasta el momento)  NO SUPERA a translatexDisponible ( distancia de translate disponible total)  mostrar el boton Next
        // Sumar translatexDistance a translatexHecho

        // Chequear antes de sumar , si la suma desbordaria el translatexDisponible. Si la desbordaria , en vez de sumar translatexDistance, devolver translatexDisponible .
        setTranslatexHecho(prevState => {
            const nextState = prevState + translatexDistance

            console.log('nextState', nextState)
            // Si la suma desborda el translatexDisponible, se pone como estado el mismo valor de translatexDisponible
            if (nextState > translatexDisponibleRef.current) {
                console.log(
                    'la suma desbordaria el translatexDisponible. En vez de sumar se asigna translatexDisponible '
                )
                return translatexDisponibleRef.current + 1
            }
            return nextState
        })
    }

    const handlePrev = () => {
        // Chequear antes de restar si es que la resta desbordaria en negativo el translatexDisponible. Si la desbordaria , en vez de restar translatexDistance, devolver 0

        setTranslatexHecho(prevState => {
            const nextState = prevState - translatexDistance

            console.log('nextState', nextState)
            // Si la suma desborda en negativo el translatexDisponible, se pone como estado 0
            if (nextState < 0) {
                console.log(
                    'la resta  desbordaria en negativ oel translatexDisponible. En vez de restar, se asigna 0 '
                )
                return 0
            }
            return nextState
        })
    }

    const showPrevButton = withPrevNextButtons && translatexHecho !== 0
    const showNextButton = withPrevNextButtons && translatexHecho <= translatexDisponibleRef.current

    return (
        <div className='relative flex items-center overflow-x-hidden h-full' id={`scrollContainer${id}`}>
            <section
                className={`flex justify-start items-start gap-2 transition-transform `}
                id={`chipsSelector${id}`}
                style={{ transform: `translateX(-${translatexHecho}px)` }}
            >
                {chipsNames.map(chip => {
                    return (
                        <span
                            key={chip}
                            className={`px-3 py-1 rounded-md text-xs cursor-pointer capitalize
                            ${
                                chip === selectedChip ? chipVariantSelected : chipVariant
                                //   'bg-gray-100 hover:bg-gray-200 dark:bg-[hsl(240_8%_12%)] border dark:border-[hsl(240_8%_16%)]   dark:text-white dark:hover:bg-slate-600'
                            }
                            
                        }`}
                            onClick={() => handleChangeSelectedChip(chip)}
                        >
                            {chip}
                        </span>
                    )
                })}
            </section>

            {showPrevButton && <PrevButton handleClick={handlePrev} />}

            {showNextButton && <NextButton handleClick={handleNext} />}
        </div>
    )
}

export default ChipsSelect // linear-gradient(to right,transparent 0,transparent 51px,#000 77px,#000 50%,transparent 50%,transparent 100%),linear-gradient(to left,transparent 0,transparent 51px,#000 77px,#000 50%,transparent 50%,transparent 100%) // YOUTUBE maskimage
// `linear-gradient(to right,transparent 0,transparent 51px,#000 77px,#000 50%,transparent 50%,transparent 100%),
// linear-gradient(to left,transparent 0,transparent 51px,#000 77px,#000 50%,transparent 50%,transparent 100%);
// -webkit-mask-repeat: no-repeat;`
