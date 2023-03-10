import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Quotes from './components/Quotes';
import Home from './components/Home';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          {/* <Route path='/addQuote' element={<AddQuote />} /> */}

          <Route path='/quotes' element={<Quotes />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
