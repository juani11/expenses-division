import { useLocation } from 'wouter'
import Button from '../components/common/Button'
import Loading from '../components/common/Loading'
import { PeopleFunIllustration } from '../components/illustrations/Illustrations'
import useAuth from '../hooks/useAuth'

function Index() {
    const [, setLocation] = useLocation()
    const { session, loadingSession } = useAuth()

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
                <div className='flex flex-col md:flex-row gap-4'>
                    {loadingSession ? (
                        <Loading loadingText='Recuparando sesión de usuario...' inline />
                    ) : session ? (
                        <>
                            <div className='flex flex-col'>
                                <h4 className=''>Bienvenido {session.name} 👋</h4>
                                <div className='flex gap-4'>
                                    <Button onClick={() => setLocation('/newGroup')}>
                                        Crear grupo de gastos{' '}
                                    </Button>
                                    <Button color='primary' onClick={() => setLocation('/profile')}>
                                        ir a mi perfil
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => setLocation('/newGroup')}>Crear grupo de gastos </Button>
                            <Button color='primary' onClick={() => setLocation('/login')}>
                                Iniciar sesión
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Index
