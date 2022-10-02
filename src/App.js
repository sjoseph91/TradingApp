import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { StockDetailPage } from './pages/StockDetailPage';
import {StockOverviewPage} from "./pages/StockOverviewPage"
import {WatchListContextProvider} from "./context/WatchListContext"

function App() {
  return (
    <main className="App container">
      <WatchListContextProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<StockOverviewPage />}/>
            <Route path="/detail/:symbol" element={<StockDetailPage />}/>
          </Routes>
        </HashRouter>
     </WatchListContextProvider >
    </main>
  );
}

export default App;
