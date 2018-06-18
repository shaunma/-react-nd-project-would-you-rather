import React, {Component} from 'react';
import {setAuthedUser} from '../actions/authedUser'
import {connect} from 'react-redux'
import {Redirect} from "react-router-dom"


class Login extends Component {

  state = {
    redirectToReferrer: false
  }

  handleChange = (event) => {
    const userId = event.target.value
    if (userId) {
      const {dispatch} = this.props
      dispatch(setAuthedUser(userId))
      this.setState({redirectToReferrer: true})
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
    const {from} = this.props.location.state || {from: {pathname: "/"}};
    const {redirectToReferrer} = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from}/>;
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
