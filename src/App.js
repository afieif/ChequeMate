import './App.css';
import MobileView from './components/MobileView';
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from './context/UserProvider';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
            <MobileView/>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
