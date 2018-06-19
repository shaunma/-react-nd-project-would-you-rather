import React, {Component} from 'react';
import PropTypes from 'prop-types';
import QuestionView from "./QuestionView"
import {connect} from "react-redux"
import NoMatch from "./NoMatch"

class QuestionPage extends Component {

  static propTypes = {
    qid: PropTypes.string,
    question: PropTypes.object
  }

  render() {
    const {question} = this.props
    const questionFound = question !== undefined
    return (
      <div>
        {questionFound ? (
          <QuestionView
            key={question.id}
            qid={question.id}
            authorId={question.author}
            createdAt={question.timestamp}
            text={question.text}
            optionOne={question.optionOne}
            optionTwo={question.optionTwo}
            onQuestionPage={true}
          />
        ) : (
          <NoMatch/>
        )}
      </div>
    );
  }
}

function mapStateToProps({questions, users}, props) {
  const {qid} = props.match.params
  return {
    qid,
    question: questions[qid]
  }
}

export default connect(mapStateToProps)(QuestionPage)

