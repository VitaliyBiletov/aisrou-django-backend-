$('#myTab a').on('click', function (e) {
  e.preventDefault()
  $(this).tab('show')
})

$('.nav .nav-item:first-child>a').addClass('active')

$('#save-diag').on('click',function (e) {
    e.preventDefault()
    const form = $('#diagnostic-form').serialize()
    $.ajax({
        method: 'POST',
        url: '/diagnostics/',
        data: $('#diagnostic-form').serialize(),
        success: function (data) {
            $('#save-diag').removeClass('btn-danger')
            $('#save-diag').addClass('btn-success')
            console.log(data)
        }
    })
})

$('#diagnostic-form').on('input',function (e) {
    $('#save-diag').removeClass('btn-success')
    $('#save-diag').addClass('btn-danger')
})