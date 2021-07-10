
console.log('оК!')
$('#diagnosticTabs a').on('click', function (e) {
  e.preventDefault()
  $(this).tab('show')
})

$('.nav .nav-item:first-child>a').addClass('active')

$('.nav').find("a").on('click', function (e) {
    const target = e.target.getAttribute('data-name')
    try{
       import(`./${target}`)
    }catch (e) {
        console.error(e)
    }

})

//Сохранение диагностики (нажатие кнопки Сохранить) ajax-запрос
$('#save-diag').on('click',function (e) {
    e.preventDefault()
    let scores = []
    const scoresTable = $('.state-table td')
    scoresTable.each(function () {
      const scoreValue = $(this).attr('data-score')
      scoreValue ? scores.push(scoreValue) : scores.push('-')
    })


    const data = $('#diagnostic-form').serializeArray()
    data.push({'name': 'phonemicPerception', 'value': scores.join('')})

    $.ajax({
        method: 'POST',
        url: '/diagnostics/',
        data: data,
        success: function (data)   {
            $('#save-diag').removeClass('btn-danger')
            $('#save-diag').addClass('btn-success')
        }
    })
})

$('#diagnostic-form').on('input',function (e) {
    $('#save-diag').removeClass('btn-success')
    $('#save-diag').addClass('btn-danger')
})