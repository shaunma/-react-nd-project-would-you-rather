import React, {Component} from 'react';
import PropTypes from "prop-types"

class LeaderboardEntry extends Component {

  static propTypes = {
    fullName: PropTypes.string.isRequired,
    avatarURL: PropTypes.string.isRequired,
    numAsked: PropTypes.number.isRequired,
    numAnswered: PropTypes.number.isRequired,
  }

  render() {
    const {fullName, avatarURL, numAsked, numAnswered} = this.props
    return (
      <div>
        <img
          src={avatarURL}
          alt={`Avatar of ${fullName}`}
          className='avatar'
        />
        <div>
          <p className='leaderboard-stats'>
            <span>Name:</span>
            <span className='bold'> {fullName}</span>
          </p>
          <p className='leaderboard-stats'>
            <span>Number Asked:</span>
            <span className='bold'> {numAsked}</span>
          </p>
          <p className='leaderboard-stats'>
            <span>Number Answered:</span>
            <span className='bold'> {numAnswered}</span>
          </p>
        </div>
      </div>
    );
  }
}

export default LeaderboardEntry
