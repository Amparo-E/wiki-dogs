import './App.css';
import { Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import CardDetail from './components/CardDetail/CardDetail';
import DogCreate from './components/DogCreate/DogCreate';
import LandingPage from './components/LandingPage/LandingPage';


function App() {
  return (
    <div className="App">

    <Route exact path='/' component={LandingPage}/>
    <Route exact path='/home' component={HomePage}/>
    <Route exact path='/create' component={DogCreate}/>
    <Route exact path='/home/:id' component={CardDetail}/>

    </div>
  );
}

export default App;
