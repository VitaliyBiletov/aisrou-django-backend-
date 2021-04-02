$(document).ready(function () {
    $('.btn-send').on('click', function (e) {
        e.preventDefault()
        const action = $('.user-form').attr('action')
        const method = $('.user-form').attr('method')
        console.log(action)
        console.log(method)
        $.ajax(
            {
                data: $(this).parent('form').serialize(),
                type: method,
                url: action,
                success: function (response) {
                    console.log(response.profile_form),
                    console.log(response.user_form)
                },
            }
        )
    })
})