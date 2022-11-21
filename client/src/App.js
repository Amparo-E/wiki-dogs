import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import CardDetail from './components/CardDetail/CardDetail';
import DogCreate from './components/DogCreate/DogCreate';
import LandingPage from './components/LandingPage/LandingPage';
import Page404 from './components/Page404/Page404';

function App() {
  return (
    <div className="App">

    <Switch>
      <Route exact path='/' component={LandingPage}/>
      <Route exact path='/home' component={HomePage}/>
      <Route exact path='/create' component={DogCreate}/>
      <Route exact path='/home/:id' component={CardDetail}/>    
      <Route path='*'>
        <Page404/>
      </Route>
    </Switch>

    </div>
  );
}

export default App;
