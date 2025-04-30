import './App.css';
import Login from './components/Login';

function App({clickMethod}) {
  const handleClick=()=>{
      clickMethod(10);
  }
  return (
    <div className="App">
     <button onClick={handleClick}>Register</button>
     <Login/>
    </div>
  );
}

export default App;
