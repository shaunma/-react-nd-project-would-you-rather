import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import LoginLogout from "./LoginLogout"
import {connect} from "react-redux"

class Nav extends Component {
  render() {
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='bold'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='bold'>
              Leaderboard
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='bold'>
              New Question
            </NavLink>
          </li>
          <li>
            <LoginLogout/>
          </li>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
    authedUser: authedUser
  }
}

const connectorOptions = {pure: false} // To make active route work. See https://github.com/ReactTraining/react-router/issues/3536
export default connect(mapStateToProps, null, null, connectorOptions)(Nav)
