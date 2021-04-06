import logo from './logo.svg';
import './App.css';

function App() {
  const activityStateChange = () => {
    //this.props.handleTimeTaken(timeTaken)
    let inference = {"value":"value","activity":"activity","activityInference":"activityInference","TimeTaken":"timeTaken","user":"user"}
    console.log("inference",inference);
    fetch('https://34.89.118.144:5005/inference_collect', {
          method: 'POST',
          body: JSON.stringify(inference),
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
      })
      .then(res => res.json())
      .then(data => console.log(data));
 
}
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a href="#" onClick={activityStateChange} class="button btn-default btn-small">Click to hit webservice</a>
      </header>
    </div>
  );
}

export default App;
