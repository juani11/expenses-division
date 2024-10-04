import Button from './Button'

const IconButton = ({ icon: Icon, ...rest }) => {
    return (
        <Button size='icon' {...rest}>
            <Icon className={'w-4 h-4'} />
        </Button>
    )
}

export default IconButton
