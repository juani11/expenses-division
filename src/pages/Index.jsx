import { useLocation } from 'wouter'
import Button from '../components/common/Button'
import { PeopleFunIllustration } from '../components/illustrations/Illustrations'

function Index() {
    const [, setLocation] = useLocation()

    return (
        <div className='h-screen '>
            <div className='flex flex-col justify-center items-center gap-10 h-full text-center w-[90%] mx-auto'>
                <PeopleFunIllustration width={300} height={250} />
                <div className='realtive text-3xl md:text-4xl dark:text-white '>
                    Organizá y dividí los gastos de la juntada
                </div>
                <div>
                    <p>Creá un grupo, añadí gastos </p>
                    <p> y calculá la división que le corresponde a cada participante</p>
                </div>
                <div>
                    <Button onClick={() => setLocation('/newGroup')}>Crear grupo de gastos </Button>
                </div>
            </div>
        </div>
    )
}

export default Index
