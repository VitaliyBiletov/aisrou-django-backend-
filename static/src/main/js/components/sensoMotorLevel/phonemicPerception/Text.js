import React from 'react'

export default class Text extends React.Component {
    constructor(props) {
        super(props);
        this.pairsOfSounds = props.pairsOfSound
    }

    render() {
        const [ activePair ] = this.pairsOfSounds.filter( pair => pair.active )

        $('#text').animate({
          'margin-left': -50,
          opacity: 0.0,
        }, 100, function(){
          $('#text').css({
            'margin-left':50,
          }).animate({
            'margin-left': 0,
            opacity: 1.0,
          }, 100,)
        })

        return (
            <div className={`row justify-content-md-center mt-5`}>
              <div className="col-md-auto">
                    <p id="text">{ activePair.text }</p>
              </div>
            </div>
        )
    }
}