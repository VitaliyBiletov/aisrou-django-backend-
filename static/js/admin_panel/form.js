$(document).ready(function (e) {
    $('.btn-send').on('click', function (e) {
        e.preventDefault()
        const fields = $('.user-form').serializeArray()
        for (let {value} of fields){
            if (value.trim() == ''){
                console.log('Есть пустые')
                return;
            }
        }
        const action = $('.user-form').attr('action')
        const method = $('.user-form').attr('method')
        console.log(action)
        console.log($('.user-form').serializeArray())
        $.ajax(
            {
                data: $(this).parent('form').serialize(),
                type: method,
                url: action,
                success: function (response, textStatus) {
                    const formErrs = Object.assign(response.user_form, response.profile_form);
                    const errKeys = Object.keys(formErrs)
                    $('input').removeClass('invalid-input')
                    $('.invalid-feedback').remove()
                    for(let err in errKeys){
                        const formFieldErr = $(`[name=${errKeys[err]}]`)
                        formFieldErr
                            .addClass('invalid-input')
                            .after(`<div class="invalid-feedback">${formErrs[errKeys[err]]}</div>`)
                        $('.invalid-feedback').fadeIn()
                    }
                },
            }
        )
    })
})