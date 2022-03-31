import './App.css';
import React from 'react';

class App  extends React.Component {
  constructor(props) {
  super(props);
  // Burada this.setState()'i çağırmayınız!
  this.state ={
    people: []
  };
}

 async componentDidMount() {
    const response = await fetch('/people');
    const body = await response.json();
    this.setState({people: body._embedded.people});
  }
  
render() {
    const {people} = this.state;
    return (
        <div className="App">
          <header className="App-header">
            <div className="App-intro">
              <h2>Clients</h2>
              {people.map(person =>
                  <div key={person.id}>
                    {person.id} {person.firstName} {person.lastName}
                  </div>
              )}
            </div>
          </header>
        </div>
    );
  }
}

export default App;
