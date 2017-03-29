var React = require('react');

var FormComponent = React.createClass({
  getInitialState: function(){
    return {inputValue: ''}
  },
  handleClick: function(event){
    event.preventDefault();
    this.props.onItemSubmit(this.state.inputValue)
  },
  render: function(){
    return(
      <div>
        <form>
          <input placeholder="Thing" value={this.state.inputValue} onChange={this.updateValue}/>
          <button onClick={this.handleClick}>Submit item!</button>
        </form>
      </div>
    )
  },
  updateValue: function(event){
    this.setState({inputValue: event.target.value})
  }
})

module.exports = FormComponent;
