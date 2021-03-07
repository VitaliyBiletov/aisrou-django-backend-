$(document).ready(function(){
    $( "#tabs" ).tabs();

    $('#tabs a').on('click', function (e) {
        e.preventDefault()
        $('#tabs a').removeClass('active')
        $(this).addClass('active')
    })
})
