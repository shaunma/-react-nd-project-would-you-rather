import {RECEIVE_USERS, UPDATE_USER} from "./actionTypes"

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function updateUser(authedUser, qid, answer) {
  return {
    type: UPDATE_USER,
    authedUser,
    qid,
    answer
  }
}
