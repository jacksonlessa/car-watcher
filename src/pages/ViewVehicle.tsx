import { useState } from 'react';
import { Vehicle, getVehicle } from '../data/vehicles';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { calendar, car } from 'ionicons/icons';
import { useParams } from 'react-router';
import './ViewVehicle.css';

function ViewVehicle() {
  const [vehicle, setVehicle] = useState<Vehicle>();
  const params = useParams<{ id: string }>();

  useIonViewWillEnter(() => {
    const car = getVehicle(params.id);
    setVehicle(car);
  });

  return (
    <IonPage id="view-vehicle-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Vehicles" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {vehicle ? (
          <>
            <IonItem>
              <IonIcon icon={car} color="secondary"></IonIcon>
              <IonLabel className="ion-text-wrap">
                <h2>
                {vehicle.brand} - {vehicle.model}
                  <span className="date">
                    <IonNote>{vehicle.year}</IonNote>
                  </span>
                </h2>
              </IonLabel>
            </IonItem>

            <div className="ion-padding">
              <ul>
                <li>
                  Abastecimento - <IonIcon icon={calendar} color="secondary"></IonIcon> 09/02/2022
                  <br />
                  15L - R$ 75
                </li>
                <li>
                  Reparo - <IonIcon icon={calendar} color="secondary"></IonIcon> 09/02/2022
                  <br />
                  lanterna traseira - R$ 220
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div>Vehicle not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewVehicle;
