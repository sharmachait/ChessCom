import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './Pages/Landing.tsx';
import Game from './Pages/Game.tsx';

function App() {
  return (
    <div className="h-screen bg-gray-900">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Landing />}></Route>
          <Route path={'/game'} element={<Game />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
