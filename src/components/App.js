import React, { Component } from "react";
import play from "../play.png"
import intervalflag from "../intervalflag.png"
import pause from "../pause.png"
import stop from "../stop.png"


class App extends Component {
  state = {
    hour: 0,
    minute: 0,
    secund: 0,
    milleSecund: 0,
    btnStopIntervalNone: "none",
    btnStartNone: "inline-block",
    interval:"",
    watchInterval: []
  };

  startWatch = () => {
    
    let time = setInterval(() => {
      let { hour, minute, secund, milleSecund } = this.state;
      if (milleSecund === 99) {
        if (secund === 59) {
          if (minute === 59) {
            this.setState({
              hour: hour + 1,
              minute: 0,
              secund: 0,
              milleSecund: 0,
            });
          } else {
            this.setState({
              minute: minute + 1,
              secund: 0,
              milleSecund: 0,
            });
          }
        } else {
          this.setState({
            secund: secund + 1,
            milleSecund: 0,
          });
        }
      } else {
        this.setState({
          milleSecund: milleSecund + 1,
        });
      }
    }, 10);
     
    this.setState({
        btnStartNone: "none",
        btnStopIntervalNone:"inline-block",
        interval: time,
    })
  };

  stopWatch = () => {
    clearInterval(this.state.interval)
    this.setState({
        btnStartNone: "inline-block",
        btnStopIntervalNone:"none",
    })
  }

  intervalWatch = () => {
    let { hour, minute, secund, milleSecund, watchInterval } = this.state;
    watchInterval.push(`${hour}:${minute < 10 ? `0${minute}` : minute}:${secund < 10 ? `0${secund}` : secund}:${milleSecund < 10 ? `0${milleSecund}` : milleSecund}`)
    this.setState({
        watchInterval: watchInterval,
    })
  }

  clearWatch = () => {
    clearInterval(this.state.interval)
    this.setState({
        hour: 0,
        minute: 0,
        secund: 0,
        milleSecund: 0,
        interval:"",
        watchInterval: []
    })
  }


  render() {
    let { hour, minute, secund, milleSecund, watchInterval, btnStopIntervalNone, btnStartNone } = this.state;

    return (
      <div className="container">
        <div className="secundNumber card">
          <div className="card-header">
            <h1>Stop Watch</h1>
          </div>

          <div className="card-body text-center">
            <div className="time-box">
              <span className="hour">{hour}</span>:
              <span className="minute">
                {minute < 10 ? `0${minute}` : minute}
              </span>
              :
              <span className="secund">
                {secund < 10 ? `0${secund}` : secund}
              </span>
              :
              <span className="mille-secund">
                {milleSecund < 10 ? `0${milleSecund}` : milleSecund}
              </span>
            </div>

            <div className="control-box">
              <hr />

              <button className="btn btn-light" style={{display: btnStartNone}} onClick={this.startWatch}>
                <img src={play} alt="" />
              </button>

              <button className="btn btn-light" style={{display: btnStopIntervalNone}} onClick={this.stopWatch}>
                <img src={pause} alt="" />
              </button>

              <button className="btn btn-light" style={{display: btnStartNone}} onClick={this.clearWatch}>
                <img src={stop} alt="" />
              </button>

              <button className="btn btn-light" style={{display: btnStopIntervalNone}} onClick={this.intervalWatch}>
                <img src={intervalflag} alt="" />
              </button>
            </div>
          </div>

          <div className="card-footer">
            <div className="interval-box">
                <table className="table table-hover">
                <tbody>
                {
                    watchInterval.map( (item, index) => {
                        return ( 
                            <tr className="text-center">
                                <td className="col-2">{index+1} =&gt; </td>
                                <td>{item}</td>
                            </tr>)
                    })
                }
                </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
