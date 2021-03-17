$(document).ready(function(){

    $('#id_pupil').attr('disabled', true)

    $( "#tabs" ).tabs();

    $('#tabs .nav-link').on('click', function (e) {
        e.preventDefault()
        $('#tabs .nav-link').removeClass('active')
        $(this).addClass('active')
    })

    $('#id_profile').change(function(e){
        e.preventDefault()
        $.ajax({
            url: 'view/',
            type: "POST",
            data: $(this).parents('form').serialize(),
            cache: false,
            success: function(data){
                $('#table').empty()
                $('#table').append(data)
            }
        })
        const teacher_value = $(this).val();
        console.log(teacher_value)
        if (teacher_value){
            $('#id_pupil').attr('disabled', false)
        }else {
            $('#id_pupil').attr('disabled', true)
        }
    })

    $('#group_view_form').submit(function(e){
        e.preventDefault()
        $.ajax({
            url: 'attachment/',
            type: "POST",
            data: $(this).serialize(),
            cache: false,
            success: function(data, textStatus){
                $('#table').empty()
                $('#table').append(data)
                $('#id_pupil').val(null).trigger('change')
                if (textStatus == "success"){
                    $('#group_message').addClass('text-success').fadeIn(1000).text('Ученик успешно прикреплен!')
                    $('#group_message').fadeOut(1000)
                }
            }
        })
    })

    $('#id_pupil').change(function() {
        if (this.value){
            $("#button_attachment").attr('disabled', false)
            $("#button_attachment").removeClass('disabled')
        } else {
            $("#button_attachment").attr('disabled', true)
            $("#button_attachment").addClass('disabled')
        };
    })

    $('.js-select2').select2({
		placeholder: 'Выбрать',
		maximumSelectionLength: 2,
		language: "ru",
        style: {
		    width: 'resolve'
        }
 	});
})
