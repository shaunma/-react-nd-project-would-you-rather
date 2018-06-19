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
    optionTwoText: '',
    toHome: false
  }

  handleChange = (event) => {
    const {name, value} = event.target
    const {optionOneText, optionTwoText} = this.state
    // Validate the form on every key press.
    const otherOptionText = name === 'optionOneText' ? optionTwoText : optionOneText
    const isComplete = value !== '' && otherOptionText !== '' && value !== otherOptionText;
    this.setState({
      [name]: value,
      isComplete
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const {optionOneText, optionTwoText, isComplete} = this.state
    if (isComplete) {
      const {dispatch} = this.props
      dispatch(handleAddQuestion(optionOneText, optionTwoText))
      this.setState({
        toHome: true
      })
    }
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
