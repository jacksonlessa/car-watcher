import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import ListVehicles from './pages/ListVehicles/ListVehicles';
import Messages from './pages/Messages';
import ViewMessage from './pages/ViewMessage';
import ViewVehicle from './pages/ViewVehicle';

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

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" exact={true}>
          <Redirect to="/vehicles" />
        </Route>
        <Route path="/vehicles" exact={true}>
          <ListVehicles />
        </Route>
        <Route path="/messages" exact={true}>
          <Messages />
        </Route>
        <Route path="/message/:id">
           <ViewMessage />
        </Route>
        <Route path="/vehicle/:id">
           <ViewVehicle />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
