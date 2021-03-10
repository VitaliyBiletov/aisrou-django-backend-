    $(document).ready(function() {
        $('.unpin').on('click', function (e) {
            e.preventDefault()
            console.log($(this).attr('href'))
            $.ajax({
                url: $(this).attr('href'),
                type: "GET",
                data: {'id_teacher': $("#id_teacher").val()},
                success: function (data) {
                    $('#table').empty()
                    $('#table').append(data)
                }
            })
        })
    })