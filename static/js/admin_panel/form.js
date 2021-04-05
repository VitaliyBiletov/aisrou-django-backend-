$(document).ready(function (e) {
    $('.btn-send').on('click', function (e) {
        e.preventDefault()
        const fields = $('.user-form').serializeArray()
        for (let field of fields){
            //console.log(field)
            if (field.value.trim() == '' || field['password'] !== field['password2']){
                //console.log('Есть пустые')
                return;
            }
        }
        const action = $('.user-form').attr('action')
        const method = $('.user-form').attr('method')
        //console.log($('.user-form').serializeArray())
        $.ajax(
            {
                data: $(this).parent('form').serialize(),
                type: method,
                url: action,
                success: function (response) {
                    console.log('response ',response)
                    const formErrs = Object.assign(response.user_form_errors, response.profile_form_errors);
                    console.log($.isEmptyObject(formErrs))
                    // if (formErrs.length != 0){
                    //     const errKeys = Object.keys(formErrs)
                    //     $('input').removeClass('invalid-input')
                    //     $('.invalid-feedback').remove()
                    //     for(let err in errKeys){
                    //         const formFieldErr = $(`[name=${errKeys[err]}]`)
                    //         formFieldErr
                    //             .addClass('invalid-input')
                    //             .after(`<div class="invalid-feedback">${formErrs[errKeys[err]]}</div>`)
                    //         $('.invalid-feedback').fadeIn()
                    //     }
                    // } else {
                    //     $.get('/admin_panel/users/')
                    // }
                },
            }
        )
    })
})