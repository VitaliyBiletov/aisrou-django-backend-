import Noty from 'noty'

export function generatedNoty(type, text) {
    return new Noty({
            layout:'topCenter',
            theme:'bootstrap-v3',
            type: type,
            text: text,
            progressBar: false,
            animation:{
                open: 'animate__animated animate__fadeInDown',
                close: 'animate__animated animate__fadeOutUp'
            },
            timeout: 1000,
        })
}