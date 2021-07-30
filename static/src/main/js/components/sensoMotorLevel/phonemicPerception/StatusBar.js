import React from 'react'
import $ from 'jquery'

export default class StatusBar extends React.Component{
    constructor(props) {
        super(props)
        this.pairsOfSound = props.pairsOfSound
        this.state = {
            activeCell: 0,
            num: 0
        }
    }

    //Событие при нажатии на ячейку строки статуса
    handleClick = (e) => {
        console.log($(e.target).attr('data-id'))
    }

    render() {
        return (
            <React.Fragment>
                <div className="row justify-content-md-center mt-3">
                  <div className="col-md-auto">
                      <table className='state-table' data-scores='{{scores}}'>
                          <tbody>
                            <tr>
                                { this.pairsOfSound.map((pair)=>
                                    <td onClick={this.handleClick}
                                        key={pair.id}
                                        data-tooltip={pair.view}
                                        data-id={pair.id}>
                                    </td>)}
                            </tr>
                          </tbody>
                      </table>
                  </div>
                </div>
                <div className="row justify-content-md-center mt-5">
                  <div id="center" className="col-md-auto">
                    <p id="text">
                        {this.pairsOfSound[this.state.activeCell].view}
                    </p>
                  </div>
                </div>
            </React.Fragment>
        )
    }
}