const fillColors = {
    default: 'fill-white',
    black: 'fill-black dark:fill-gray-200'
}

export const ArrowLefttIcon = ({ className }) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className={className}>
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M5 12l14 0' />
            <path d='M5 12l4 4' />
            <path d='M5 12l4 -4' />
        </svg>
    )
}

export const ArrowRightIcon = ({ className }) => {
    return <ArrowLefttIcon className={`${className} rotate-180`} />
}

export const UserAddIcon = ({ className }) => {
    return <ArrowLefttIcon className={`${className} rotate-180`} />
}

export const AvatarIcon = ({ width, height, backgroundColor }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            viewBox='0 0 532 532'
            className={`rounded-full ${backgroundColor}`}
        >
            <circle cx='270.75986' cy='260.93427' r='86.34897' fill='#ffb6b6' />
            <polygon
                points='221.18982 360.05209 217.28876 320.6185 295.18982 306.05209 341.18982 418.05209 261.18982 510.05209 204.18982 398.05209 221.18982 360.05209'
                fill='#ffb6b6'
            />
            <path
                d='m216.0374,340.35736l17.03111,3.84802s-13.38821-42.45453-8.84396-46.50766c4.54427-4.05316,15.68007,2.33328,15.68007,2.33328l11.70201,13.1199,14.25394-14.51239s15.47495-19.2421,21.53397-24.6463-3.67319-25.46364-3.67319-25.46364c0,0,89.89185-24.23923,56.44299-67.83968,0,0-19.61093-34.18452-25.99734-23.04871-6.38641,11.1358-14.00162-6.55013-14.00162-6.55013l-23.25381,4.42198s-45.89429-27.06042-89.45331,30.82959c-43.55902,57.89003,28.57916,154.01572,28.57916,154.01572h-.00002Z'
                fill='#2f2e41'
            />
            <path
                d='m433.16003,472.95001c-47.19,38.26001-105.57001,59.04999-167.16003,59.04999-56.23999,0-109.81-17.33997-154.62-49.47998.08002-.84003.16003-1.66998.23004-2.5,1.19-13,2.25-25.64001,2.94995-36.12,2.71002-40.69,97.64001-67.81,97.64001-67.81,0,0,.42999.42999,1.29004,1.17999,5.23999,4.59998,26.50995,21.27997,63.81,25.94,33.25995,4.15997,44.20996-15.57001,47.51996-25.02002,1-2.88,1.30005-4.81,1.30005-4.81l97.63995,46.10999c6.37,9.10004,8.86005,28.70001,9.35004,50.73004.01996.90997.03998,1.81.04999,2.72998Z'
                className='text-primary-500'
            />
        </svg>
    )
}

export const CashIcon = ({ className = 'w-5 h-5 ' }) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className={className}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z'
            />
        </svg>
    )
}

export const CheckIcon = ({ className = 'w-5 h-5' }) => {
    return (
        <svg viewBox='0 0 24 24' fill='currentColor' className={className}>
            <path
                fillRule='evenodd'
                d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
                clipRule='evenodd'
            />
        </svg>
    )
}

export const ChevronDownIcon = ({ className }) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className={className}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
        </svg>
    )
}

export const ChevronLeftIcon = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'
        >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
        </svg>
    )
}

export const ChevronRightIcon = ({ className }) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
        </svg>
    )
}

export const CloseIcon = ({ color = 'default', className }) => {
    return (
        <svg
            aria-hidden='true'
            aria-labelledby='ic-close'
            focusable='false'
            viewBox='0 0 24 24'
            className={`${className}`}
        >
            <g>
                <path
                    // fill={color}
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z'
                ></path>
            </g>
        </svg>
    )
}

export const CreditCardIcon = ({ className = 'w-5 h-5' }) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className={className}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z'
            />
        </svg>
    )
}

export const LoadingIcon = () => {
    return (
        <svg
            className='w-5 h-5 mr-3 -ml-1 text-white animate-spin'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
        >
            <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
            ></circle>
            <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
        </svg>
    )
}

export const MenuIcon = ({ className }) => {
    return (
        <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={`${className} rotate-180`}
        >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
            <path d='M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
            <path d='M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
        </svg>
    )
}

export const MenuHorizontalIcon = ({ className }) => {
    return (
        <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={`${className} rotate-180`}
        >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
            <path d='M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
            <path d='M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
        </svg>
    )
}

export const TransferIcon = ({ className }) => {
    return (
        <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={`${className} `}
        >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M20 10h-16l5.5 -6' />
            <path d='M4 14h16l-5.5 6' />
        </svg>
    )
}

export const MoonIcon = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5 text-secondary fill-secondary'
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
            />
        </svg>
    )
}

export const SunIcon = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5 fill-yellow-200 text-yellow-200'
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
            />
        </svg>
    )
}

export const SorterArrowsIcon = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4 '
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5'
            />
        </svg>
    )
}

export const TooltipTriangleIcon = ({ className }) => {
    return (
        <svg className={` ${className}`} width='9px' height='16px' viewBox='0 0 9 16' version='1.1'>
            <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                <g id='Tooltips-' transform='translate(-874.000000, -1029.000000)' fill='#FFFFFF'>
                    <g id='Group-3-Copy-16' transform='translate(850.000000, 975.000000)'>
                        <g id='Group-2' transform='translate(24.000000, 0.000000)'>
                            <polygon
                                id='Triangle'
                                transform='translate(4.500000, 62.000000) rotate(-90.000000) translate(-4.500000, -62.000000) '
                                points='4.5 57.5 12.5 66.5 -3.5 66.5'
                            ></polygon>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
}

export const UserIcon = ({ className }) => {
    return (
        <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={className}
        >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' />
            <path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' />
        </svg>
    )
    // return (
    //     <svg
    //         xmlns='http://www.w3.org/2000/svg'
    //         viewBox='0 0 24 24'
    //         fill='currentColor'
    //         className={`w-5 h-5 ${fillColor}`}
    //     >
    //         <path
    //             fillRule='evenodd'
    //             d='M18.685 19.096A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
    //             clipRule='evenodd'
    //         />
    //     </svg>
    // )
}

export const ErrorIcon = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
            />
        </svg>
    )
}

export const ArrowDownIcon = ({ width, height }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className={`${width} ${height}`}
        >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3' />
        </svg>
    )
}

export const ArrowUpIcon = ({ width, height }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className={`${width} ${height}`}
        >
            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18' />
        </svg>
    )
}

export const InfoIcon = ({ width, height }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={`${width} ${height}`}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z'
            />
        </svg>
    )
}

export const LinkIcon = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-4 h-4'
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244'
            />
        </svg>
    )
}

export const CoppyToClipboardIcon = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-4 h-4'
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75'
            />
        </svg>
    )
}

export const CopiedToClipboardIcon = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-4 h-4'
        >
            <path strokeLinecap='round' strokeLinejoin='round' d='m4.5 12.75 6 6 9-13.5' />
        </svg>
    )
}

export const AtIcon = ({ className }) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className={className}>
            <path
                strokeLinecap='round'
                d='M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25'
            />
        </svg>
    )
}

export const LogoutIcon = ({ width, height = 14 }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            style={{ width, height }}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
            />
        </svg>
    )
}

export const GroupsIcon = ({ width, height = 14 }) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-4 h-4'>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z'
            />
        </svg>
    )
}

export const UserMinusIcon = ({ className }) => {
    return (
        <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth={1.5}
            strokeLinecap='round'
            strokeLinejoin='round'
            className={className}
        >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' />
            <path d='M6 21v-2a4 4 0 0 1 4 -4h4c.348 0 .686 .045 1.009 .128' />
            <path d='M16 19h6' />
        </svg>
    )
}

export const UserPlusIcon = ({ className }) => {
    return (
        <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth={1.5}
            strokeLinecap='round'
            strokeLinejoin='round'
            className={className}
        >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' />
            <path d='M16 19h6' />
            <path d='M19 16v6' />
            <path d='M6 21v-2a4 4 0 0 1 4 -4h4' />
        </svg>
    )
}

export const TrashIcon = ({ className }) => {
    return (
        <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth={1.5}
            strokeLinecap='round'
            strokeLinejoin='round'
            className={className}
        >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M4 7l16 0' />
            <path d='M10 11l0 6' />
            <path d='M14 11l0 6' />
            <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
            <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
        </svg>
    )
}

export const EditIcon = ({ className }) => {
    return (
        <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth={1.5}
            strokeLinecap='round'
            strokeLinejoin='round'
            className={className}
        >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1' />
            <path d='M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z' />
            <path d='M16 5l3 3' />
        </svg>
    )
}
