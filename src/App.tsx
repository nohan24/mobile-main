import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Details from './pages/Details';
import Menue from './pages/Menue';
setupIonicReact();

import AuthRoute from './component/AuthRoute';
import AjoutAnnonce from './pages/AjoutAnnonce';


const App: React.FC = () => {
  // useEffect(() => {
  //   registerNotifications()
  //   addListeners();
  //   FCM.getToken()
  // .then((r) => {
  //   localStorage.setItem("token", r.token)
  //   sendToken(r.token).catch((err) => {
  //     alert(err.data)
  //   })
  // })
  // .catch((err) => console.log(err));
  // }, [])
  return(
  <IonApp>
    
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/">
          {
            localStorage.getItem("auth") != null ? <Redirect to="/listee" /> : <Redirect to="/login" />
          }
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <AuthRoute path="/register" children={<Register />}/>

        <Route path="/details/:id">
          <Details />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/listee">
          <Menue />
        </Route>
        <Route exact path="/ajoutAnnonce">
          <AjoutAnnonce />
        </Route>
      
      
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  )
};

export default App;
