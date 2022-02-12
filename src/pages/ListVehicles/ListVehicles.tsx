import VehicleListItem from '../../components/VehicleListItem';
import { useEffect, useState } from 'react';
import { Vehicle, getVehicles } from '../../data/vehicles';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './ListVehicles.css';

const ListVehicles: React.FC = () => {

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useIonViewWillEnter(() => {
    // const vehiclesList = getVehicles();
    // setVehicles(vehiclesList);
  });
  useEffect(() => {
    async function doFetch() {
      const result = await fetch('/assets/vehicles.json');
      const data = await result.json();
      setVehicles(data);
    }
    doFetch();
  }, []);

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Vehicles List</IonTitle>
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
          {vehicles.length === 0? (
            <IonItem>
              <IonLabel className="align-center">
                No vehicles, add your first vehicle!
              </IonLabel>
            </IonItem>
          ) : (
            vehicles.map(v => <VehicleListItem key={v.id} vehicle={v} />)
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ListVehicles;
