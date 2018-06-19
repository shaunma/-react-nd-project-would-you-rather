import React from 'react';
import {connect} from "react-redux"
import PropTypes from "prop-types"
import LeaderboardEntry from "./LeaderboardEntry"

const Leaderboard = ({entries}) => {

  return (
    <div className="leaderboard-container">
      {
        entries.map((entry) => (
          <LeaderboardEntry
            key={entry.userId}
            fullName={entry.fullName}
            avatarURL={entry.avatarURL}
            numAsked={entry.numAsked}
            numAnswered={entry.numAnswered}/>
        ))
      }
    </div>
  );
}

Leaderboard.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    avatarURL: PropTypes.string.isRequired,
    numAsked: PropTypes.number.isRequired,
    numAnswered: PropTypes.number.isRequired,
  })),
}

function mapStateToProps({users}) {
  const entries =
    Object
      .values(users)
      .map((user) => ({
        userId: user.id,
        fullName: user.name,
        avatarURL: user.avatarURL,
        numAsked: user.questions.length,
        numAnswered: Object.keys(user.answers).length
      }))
      .sort((a, b) => {
        const bTotal = b.numAsked + b.numAnswered
        const aTotal = a.numAsked + a.numAnswered
        return bTotal - aTotal
      })
  return {
    entries: entries
  }
}

export default connect(mapStateToProps)(Leaderboard)
