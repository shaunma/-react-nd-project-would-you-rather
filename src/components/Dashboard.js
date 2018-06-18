import React, {Component} from 'react';
import PropTypes from "prop-types"
import QuestionList from "./QuestionList"
import _ from 'lodash'
import {connect} from 'react-redux'

class Dashboard extends Component {

  static ANSWERED = 'ANSWERED'
  static UNANSWERED = 'UNANSWERED'
  static DISPLAY_STATES = [
    {
      value: Dashboard.ANSWERED,
      label: "Show Answered",
      questionList: "questionsAnswered"
    },
    {
      value: Dashboard.UNANSWERED,
      label: "Show Unanswered",
      questionList: "questionsUnanswered"
    }
  ]

  static propTypes = {
    questionsAnswered: PropTypes.arrayOf(PropTypes.object),
    questionsUnanswered: PropTypes.arrayOf(PropTypes.object),
  }

  state = {
    questionsToDisplay: Dashboard.UNANSWERED
  }

  updateDisplayedQuestion(newState) {
    this.setState({questionsToDisplay: newState})
  }

  _renderRadioButton(displayState) {
    return (
      <div key={displayState.value}>
        <input type="radio"
               name="questionsToDisplay"
               id={displayState.value}
               value={displayState.value}
               checked={this.state.questionsToDisplay === displayState.value}
               onChange={() => this.updateDisplayedQuestion(displayState.value)}
        />
        <label htmlFor={displayState.value}>{displayState.label}</label>
      </div>
    )
  }

  render() {
    const {questionsToDisplay} = this.state
    return (
      <div>
        <h2>Would you rather</h2>
        {
          Dashboard.DISPLAY_STATES
            .map(displayState => (
                this._renderRadioButton(displayState)
              )
            )
        }

        {
          Dashboard.DISPLAY_STATES
            .filter(displayState => (displayState.value === questionsToDisplay))
            .map(displayState => (
                <QuestionList key={displayState.value} questions={this.props[displayState.questionList]}/>
              )
            )
        }
      </div>
    );
  }
}

function mapStateToProps({authedUser, users, questions}) {
  const answeredQids = Object.keys(users[authedUser].answers)
  const mostRecentFirst = (a, b) => b.timestamp - a.timestamp
  return {
    questionsAnswered: _.values(questions)
      .filter((question) => answeredQids.includes(question.id))
      .sort(mostRecentFirst),
    questionsUnanswered: _.values(questions)
      .filter((question) => !answeredQids.includes(question.id))
      .sort(mostRecentFirst)
  }
}

export default connect(mapStateToProps)(Dashboard)
