import { Link } from 'wouter'

const NewGroupHeader = () => {
    return (
        <div className='w-full px-10'>
            <h2>Crea un nuevo grupo para dividir los gastos</h2>
            <p>Podés comenzar creando un grupo de gastos sin necesidad de iniciar sesión. </p>
            <p>
                {`O bien, podés `}
                <Link href='/login' className='underline cursor-pointer' aria-label='Ir al login'>
                    iniciar sesión con Google
                </Link>
                {` para mantener/acceder a tu historial de grupos`}
            </p>
            {/* <p>
                Exercitation tempor anim officia cillum minim cupidatat occaecat qui esse cupidatat sunt
                adipisicing.{' '}
            </p> */}
        </div>
    )
}
export default NewGroupHeader
