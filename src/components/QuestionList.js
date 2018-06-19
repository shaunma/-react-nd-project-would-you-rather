import React, {Component} from 'react';
import PropTypes from 'prop-types';
import QuestionView from "./QuestionView"

class QuestionList extends Component {

  static propTypes = {
    questions: PropTypes.arrayOf(PropTypes.object),
  }

  render() {
    const {questions} = this.props
    return (
      <div>
        {
          questions.map((question) => (
            <QuestionView
              key={question.id}
              qid={question.id}
              authorId={question.author}
              createdAt={question.timestamp}
              text={question.text}
              optionOne={question.optionOne}
              optionTwo={question.optionTwo}
              onQuestionPage={false}
            />
          ))
        }
        <br/>
      </div>
    );
  }
}

export default QuestionList;
