import React, {Component} from 'react'
import {connect} from "react-redux"
import {unsetAuthedUser} from "../actions/authedUser"

class LoginLogout extends Component {

  logout(event) {
    event.preventDefault()
    const {dispatch} = this.props
    dispatch(unsetAuthedUser())
  }

  signedOutComponent = (user) => (
    <React.Fragment>
      <img
        src={user.avatarURL}
        alt={"Avatar of " + user.name}
        className='avatar'
      />
      <span className="user-name"> {user.id}</span>
      <button onClick={(event) => this.logout(event)}>Log out</button>
    </React.Fragment>
  )

  render() {
    const {authedUser, users} = this.props
    return (
      <div className="login-block">
        {authedUser &&
        this.signedOutComponent(users[authedUser])
        }
      </div>
    )
  }
}

function mapStateToProps({authedUser, users}) {
  return {
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(LoginLogout)
