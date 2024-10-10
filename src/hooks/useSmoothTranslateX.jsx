import { useRef, useState, useEffect } from 'react'

const TRANSLATE_X_DISTANCE = 70

const calculateInitialTranslateX = id => {
    const nodeList = document.getElementById(`translateXContent${id}`)?.childNodes || []
    const childNodesArray = Array.from(nodeList)
    const selectedChipElementIndex = childNodesArray.findIndex(child =>
        child.classList.contains('selectedChip')
    )
    const initialTranslateX = (selectedChipElementIndex - 3) * TRANSLATE_X_DISTANCE
    return initialTranslateX
}
const calculateWidths = id => {
    const containerWidth = document.getElementById(`translateXContainer${id}`).offsetWidth
    const contentWidth = document.getElementById(`translateXContent${id}`).offsetWidth
    const diffWidth = contentWidth - containerWidth
    return { containerWidth, contentWidth, diffWidth }
}

const useSmoothTranslateX = id => {
    const [doneTranslateX, setDoneTranslateX] = useState(() => calculateInitialTranslateX(id))
    const availableTranslateX = useRef(0)

    const [withPrevNextButtons, setWithPrevNextButtons] = useState(false)

    useEffect(() => {
        const { containerWidth, contentWidth, diffWidth } = calculateWidths(id)
        availableTranslateX.current = diffWidth
        const withPrevNextButtons = contentWidth > containerWidth
        setWithPrevNextButtons(withPrevNextButtons)

        if (withPrevNextButtons) {
            // Si por defecto tiene que estar seleccionado un chip que no está visible(ya que el translatex inicial es 0), se ajusta la distancia de translateX inicial para que el chip seleccionado esté visible de entrada
            const initialTranslateX = calculateInitialTranslateX(id)

            setDoneTranslateX(initialTranslateX)
        }
    }, [])

    const handleNext = () => {
        // Si translatexHecho (distancia de translate hecha hasta el momento)  NO SUPERA a translatexDisponible ( distancia de translate disponible total)  mostrar el boton Next
        // Sumar translatexDistance a translatexHecho

        // Chequear antes de sumar , si la suma desbordaria el translatexDisponible. Si la desbordaria , en vez de sumar translatexDistance, devolver translatexDisponible .
        setDoneTranslateX(prevState => {
            const nextState = prevState + TRANSLATE_X_DISTANCE

            console.log('nextState', nextState)
            // Si la suma desborda el translatexDisponible, se pone como estado el mismo valor de translatexDisponible
            if (nextState > availableTranslateX.current) {
                console.log(
                    'la suma desbordaria el translatexDisponible. En vez de sumar se asigna translatexDisponible '
                )
                return availableTranslateX.current + 1
            }
            return nextState
        })
    }

    const handlePrev = () => {
        // Chequear antes de restar si es que la resta desbordaria en negativo el translatexDisponible. Si la desbordaria , en vez de restar translatexDistance, devolver 0

        setDoneTranslateX(prevState => {
            const nextState = prevState - TRANSLATE_X_DISTANCE

            console.log('nextState', nextState)
            // Si la suma desborda en negativo el translatexDisponible, se pone como estado 0
            if (nextState < 0) {
                console.log(
                    'la resta  desbordaria en negativ oel translatexDisponible. En vez de restar, se asigna 0 '
                )
                return 0
            }
            return nextState
        })
    }

    const showPrevButton = withPrevNextButtons && doneTranslateX !== 0
    const showNextButton = withPrevNextButtons && doneTranslateX <= availableTranslateX.current

    return {
        doneTranslateX,
        handlePrev,
        handleNext,
        showPrevButton,
        showNextButton
    }
}
export default useSmoothTranslateX
