import './App.css';
import FileManager from './parts/FileManager';
import Header from './parts/Header';
import Hello from './parts/Hello';

function App() {
  return (
    <div className="App">

      <Header/>

      <Hello/>

      <FileManager/>

    </div>
  );
}

export default App;
