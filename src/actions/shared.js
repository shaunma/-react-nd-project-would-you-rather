import {getInitialData, saveQuestionAnswer} from '../utils/api'
import {receiveUsers, updateUser} from '../actions/users'
import {showLoading, hideLoading} from 'react-redux-loading'
import {receiveQuestions, updateQuestion} from "./questions"

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({users, questions}) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(hideLoading())
      })
  }
}

export function handleSaveQuestionAnswer(qid, answer) {
  return (dispatch, getState) => {
    const {authedUser} = getState()

    dispatch(showLoading())

    return saveQuestionAnswer({
      authedUser,
      qid,
      answer
    })
      .then(() => dispatch(updateQuestion(authedUser, qid, answer)))
      .then(() => dispatch(updateUser(authedUser, qid, answer)))
      .then(() => dispatch(hideLoading()))
  }
}
