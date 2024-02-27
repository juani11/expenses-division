export class InvalidGroupError extends Error {
    constructor(message) {
        super(message)
        this.name = 'InvalidGroupError'
    }
}
