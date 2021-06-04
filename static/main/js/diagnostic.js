(function () {
    $('.btn').attr('disabled', true)
    $('#date_of_creation').attr('disabled', true)
    $("#list_pupils").on('change', function (e) {
        if ($("#list_pupils").val() == 'default') {
            $('.btn').attr('disabled', true)
            $('#date_of_creation').attr('disabled', true)
            $('#date_of_creation').removeClass('is-invalid')
            $('.invalid-feedback').remove()
        } else {
            $('.btn').attr('disabled', false)
            $('#date_of_creation').attr('disabled', false)
        }
    })
    $('#date_of_creation').on('change', function (e) {
        if (e.target.value) {
            $('#date_of_creation').removeClass('is-invalid')
            $('.invalid-feedback').remove()
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
        $.ajax({
            url: '{% url 'main: list_diagnostics' %}',
            method: 'GET',
            data: {'pupil_id': $('#list_pupils').val()},
            success: function (data) {
                let count = 1
                $('#form-list-diagnostics').remove()
                const col = $('#main-form').parent('div')
                const form = $('<form id="form-list-diagnostics" class="mt-3"></form>')
                const list = $('<select size="10" id="list-diagnostics" class="form-control"></select>')
                for (let diag in data['diagnostic_dates']) {
                    $("<option />", {
                        value: diag,
                        text: `Обследование ${count} (${data['diagnostic_dates'][diag]})`
                    }).appendTo(list)
                    count++
                }
                form.append(list)
                col.append(form)
            }
        })
    })
})()