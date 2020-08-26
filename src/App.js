import React, {Component} from 'react';
import './App.css';

function offCount(param){
  clearInterval(param);
}

var audio;
// eslint-disable-next-line
var audioOn = false;

class App extends Component{
  constructor() {
    //eslint-disable-next-line
    var countD = "";
    //eslint-disable-next-line
    var breakD = "";
    //eslint-disable-next-line
    audio = document.getElementById("beep");
    
    super();
    this.state = {
      minute: "25",
      second: "00",
      running: false,
      brunning: true,
      minuteSet: "25",
      breakSet: "5",
      id: "Session",
      origMin: ""
    };
    this.countDown = this.countDown.bind(this);
    this.reset = this.reset.bind(this);
    this.sesIncrement = this.sesIncrement.bind(this);
    this.sesDecrement = this.sesDecrement.bind(this);
    this.breIncrement = this.breIncrement.bind(this);
    this.breDecrement = this.breDecrement.bind(this);
    this.breakDown = this.breakDown.bind(this);
  }

  sesIncrement() {
    if (this.state.running === false) {
      let minSet = parseInt(this.state.minuteSet);
      if (minSet < 60) {
        minSet ++;
      minSet = minSet.toString();
      this.setState({
        minute: minSet,
        minuteSet: minSet,
        origMin: minSet
        });
      }
    }
    return false;
  }

  sesDecrement() {
    if (this.state.running === false) {
      let minSet = this.state.minuteSet;
      if (minSet>1) {
        minSet --;
        minSet = minSet.toString();
        this.setState({
        minute: minSet,
        minuteSet: minSet,
        origMin: minSet
        });
        
      } else {
        return false;
      }
    }
    return false;
  }
  
  breIncrement() {
    if (this.state.running === false) {
    let brSet = this.state.breakSet;
    if (brSet<60) {
      brSet++;
        this.setState({
          breakSet: brSet
          });
      }  
    }
  }

  breDecrement() {
    if (this.state.running === false) {
    let brSet = this.state.breakSet;
      if (brSet>1) {
        brSet --;
        this.setState({
          breakSet: brSet
        });
      } else {
        return false;
      }
    }
  }
    
  reset() {
    audio = document.getElementById("beep");
    offCount(this.countD);
    offCount(this.breakD);
    if (!audio.paused || audio.currentTime) {
      audio.pause();
      audio.currentTime=0;
    }

    this.setState({
      minute: "25",
      second: "00",
      running: false,
      brunning: true,
      minuteSet: "25",
      breakSet: "5",
      id: "Session",
      origMin: ""
    })
  }
  breakDown() {
    audio = document.getElementById("beep");
    if (this.state.id==="Session") {
      this.countDown()
    } else {
        //eslint-disable-next-line
    this.state.brunning = !this.state.brunning;
    var minu = parseInt(this.state.breakSet);
    var seco = parseInt(this.state.second);
    
    if (this.state.brunning === false) {
      offCount(this.breakD);
    }
    if (this.state.brunning === true) {
      this.breakD = setInterval(() => {
             
        if (seco<=0) {
          minu--;
          seco=59;
          //eslint-disable-next-line
          if (seco==0 && minu==0) {
            this.setState({id: "Session"});
            //eslint-disable-next-line
            offCount(this.breakD);
            //eslint-disable-next-line
            this.state.running = !this.state.running;
            //eslint-disable-next-line
            this.state.minute = this.state.origMin;
            audioOn = true;
            audio.play();
            setTimeout(function(){
              audioOn = false;
            },1002)
            this.countDown();
          }
        } else {
          seco--;
          
          //eslint-disable-next-line
          if (seco==0 && minu==0) {
            this.setState({id: "Session"});
            //eslint-disable-next-line
            offCount(this.breakD);
            //eslint-disable-next-line
            this.state.running = !this.state.running;
            //eslint-disable-next-line
            this.state.minute = this.state.origMin;
            audioOn = true;
            audio.play();
            setTimeout(function(){
              audioOn = false;
            },1002)
            this.countDown();
          }
        }
        minu = minu.toString().padStart(2, "0");
        seco = seco.toString().padStart(2, "0");
        this.setState({
          minute: minu,
          second: seco
        })
        }, 1000)
      }
    }
  }
   
  countDown() {
    audio = document.getElementById("beep");
    if (this.state.id==="Break") {
      this.breakDown()
    } else {
        //eslint-disable-next-line
    this.state.running = !this.state.running;
    var minu = parseInt(this.state.minute);
    var seco = parseInt(this.state.second);
    
    if (this.state.running === false) {
      offCount(this.countD);
    }
    if (this.state.running === true) {
      this.countD = setInterval(() => {
        
        if (seco<=0) {
          minu--;
          seco=59;
          //eslint-disable-next-line
          if (seco==0 && minu==0) {
            this.setState({id: "Break"});
            //eslint-disable-next-line
            offCount(this.countD);
            //eslint-disable-next-line
            this.state.brunning = !this.state.brunning;
            audioOn = true;
            audio.play();
            setTimeout(function(){
              audioOn = false;
            }, 1002)
            this.breakDown();
          }
        } else {
          seco--;
          
          //eslint-disable-next-line
          if (seco==0 && minu==0) {
            this.setState({id: "Break"});
            offCount(this.countD);
            //eslint-disable-next-line
            this.state.brunning = !this.state.brunning;
            audioOn = true;
            audio.play();
            setTimeout(function(){
              audioOn = false;
            }, 1002)
            this.breakDown();
          }
        }
        minu = minu.toString().padStart(2, "0");
        seco = seco.toString().padStart(2, "0");
        this.setState({
          minute: minu,
          second: seco
        })
      }, 1000)
    }
      }
    }

  render() {
    return (
      <div id="clock">
        <h1>Pomodoro Clock</h1>
        <p id="labels">
          <span id="break-label">Break Length</span>
          <span id="session-label">Session Length</span>
        </p>
        <p>
          <button id="break-increment" onClick={this.breIncrement}>+</button>
          <span id="break-length">{this.state.breakSet}</span>
          <button id="break-decrement" onClick={this.breDecrement}>-</button>
          <span></span>
          <button id="session-increment" onClick={this.sesIncrement}>+</button>
          <span id="session-length">{this.state.minuteSet}</span>
          <button id="session-decrement" onClick={this.sesDecrement}>-</button>
        </p>
        <div id="timer">
          <h1 id="timer-label">{this.state.id}</h1>
          <h2 id="time-left">{this.state.minute}:{this.state.second}</h2>
        </div>
        <p>
          <button id="start_stop" onClick={this.countDown}>Play/Pause</button>
          <span></span>
          <button id="reset" onClick={this.reset}>Reset</button>
        </p>

        <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
      </div>
    );
    }
  }

export default App;
