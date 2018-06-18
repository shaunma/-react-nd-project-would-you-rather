import React, {Component} from 'react';
import {handleAddQuestion} from '../actions/questions'
import {connect} from 'react-redux'
import PropTypes from "prop-types"
import {Redirect} from 'react-router-dom'


class AskQuestion extends Component {

  static propTypes = {
    author: PropTypes.string,
  }

  state = {
    isComplete: false,
    optionOneText: '',
    optionTwoText: ''
  }

  handleChange = (event) => {
    const {name, value} = event.target
    const newState = this.state;
    newState[name] = value
    newState.isComplete = newState.optionOneText !== '' && newState.optionTwoText !== '';
    this.setState(newState)
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const {optionOneText, optionTwoText} = this.state
    const {dispatch} = this.props

    dispatch(handleAddQuestion(optionOneText, optionTwoText))
    this.setState(() => ({
      toHome: true
    }))
  }

  render() {
    const {optionOneText, optionTwoText, isComplete, toHome} = this.state;
    if (toHome === true) {
      return <Redirect to='/'/>
    }
    return (
      <div>
        Would you rather?
        <form className='ask-question' onSubmit={this.handleSubmit}>
          <br/>
          <input type='text' name='optionOneText' value={optionOneText} onChange={this.handleChange}/>
          <br/>
          <input type='text' name='optionTwoText' value={optionTwoText} onChange={this.handleChange}/>
          <br/>
          <button
            className='btn'
            type='submit'
            disabled={!isComplete}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({authedUser}) {
  return {
    author: authedUser
  }
}

export default connect(mapStateToProps)(AskQuestion);
