$(document).ready(function(){

    const selectPupil = $("select[name*='pupil']")
    const selectUser = $("select[name*='custom_user']")
    const saveButton = $(".save-group button")

    selectPupil.attr('disabled', true)
    saveButton.attr('disabled', true)

    selectUser.change(function(e){
        e.preventDefault()
        console.log('selectUser')
        const teacher_value = $(this).val();
        if (teacher_value){
            selectPupil.attr('disabled', false)
        }else {
            selectPupil.val(null)
            selectPupil.attr('disabled', true)
        }
        $.ajax({
            url: 'view/',
            type: "POST",
            data: $(this).parents('form').serialize(),
            cache: false,
            success: function(data){
                $('.table').empty()
                $('.table').append(data)
            }
        })
    })

    selectPupil.change(function() {
        console.log('selectPupil')
        if (this.value){
            saveButton.attr('disabled', false)
            saveButton.removeClass('disabled')
        } else {
            saveButton.attr('disabled', true)
            saveButton.addClass('disabled')
        };
    })

    saveButton.on('click', function(e){
        console.log('saveButton')
        e.preventDefault()
        $.ajax({
            url: 'attachment/',
            type: "POST",
            data: $(this).parents('form').serialize(),
            cache: false,
            success: function(data){
                $('.table').empty()
                $('.table').append(data)
            }
        })
    })

    selectPupil.select2({
		placeholder: 'Выбрать',
		maximumSelectionLength: 2,
		language: "ru",
        style: {
		    width: 'style'
        }
 	});

    selectUser.select2({
		placeholder: 'Выбрать',
		maximumSelectionLength: 2,
		language: "ru",
        style: {
		    width: 'style'
        }
 	});

})