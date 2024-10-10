import { PeopleDivisionIllustration } from '../../illustrations/Illustrations'

const EmptyDivisionsList = ({ title, subtitle }) => {
    return (
        <div className='flex flex-col justify-center items-center px-10 pb-10 animate-fadeLeft'>
            <PeopleDivisionIllustration width={160} height={180} />
            <div className='flex flex-col items-center gap-2'>
                <h4 className='font-semibold text-center'>{title}</h4>
                <p className='font-light text-center text-sm'>{subtitle}</p>
            </div>
        </div>
    )
}

export default EmptyDivisionsList
