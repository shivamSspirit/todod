import './App.css';
import Form from './components/form/Form';
import Tables from './components/table/Table';
import AppContext from './context/mainContext';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <AppContext>
      <div className="App">
        <Routes>
          <Route path='/' element={<Tables/>}/>
          <Route path='/addtask' element={<Form/>}/>
        </Routes>
      </div>
    </AppContext>
  );
}

export default App;
