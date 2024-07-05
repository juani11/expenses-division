import { Link } from 'wouter'
import useAuth from '../../hooks/useAuth'

const NewGroupHeader = () => {
    const { session } = useAuth()

    return (
        <div className='w-full px-10'>
            <h2>Crea un nuevo grupo para dividir los gastos</h2>
            {!session ? (
                <>
                    <p>Podés comenzar creando un grupo de gastos sin necesidad de iniciar sesión. </p>
                    <p>
                        {`O bien, podés `}
                        <Link href='/login' className='underline cursor-pointer' aria-label='Ir al login'>
                            iniciar sesión con Google
                        </Link>
                        {` para mantener/acceder a tu historial de grupos`}
                    </p>
                </>
            ) : (
                <>
                    <p className='md:w-[670px] '>
                        El grupo será vinculado a tu usuario{' '}
                        <span>
                            <strong>{session.email} </strong>
                        </span>
                        para que luego puedas accederlo desde tu perfil
                    </p>
                    {/* <p> para que luego puedas accederlo desde tu perfil.</p> */}
                </>
            )}
        </div>
    )
}
export default NewGroupHeader
