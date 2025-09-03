import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Welcome from './pages/Welcome';
import Events from './pages/Events';
import About from './pages/About';
import JoinUs from './pages/JoinUs';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<About />} />
            <Route path="/join" element={<JoinUs />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;