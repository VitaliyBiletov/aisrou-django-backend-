$(document).ready(function(){
    $('#id_pupil').attr('disabled', true)

    $( "#tabs" ).tabs();

    $('#tabs a').on('click', function (e) {
        e.preventDefault()
        $('#tabs a').removeClass('active')
        $(this).addClass('active')
    })

    $('#group_view_form').change(function(e){
        e.preventDefault()
        $.ajax({
            url: $(this).url,
            type: "POST",
            data: $(this).serialize(),
            cache: false,
            success: function(data){
                $('#table').empty()
                $('#table').append(data)
            }
        })
    })

    $('#group_view_form').submit(function(e){
        e.preventDefault()

    })

    $('#id_teacher').change(function(){
        const teacher_value = $(this).val();
        if (teacher_value){
            $('#id_pupil').attr('disabled', false)
        }else {
            $('#id_pupil').attr('disabled', true)
        }
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
})
