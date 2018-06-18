import {ADD_QUESTION} from "../actions/questions"
import {RECEIVE_USERS, UPDATE_USER} from '../actions/users'
import {createReducer} from './reducerUtil'

const userReducers = createReducer({}, {
  [ADD_QUESTION]: addQuestion,
  [RECEIVE_USERS]: receiveUsers,
  [UPDATE_USER]: updateUser
})

function addQuestion(state, action) {
  const questionId = action.question.id
  const author = action.question.author
  return {
    ...state,
    [author]: {
      ...state[author],
      questions: [
        ...state[author].questions.concat(questionId)
      ]
    }
  }
}

function receiveUsers(state, action) {
  return {
    ...state,
    ...action.users
  }
}

function updateUser(state, action) {
  const {authedUser, qid, answer} = action
  return {
    ...state,
    [authedUser]: {
      ...state[authedUser],
      answers: {
        ...state[authedUser].answers,
        [qid]: answer
      }
    }
  }
}

export default userReducers;
