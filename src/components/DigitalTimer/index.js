import {Component} from 'react'

import './index.css'

const initialState = {
  isPlay: false,
  timerCountMinutes: 25,
  timerCountSeconds: 0,
}

class DigitalTimer extends Component {
  state = initialState

  clearTimerInterval = () => clearInterval(this.intervalId)

  increaseTimeCount = () => {
    const {timerCountMinutes, timerCountSeconds} = this.state

    const isTimerCompleted = timerCountSeconds === timerCountMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isPlay: false})
    } else {
      this.setState(prevState => ({
        timerCountSeconds: prevState.timerCountSeconds + 1,
      }))
    }
  }

  onClickPlay = () => {
    this.setState(prevState => ({isPlay: !prevState.isPlay}))

    const {isPlay, timerCountSeconds, timerCountMinutes} = this.state

    const isTimerCompleted = timerCountSeconds === timerCountMinutes * 60

    if (isTimerCompleted) {
      this.setState({timerCountSeconds: 0})
    }
    if (isPlay) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.increaseTimeCount, 1000)
    }
  }

  onReset = () => {
    this.setState(initialState)
    this.clearTimerInterval()
  }

  onDecreaseTimeInMinutes = () => {
    const {timerCountMinutes} = this.state

    if (timerCountMinutes > 1) {
      this.setState(prevState => ({
        timerCountMinutes: prevState.timerCountMinutes - 1,
      }))
    }
  }

  onIncreaseTimeInMinutes = () => {
    this.setState(prevState => ({
      timerCountMinutes: prevState.timerCountMinutes + 1,
    }))
  }

  getPlayPauseIconUrl = () => {
    const {isPlay} = this.state

    return isPlay
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png '
  }

  getPlayPauseText = () => {
    const {isPlay} = this.state

    return isPlay ? 'Pause' : 'Start'
  }

  getAltText = () => {
    const {isPlay} = this.state

    return isPlay ? 'pause icon' : 'play icon'
  }

  getTimerStatus = () => {
    const {isPlay} = this.state

    return isPlay ? 'Running' : 'Paused'
  }

  getTimerLimit = () => {
    const {timerCountMinutes, timerCountSeconds} = this.state

    const isButtonDisabled = timerCountSeconds > 0

    return (
      <div className="timer-container">
        <p className="set-timer">Set Timer Limit</p>
        <div className="set-timer-container">
          <button
            className="decrease-button"
            type="button"
            disabled={isButtonDisabled}
            onClick={this.onDecreaseTimeInMinutes}
          >
            -
          </button>
          <p className="time-minutes-count">{timerCountMinutes}</p>
          <button
            className="decrease-button"
            type="button"
            disabled={isButtonDisabled}
            onClick={this.onIncreaseTimeInMinutes}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  getStartAndResetTimes = () => (
    <div className="start-pause-btn-container">
      <button className="play-button" type="button" onClick={this.onClickPlay}>
        <img
          src={this.getPlayPauseIconUrl()}
          className="play-btn-image"
          alt={this.getAltText()}
        />
        <p className="btn-text" type="button">
          {this.getPlayPauseText()}
        </p>
      </button>
      <button className="reset-button" type="button" onClick={this.onReset}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          className="play-btn-image"
          alt="reset icon"
        />
        <p className="btn-text">Reset</p>
      </button>
    </div>
  )

  getTimeSecondsInFormat = () => {
    const {timerCountMinutes, timerCountSeconds} = this.state

    const remainingSeconds = timerCountMinutes * 60 - timerCountSeconds

    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = Math.floor(remainingSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const timerStatusText = this.getTimerStatus()
    return (
      <div className="bg-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="content-container">
          <div className="time-display-container">
            <div className="resultant-time-container">
              <h1 className="timer-count">{this.getTimeSecondsInFormat()}</h1>
              <p className="time-status">{timerStatusText}</p>
            </div>
          </div>
          <div>
            {this.getStartAndResetTimes()}
            {this.getTimerLimit()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
