import Button from '../components/common/Button'
import { NotFoundIllustration } from './../components/illustrations/Illustrations'
import { useLocation } from 'wouter'

const NotFound = () => {
    const [, setLocation] = useLocation()

    return (
        <div className='h-screen flex flex-col justify-center items-center gap-10 text-center'>
            <NotFoundIllustration width={300} height={250} />
            <h2>Pagina no encontrada :(</h2>
            <div>
                <p>La página que intentas buscar es incorrecta o no existe</p>
                <p> </p>
            </div>
            <div>
                <Button onClick={() => setLocation('/')}>Volver al Inicio </Button>
            </div>
        </div>
    )
}

export default NotFound
