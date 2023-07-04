const fillColors = {
    default: 'fill-white',
    black: 'fill-black dark:fill-gray-200'
}

const CloseSVG = ({ color = 'default', width = 25, height = 25 }) => {
    const fillClassNames = fillColors[color]
    return (
        <svg
            part='svg'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            aria-labelledby='ic-close'
            focusable='false'
            viewBox='0 0 24 24'
            width={width}
            height={height}
            className={`h-icon icon-gray icon-static-view-box h-icon--no-custom-width referral-banner__close-icon cursor-pointer ${fillClassNames}`}
            // dataV21f970be=''
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

export default CloseSVG
