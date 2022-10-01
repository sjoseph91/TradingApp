import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { StockDetailPage } from './pages/StockDetailPage';
import {StockOverviewPage} from "./pages/StockOverviewPage"
import {WatchListContextProvider} from "./context/WatchListContext"

function App() {
  return (
    <main className="App container">
      <WatchListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StockOverviewPage />}/>
            <Route path="/detail/:symbol" element={<StockDetailPage />}/>
          </Routes>
        </BrowserRouter>
     </WatchListContextProvider >
    </main>
  );
}

export default App;
