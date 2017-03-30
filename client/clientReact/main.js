var React = require('react')
var ReactDOM = require('react-dom')
var request = require('superagent')
var FormComponent = require('./Form')


var MainComponent = React.createClass({
  getInitialState: function(){
    return { data: [], modal: false, updateValue: '', idToUpdate: ''}
  },
  componentDidMount: function(){
    var state = this.state;
    var self = this;
    request.get('http://localhost:9292/items')
      .end(function(err, data){
        console.log(data, ' this is data')
        state.data = data.body;
        self.setState(state)
      })
  },
  createItem: function(item){
    var state = this.state;
    var self = this;

    request.post('http://localhost:9292/items')
      .type('form')
      .send({title: item} )
      .end(function(err, data){
        console.log(data.body);
        state.data = data.body;
        self.setState(state)
      })
  },
  update: function(event, id){
    console.log(self, event.target)
    var state = this.state;
    state.modal = true;
    state.idToUpdate = id;
    this.setState(state)
    console.log(id, ' this is event')
  },
  getUpdateValue: function(newValue){
    console.log(newValue)
    var state = this.state;
    var self = this;

    var prettyObjectToSend = {
      id: this.state.idToUpdate,
      title: newValue
    }

    request.patch('http://localhost:9292/items/' + this.state.idToUpdate)
      .type('form')
      .send({
      id: this.state.idToUpdate,
      title: newValue
    })
      .end(function(err, data){
        console.log(data);
        state.data = data.body;
        self.setState(state)
      })
  },
  render: function(){
    var self = this;
    var entries = this.state.data.map(function(item, i){
            return(
              <li key={i}>{item.title} <button onClick={self.update.bind(self, item.id)}>update</button></li>
            )
          })


    return (
      <div>
        <FormComponent onItemSubmit={this.createItem}/>
        {this.state.modal ? <Modal getUpdateValue={this.getUpdateValue}/> : null}
        <ul>
          {entries}
        </ul>
      </div>
    )
  }
});


var Modal = React.createClass({
  getInitialState: function(){
    return {updateValue: ''}
  },
  updateValue: function(event){
    var state = this.state;
    state.updateValue = event.target.value
    this.setState(state)
  },
  finalValue: function(){
    this.props.getUpdateValue(this.state.updateValue)
  },
  render: function(){
    return (
      <div>
        <input type="text" onChange={this.updateValue} value={this.state.updateValue}/>
        <button onClick={this.finalValue}>submit</button>
      </div>
      )
  }
})



ReactDOM.render(
  <MainComponent/>, document.getElementById('container')
)
