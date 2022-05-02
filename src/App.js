import './static/css/App.css';
import Container from './components/Container';
import Provider from './context/provider';

function App() {
  return (
    <div className="App">
      <Provider>
        <Container />
      </Provider>
    </div>
  );
}

export default App;
