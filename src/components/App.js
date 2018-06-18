import React, {Component, Fragment} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import Login from "./Login"
import QuestionPage from "./QuestionPage"
import AskQuestion from "./AskQuestion"
import Leaderboard from "./Leaderboard"
import PrivateRoute from "./PrivateRoute"
import NoMatch from "./NoMatch"

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const isAuthenticated = !!this.props.authedUser
    return (
      <Router>
        <Fragment>
          <LoadingBar/>
          <div className='container'>
            {isAuthenticated && <Nav/>}
            <Switch>
              <Route path='/login' component={Login}/>
              <PrivateRoute path='/leaderboard' component={Leaderboard}
                            isAuthenticated={isAuthenticated}
              />
              <PrivateRoute path='/' exact
                            component={Dashboard}
                            isAuthenticated={isAuthenticated}
              />
              <PrivateRoute path='/questions/:qid'
                            component={QuestionPage}
                            isAuthenticated={isAuthenticated}
              />
              <PrivateRoute path='/add'
                            component={AskQuestion}
                            isAuthenticated={isAuthenticated}
              />
              <Route component={NoMatch}/>
            </Switch>
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App)
