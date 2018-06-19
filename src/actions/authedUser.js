import {SET_AUTHED_USER, UNSET_AUTHED_USER} from "./actionTypes"

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  }
}

export function unsetAuthedUser() {
  return {
    type: UNSET_AUTHED_USER
  }
}
