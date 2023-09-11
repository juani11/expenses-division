import { PeopleDivisionIllustration } from '../../illustrations/Illustrations'

const EmptyDivisionsList = ({ title, subtitle }) => {
    return (
        <div className='flex flex-col justify-center items-center p-10'>
            <PeopleDivisionIllustration width={160} height={180} />
            <h4 className='text-center'>{title}</h4>
            <p className='text-center'>{subtitle}</p>
        </div>
    )
}

export default EmptyDivisionsList
