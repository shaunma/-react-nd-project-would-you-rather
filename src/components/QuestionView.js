import React, {Component} from 'react';
import PropTypes from "prop-types"
import moment from "moment"
import {Link, Redirect} from 'react-router-dom'
import {connect} from "react-redux"
import {handleSaveQuestionAnswer} from "../actions/shared"

class QuestionView extends Component {

  static TIME_FORMAT_STRING = "YYYY-MM-DD h:mm:ss a"

  static propTypes = {
    qid: PropTypes.string.isRequired,
    optionOne: PropTypes.object.isRequired,
    optionTwo: PropTypes.object.isRequired,
    createdAt: PropTypes.number.isRequired,
    authorId: PropTypes.string.isRequired,
    author: PropTypes.object.isRequired,
    votedOption: PropTypes.oneOf(['optionOne', 'optionTwo']),
    onQuestionPage: PropTypes.bool.isRequired
  }

  state = {
    redirectAfterVote: false
  }

  renderOption = (answer, percent) => {
    const {votedOption} = this.props;
    const hasVoted = (typeof votedOption !== 'undefined')
    const hasVotedForThisAnswer = hasVoted && votedOption === answer
    const option = this.props[answer]
    const className = hasVotedForThisAnswer ? "choice-option chosen" : "choice-option"

    return (
      <div className={className}>
        <h3>
          {option.text}
          {hasVotedForThisAnswer && <span className="chosen-checkmark"> ✓</span>}
        </h3>
        {hasVoted ? (
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
    const {dispatch, qid, onQuestionPage} = this.props
    dispatch(handleSaveQuestionAnswer(
      qid,
      answer
    ))
    if (!onQuestionPage) {
      this.setState({
        redirectAfterVote: true
      })
    }
  }

  renderTitle = () => {
    const {author} = this.props
    return (
      <div>
        <div className="choice-poster">
          <img
            src={author.avatarURL}
            alt={`Avatar of ${author.name}`}
            className='avatar'
          />
          <span>{author.name} asks: </span>
        </div>
        <h4>Would you rather?</h4>
      </div>
    )
  }

  render() {
    const {redirectAfterVote} = this.state
    const {
      qid,
      createdAt,
      optionOne,
      optionTwo,
      onQuestionPage
    } = this.props
    if (redirectAfterVote) {
      return <Redirect to={`/questions/${qid}`}/>;
    }
    const totalVotes = optionOne.votes.length + optionTwo.votes.length
    const optionOnePercentage = totalVotes === 0 ? 0 : optionOne.votes.length / totalVotes * 100
    const optionTwoPercentage = totalVotes === 0 ? 0 : 100 - optionOnePercentage
    const createdAtDisplay = moment(createdAt).format(QuestionView.TIME_FORMAT_STRING)
    return (
      <div className="choice-container">
        <div>
          {
            onQuestionPage ?
              this.renderTitle() :
              <Link to={`/questions/${qid}`}>{this.renderTitle()}</Link>
          }
        </div>
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
  const author = users[ownProps.authorId]
  const votedOption = user.answers[ownProps.qid]
  return {
    author, votedOption
  }
}

export default connect(mapStateToProps)(QuestionView);
