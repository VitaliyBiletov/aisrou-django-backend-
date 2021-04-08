$(document).ready(function(){
    setTimeout(function () {
        $('#users_alert').fadeOut(300, function () {
            $(this).alert('close')
            $('#messages').remove()
        })
    }, 2000)
})