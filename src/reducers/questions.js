import {RECEIVE_QUESTIONS, ADD_QUESTION, UPDATE_QUESTION} from '../actions/questions'
import {createReducer} from './reducerUtil'

const questionReducers = createReducer({}, {
  [ADD_QUESTION]: addQuestion,
  [RECEIVE_QUESTIONS]: receiveQuestions,
  [UPDATE_QUESTION]: updateQuestion
})

function addQuestion(state, action) {
  return {
    ...state,
    [action.question.id]: action.question,
  }
}

function receiveQuestions(state, action) {
  return {
    ...state,
    ...action.questions
  }
}

function updateQuestion(state, action) {
  const {authedUser, qid, answer} = action
  return {
    ...state,
    [qid]: {
      ...state[qid],
      [answer]: {
        ...state[qid][answer],
        votes: state[qid][answer].votes.concat([authedUser])
      }
    }
  }
}

export default questionReducers
