import React, {Component} from 'react';
import PropTypes from "prop-types"
import moment from "moment"
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import {handleSaveQuestionAnswer} from "../actions/shared"

class QuestionView extends Component {

  static TIME_FORMAT_STRING = "YYYY-MM-DD h:mm:ss a"

  static propTypes = {
    qid: PropTypes.string.isRequired,
    optionOne: PropTypes.object.isRequired,
    optionTwo: PropTypes.object.isRequired,
    createdAt: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
    voted: PropTypes.bool.isRequired,
    displayLink: PropTypes.bool.isRequired
  }


  state = {}

  renderOption = (answer, percent) => {
    const {voted} = this.props;
    const option = this.props[answer]


    return (
      <div className="choice-option">
        <h3>{option.text}</h3>
        {voted ? (
          <div>
            <p>Percent: {percent.toFixed(1)}</p>
            <p>Number of votes: {option.votes.length}</p>
          </div>
        ) : (
          <button
            className='btn'
            type='button'
            onClick={(event) => this.handleVote(event, answer)}>
            Vote
          </button>
        )}
      </div>
    )
  }

  handleVote = (event, answer) => {
    event.preventDefault()
    const {dispatch, qid} = this.props
    dispatch(handleSaveQuestionAnswer(
      qid,
      answer
    ))
  }

  render() {
    const {
      qid,
      createdAt,
      optionOne,
      optionTwo,
      displayLink
    } = this.props
    const totalVotes = optionOne.votes.length + optionTwo.votes.length
    const optionOnePercentage = totalVotes === 0 ? 0 : optionOne.votes.length / totalVotes * 100
    const optionTwoPercentage = totalVotes === 0 ? 0 : 100 - optionOnePercentage
    const createdAtDisplay = moment(createdAt).format(QuestionView.TIME_FORMAT_STRING)
    return (
      <div className="choice-container">
        <h3>
          {
            displayLink ? (
              <Link to={`/questions/${qid}`}>Would you rather?</Link>
            ) : (
              <div>Would you rather?</div>
            )
          }
        </h3>
        <div className="choice-row">
          {
            this.renderOption('optionOne', optionOnePercentage)
          }
          {
            this.renderOption('optionTwo', optionTwoPercentage)
          }
        </div>
        <p>Created at: {createdAtDisplay}</p>
      </div>
    );
  }
}

function mapStateToProps({authedUser, users}, ownProps) {
  const user = users[authedUser]
  const voted = Object.keys(user.answers).includes(ownProps.qid)
  return {
    user, voted
  }
}

export default connect(mapStateToProps)(QuestionView);
