$(document).ready(function (e) {
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
                success: function (response, textStatus) {
                    const form_errs = Object.assign(response.user_form, response.profile_form);
                    const err_keys = Object.keys(form_errs)
                    for(err in err_keys){
                        console.log($(`[name=${err_keys[err]}]`))
                        $(`[name=${err_keys[err]}]`).css('border-color','red')
                    }
                    console.log(err_keys)
                },
            }
        )
    })
})