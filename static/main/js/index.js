
    $('.btn').attr('disabled', true)

    $('#date_of_creation').attr('disabled', true)

    $("#list_pupils").on('change', function (e) {
        if ($("#list_pupils").val() == 'default') {
            $('.btn').attr('disabled', true)
            $('#date_of_creation').attr('disabled', true)
            isInvalidDate()
        } else {
            $('.btn').attr('disabled', false)
            $('#date_of_creation').attr('disabled', false)
        }
        isInvalidDate()
        $('#form-list-diagnostics').remove()
        $('#empty-msg').remove()
    })

    $('#date_of_creation').on('change', function (e) {
        if (e.target.value) {
            isInvalidDate()
        }
    })

    $('#create-diag').on('click', function (e) {
        if (!$('#date_of_creation').val()) {
            e.preventDefault()
            $('.invalid-feedback').remove()
            $('#date_of_creation').addClass('is-invalid')
            $('#date_of_creation').parent('div').append('<div class="invalid-feedback">Для создания выбериту дату обследования!</div>')
        }
    })

    $('#open-list-diag').on('click', function (e) {
        e.preventDefault()
        isInvalidDate()
        $.ajax({
            url: '/diagnostic/list/',
            method: 'GET',
            data: {'pupil_id': $('#list_pupils').val()},
            success: function (data) {
                let count = 0
                $('#form-list-diagnostics').remove()
                $('#empty-msg').remove()
                const col = $('#main-form').parent('div')
                const form = $('<form id="form-list-diagnostics" class="mt-3"></form>')
                const list = $('<select id="list-diagnostics" class="form-control"></select>')
                for (let diag in data['diagnostic_dates']) {
                    count++
                    $("<option />", {
                        value: diag,
                        text: `${count}. Обследование (${data['diagnostic_dates'][diag]})`
                    }).appendTo(list)

                }
                if ((count) == 0){
                    col.append('<p id="empty-msg" class="mt-3 text-danger">Список пуст. Вы не создали ни одного обследования!</p>')
                    return
                }
                list.attr('size',count)
                form.append(list)
                const buttonsRow = $('<div class="row mt-3"></div>')
                const toChangeCol = $('<div class="col"></div>')
                const toDeleteCol = $('<div class="col"></div>')
                const toChange = $('<button id="edit_diagnostic" class="btn btn-primary">Изменить</button>')
                const toDelete = $('<button id="delete_diagnostic" class="btn btn-danger">Удалить</button>')
                toChangeCol.append(toChange)
                toDeleteCol.append(toDelete)
                buttonsRow.append(toChangeCol)
                buttonsRow.append(toDeleteCol)
                form.append(buttonsRow)
                col.append(form)
                //Удалить диагностику
                $("#delete_diagnostic").on('click', function (e) {
                    e.preventDefault()
                    const id_diagnostic = $('#list-diagnostics').val()
                    console.log()
                    $.ajax({
                        url: '/diagnostic/delete/',
                        method: 'GET',
                        data: {
                            'diagnostic_id': $('#list-diagnostics').val(),
                            'pupil_id': $('#list_pupils').val()
                        },
                        success: function (data) {
                            console.log(data)
                            if (data['status'] == 'ok'){
                                list.empty()
                                count = 0
                                for (let diag in data['diagnostic_dates']) {
                                    count++
                                    $("<option />", {
                                        value: diag,
                                        text: `${count}. Обследование (${data['diagnostic_dates'][diag]})`
                                    }).appendTo(list)
                                }

                                if (count == 0) {
                                    $('#delete_diagnostic').attr('disabled', true)
                                    $('#edit_diagnostic').attr('disabled', true)
                                    return
                                }

                                list.attr('size',count)
                                }
                            }

                    })
                })
            }
        })
    })



    function isInvalidDate() {
        $('#date_of_creation').removeClass('is-invalid')
        $('.invalid-feedback').remove()
    }