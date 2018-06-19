import {saveQuestion} from '../utils/api'
import {showLoading, hideLoading} from 'react-redux-loading'
import {ADD_QUESTION, RECEIVE_QUESTIONS, UPDATE_QUESTION} from './actionTypes'

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function updateQuestion(authedUser, qid, answer) {
  return {
    type: UPDATE_QUESTION,
    authedUser,
    qid,
    answer
  }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const {authedUser} = getState()

    dispatch(showLoading())

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}
