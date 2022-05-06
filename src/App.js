import './static/css/App.css';
import Container from './components/Container';
import Provider from './context/provider';
import MainProvider from './context/provider';

function App() {
  return (
    <div className="App">

      <MainProvider>
        <Container />
      </MainProvider>

    </div>
  );
}

export default App;
