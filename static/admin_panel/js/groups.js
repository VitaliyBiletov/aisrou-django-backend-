$(document).ready(function(){

    const selectPupil = $("select[name*='pupil']")
    const selectUser = $("select[name*='custom_user']")
    const saveButton = $(".save-group button")

    selectPupil.attr('disabled', true)
    saveButton.attr('disabled', true)

    selectUser.change(function(e){
        e.preventDefault()
        console.log('change')
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
                const group_tbody = $('.tbody_group')
                group_tbody.empty()
                for (let item of data) {
                    const groups_values = Object.values(item)
                    let tr = $("<tr>")
                    group_tbody.append(tr)
                    for (let value of groups_values) {
                        tr.append(`<td>${value}</td>`)
                    }
                    tr.append(`<td><a class='text-danger unpin' href='unpin/${item.id}/'><img alt='Удалить' width='15' src='https://img.icons8.com/cotton/64/000000/delete.png'/></a></td>`)
                }
                delete_record()
            }
        })
    })

    selectPupil.change(function() {
        if (this.value){
            saveButton.attr('disabled', false)
            saveButton.removeClass('disabled')
        } else {
            saveButton.attr('disabled', true)
            saveButton.addClass('disabled')
        }
    })

    saveButton.on('click', function(e){
        e.preventDefault()
        $.ajax({
            url: 'attachment/',
            type: "POST",
            data: $(this).parents('form').serialize(),
            // cache: false,
            success: function(data){
                const group_tbody = $('.tbody_group')
                group_tbody.empty()
                for (let item of data) {
                    const groups_values = Object.values(item)
                    let tr = $("<tr>")
                    group_tbody.append(tr)
                    for (let value of groups_values) {
                        tr.append(`<td>${value}</td>`)
                    }
                    tr.append(`<td><a class='text-danger unpin' href='unpin/${item.id}/'><img alt='Удалить' width='15' src='https://img.icons8.com/cotton/64/000000/delete.png'/></a></td>`)
                }
                delete_record()
            }
        })
    })

    function delete_record(){
        $('.unpin').on('click', function (e) {
            e.preventDefault()
                $.ajax({
                    url: $(this).attr('href'),
                    type: "GET",
                    success: function(data, textStatus) {
                        if (textStatus === "success"){
                            $(e.target).parents('tr').remove()
                        }
                    },
                })
            }
        )
    }

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