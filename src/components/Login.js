import React, {Component} from 'react';
import {setAuthedUser} from '../actions/authedUser'
import {connect} from 'react-redux'
import {Redirect} from "react-router-dom"


class Login extends Component {

  state = {
    isLoginSuccessful: false
  }

  handleChange = (event) => {
    const userId = event.target.value
    if (userId) {
      const {dispatch} = this.props
      dispatch(setAuthedUser(userId))
      this.setState({isLoginSuccessful: true})
    }
  }

  renderUserList = (userIds) => {
    return (
      <select onChange={this.handleChange}>
        <option value=""></option>
        {
          userIds.map(userId => (
            <option key={userId} value={userId}>{userId}</option>
          ))
        }
      </select>
    )
  }

  render() {
    const {users} = this.props
    const userIds = Object.keys(users)
    const homePage = {pathname: "/"};
    const {isLoginSuccessful} = this.state;

    if (isLoginSuccessful) {
      return <Redirect to={homePage}/>;
    }

    return (
      <div>
        <h3>Would you rather?</h3>
        <p>Login by selecting a user</p>
        {
          this.renderUserList(userIds)
        }
      </div>
    )
  }
}

function mapStateToProps({users}) {
  return {
    users
  }
}

export default connect(mapStateToProps)(Login);
