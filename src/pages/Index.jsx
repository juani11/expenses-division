import { useLocation } from 'wouter'
import Button from '../components/common/Button'
import PeopleFunSVG from './../components/svg/PeopleFunSVG'

function Index() {
    const [, setLocation] = useLocation()

    return (
        <div className='App h-screen w-screen font-primary'>
            <div className='flex flex-col justify-center items-center gap-10 h-full text-center'>
                <PeopleFunSVG width={300} height={250} />
                <div className='text-4xl '> Organizá y Dividí los gastos De la juntada</div>
                <div>
                    <p>Creá un grupo, añadí gastos</p>
                    <p> y calculá la división que le corresponde a cada participante</p>
                </div>
                <div className=''>
                    <Button onClick={() => setLocation('/newGroup')}>Crear grupo de gastos </Button>
                </div>
            </div>
        </div>
    )
}

export default Index
