import VehicleListItem from '../components/VehicleListItem';
import { useState } from 'react';
import { Vehicle, getVehicles } from '../data/vehicles';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useIonViewWillEnter(() => {
    const vehiclesList = getVehicles();
    setVehicles(vehiclesList);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Vehicles</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Vehicles
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {vehicles.map(v => <VehicleListItem key={v.id} vehicle={v} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
