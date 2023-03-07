import './App.css'
import Icon from './components/Icons'

function App() {
    return (
        <div className='App h-screen bg-white'>
            <div className='flex flex-col justify-center items-center gap-10 h-full'>
                <Icon width={300} height={250} />
                <h1 className='text-4xl text-black '>
                    {' '}
                    División de gastos app
                </h1>
                <p className='text-black'>
                    Ullamco elit occaecat aute eiusmod adipisicing aute
                    incididunt.
                </p>

                <button className='uppercase'> Crear grupo de gastos </button>
            </div>
        </div>
    )
}

export default App
