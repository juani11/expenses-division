import useSmoothTranslateX from '../../hooks/useSmoothTranslateX'
import { ArrowLefttIcon, ArrowRightIcon } from '../icons/icons'
import Button from './Button'

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
                color='secondary'
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
                color='secondary'
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
    const chipVariant = chipVariantStyles[variant][color]
    const chipVariantSelected = chipVariantStyles[variant][`${color}_selected`]

    const { doneTranslateX, showPrevButton, showNextButton, handlePrev, handleNext } = useSmoothTranslateX(id)

    return (
        <div
            className={`relative flex items-center overflow-hidden h-full ${className} `}
            id={`translateXContainer${id}`}
        >
            <section
                className={`flex justify-start items-start gap-2 transition-transform `}
                id={`translateXContent${id}`}
                style={{ transform: `translateX(-${doneTranslateX}px)` }}
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
