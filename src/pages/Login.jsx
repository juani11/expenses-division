import Button from '../components/common/Button'
import { WorkManIlustration } from '../components/illustrations/Illustrations'
import useAuth from '../hooks/useAuth'
import Input from './../components/Input'

const Login = () => {
    const { signInWithGoogle } = useAuth()

    return (
        <div className='md:max-w-screen-md lg:max-w-screen-lg md:mx-auto mx-10 grid grid-cols-1 md:grid-cols-[390px_1fr] content-center items-center gap-20  dark:bg-gray-900  md:pt-0 pt-20 md:h-screen py-10'>
            <section id='loginForm' className='flex flex-col gap-16 order-2 md:order-1'>
                <header>
                    <h2>Bienvenido! </h2>
                    <p>Por favor, iniciá sesión con tu cuenta</p>
                </header>

                <div className='flex flex-col gap-6 mb-10 md:mb-0 '>
                    <div className='w-full'>
                        <Input
                            label='Dirección de email'
                            controlledProps={
                                {
                                    // ...registerField('groupName', groupNameRules)
                                }
                            }
                            // error={errorsFields.groupName}
                        />
                    </div>
                    <div className='w-full'>
                        <Input
                            label='Contraseña'
                            controlledProps={
                                {
                                    // ...registerField('owner', ownerRules)
                                }
                            }
                            // error={errorsFields.owner}
                        />
                    </div>
                    <Button>Iniciar sesión</Button>
                </div>
                {/* <span className='text-center'>O</span> */}
                <button
                    className='px-4 py-2 border flex items-center justify-center gap-2  dark:border-slate-700 rounded text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow '
                    onClick={signInWithGoogle}
                >
                    <img
                        className='w-5 h-5'
                        src='https://www.svgrepo.com/show/475656/google-color.svg'
                        loading='lazy'
                        alt='google logo'
                    />
                    <span>Iniciar sesión con Google</span>
                </button>
            </section>
            <section
                id='ilustration'
                className='md:block w-[430px] h-[230px] md:w-[530px]  md:h-[330px] order-1 md:order-2'
            >
                <WorkManIlustration width='full' height='full' />
            </section>
        </div>
    )
}

export default Login
