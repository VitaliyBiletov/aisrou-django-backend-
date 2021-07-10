const pairsOfSounds = [
  {
    id: 0,
    view: 'Ба-па | Па-ба',
  },
  {
    id: 1,
    view: 'Са-за | За-са',
  },
  {
    id: 2,
    view: 'Жа-ша | Ша-жа',
  },
  {
    id: 3,
    view: 'Са-ша | Ша-са',
  },
  {
    id: 4,
    view: 'Ла-ра | Ра-ла',
  },
  {
    id: 5,
    view: 'Ма-на-ма | На-ма-на',
  },
  {
    id: 6,
    view: 'Га-ка-га | Ка-га-ка',
  },
  {
    id: 7,
    view: 'За-са-за | Са-за-са',
  },
  {
    id: 8,
    view: 'Жа-ша-жа | Ша-жа-ша',
  },
  {
    id: 9,
    view: 'Са-ша-са | Ша-са-ша',
  },
  {
    id: 10,
    view: 'Ца-са-ца | Са-ца-са',
  },
  {
    id: 11,
    view: 'Ча-тя-ча | Тя-ча-тя',
  },
  {
    id: 12,
    view: 'Ра-ла-ра | Ла-ра-ла',
  },
]

const colors = {
    0: {name: 'red', code:'#ff4040'},
    1: {name: 'yellow', code:'#f9ff50'},
    2: {name: 'blue', code:'#2099ff'},
    3: {name: 'green', code:'#5eaf5e'},
}

const hints = {
  0: "Отказ от выполнения, полная невозможность воспроизведения пробы",
  1: 'Неточное воспроизведение обоих членов пары с перестановкой слогов, их заменой и пропусками;',
  2: 'Первый член воспроизводится правильно, второй уподобляется первому (ба-па-ба-па)',
  3: 'Точное и правильное воспроизведение в темпе предъявления',
}

$(function(){

  console.log('Сенсо-моторный уровень!')

  for (let hint in hints){
    $('.buttons').append(`<div class="col-auto col-sm-auto col-md-auto"><button class="scores-btn ${colors[hint].name}" value=${hint} data-tooltip='${hints[hint]}'>${hint}</button></div>`)
  }

  let i = 0;
    const scores = $('.state-table').attr('data-scores')
    for (let i in pairsOfSounds){
        $('.state-table tr').append(`<td data-tooltip='${pairsOfSounds[i].view}' data-id=${i} data-score=${scores[i]}></td>`)

        $(`td[data-id=${i}]`).css({
          'background-color': scores[i] == '-' ? '#fff' : colors[scores[i]].code,
          'transition':'background-color 0.3s ease-out',
        })
    }


  $('#text').text(pairsOfSounds[i].view)

  $('.state-table tr td:first-child').addClass('active-cell')

  $('.scores-btn').on('click',function(e){

    e.preventDefault()

    $(`td[data-id=${i}]`).attr('data-score', e.target.value)

    $(`td[data-id=${i}]`).removeClass('active-cell')

    $(`td[data-id=${i}]`).css({
      'background-color': colors[e.target.value].code,
      'transition':'background-color 0.3s ease-out',
    })

    $('#text').text(pairsOfSounds[i].view).animate({
      'margin-left': -200,
      opacity: 0.0,
    }, 100, function(){
      i++;
      if (i == pairsOfSounds.length) {
        i = 0
        // $('.btn').attr('disabled', true)
        // $('td').removeClass('active')
        // return;
      };
      $(`td[data-id=${i}]`).addClass('active-cell')
      $('#text').css({
        'margin-left':200,
      })
      $('#text').text(pairsOfSounds[i].view).animate({
        'margin-left': 0,
        opacity: 1.0,
      }, 100,)
    })
  })

  $('td').on('mouseover', function(e){
    const id = $(e.target).attr('data-id')
  })

  $('td').on('click', function(e){
    const id = $(e.target).attr('data-id')
    i = id
    $(`td`).removeClass('active-cell')
    $(`td[data-id=${id}]`).addClass('active-cell')
    $('#text').text(pairsOfSounds[id].view).animate({
      'margin-left': -200,
      opacity: 0.0,
    }, 100, function(){
      $('#text').css({
        'margin-left':200,
      })
      $('#text').text(pairsOfSounds[id].view).animate({
        'margin-left': 0,
        opacity: 1.0,
      }, 100,)
      })
  })
})