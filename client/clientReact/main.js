var React = require('react')
var ReactDOM = require('react-dom')
var request = require('superagent')
var FormComponent = require('./Form')


var MainComponent = React.createClass({
  getInitialState: function(){
    return { data: []}
  },
  componentDidMount: function(){
    var state = this.state;
    var self = this;
    request.get('http://localhost:9393/items')
      .end(function(err, data){
        state.data = data.body;
        self.setState(state)
      })
  },
  createItem: function(item){
    var state = this.state;
    var self = this;
    request.post('http://localhost:9393/items')
      .send("title=" + item)
      .end(function(err, data){
        console.log(data);
      })
  },
  render: function(){
    return (
      <div>
        <FormComponent onItemSubmit={this.createItem}/>
        <ul>
          {this.state.data.map(function(item, i){
            return(
              <li key={i}>{item.title}</li>
            )
          })}
        </ul>
      </div>
    )
  }
});

ReactDOM.render(
  <MainComponent/>, document.getElementById('container')
)
