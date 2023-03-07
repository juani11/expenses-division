import Button from '../components/common/Button'
import Input from '../components/Input'
import PeopleSVG from './../components/svg/PeopleSVG'

const NewGroup = () => {
    return (
        <div className='flex justify-center items-center'>
            <div className='flex flex-col gap-10 font-primary mt-20 items-center'>
                <div className='w-1/2 '>
                    <h2>Crea un nuevo grupo para dividir los gastos</h2>
                    <p>
                        Exercitation tempor anim officia cillum minim cupidatat
                        occaecat qui esse cupidatat sunt adipisicing.{' '}
                    </p>
                </div>
                <div className='w-1/2'>
                    <Input name='Nombre del grupo' />
                </div>
                <div className='w-1/2'>
                    <Input name='Tu Nombre' />
                </div>
                <div className='w-1/2'>
                    <Button>crear grupo de gastos</Button>
                </div>
            </div>
            <div>
                <PeopleSVG width={538} height={338} />
            </div>
        </div>
    )
}

export default NewGroup
