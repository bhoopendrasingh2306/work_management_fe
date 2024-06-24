import Nav from './components/Nav.js';
import './App.css';
import {BrowserRouter , Routes, Route} from 'react-router-dom';
import Signup from './components/Signup.js';
import Login from './components/Login.js';
import HomePage from './components/HomePage.js';
import PrivateComponent from './components/PrivateComponents.js';
import Profile from './components/Profile.js';
import ToDo from './components/ToDo.js';
import NotesList from './components/NotesList.js';
import NotesEditor from './components/NotesEditor.js';
import UpdateNotes from './components/UpdateNotes.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>   

        {/* in this route named privatecomponent we will contain all the route which we want to restrict to enter the user if the user is not logged in */}
        <Route element={<PrivateComponent/>}>  
        {/* path of Route must be same as specified in nav.js link to="  " */}
         <Route path='/' element={<HomePage/>}/>
         <Route path='/todo' element={<ToDo/>}/>
         <Route path='/noteslist' element={<NotesList/>}/>
         <Route path='/noteseditor' element={<NotesEditor/>}/>
         <Route path='/updatenotes/:id' element={<UpdateNotes/>}/>
        {/* <Route path='/add' element={<AddProduct/>}/>
        <Route path='/update/:id' element={<UpdateProduct/>}></Route>*/}
        <Route path='/profile/:id' element={<Profile/>}/>  


        </Route>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
