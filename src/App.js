import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './components/navigation/navigation.jsx';
import Footer from './components/footer/footer.jsx';
import Home from './components/pages/home.jsx';
import Game from './components/pages/game.jsx';
import Scores from './components/pages/scores.jsx';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navigation />

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/game" element={<Game/>} />
        <Route path="/scores" element={<Scores/>} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
