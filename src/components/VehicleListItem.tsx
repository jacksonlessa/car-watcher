import {
  IonChip,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote
  } from '@ionic/react';
import { calendar, speedometer } from 'ionicons/icons';
import { Vehicle } from '../data/vehicles';
import './VehicleListItem.css';

interface VehicleListItemProps {
  vehicle: Vehicle;
}

const VehicleListItem: React.FC<VehicleListItemProps> = ({ vehicle }) => {
  return (
    <IonItem routerLink={`/vehicle/${vehicle.id}`} detail={false}>
      <IonLabel className="ion-text-wrap">
        <h2>
          {vehicle.brand} - {vehicle.model} 
          <IonChip color="secondary">
            <IonLabel>{vehicle.type}</IonLabel>
          </IonChip>
          <span className="info">
            <IonNote><IonIcon icon={calendar} color="grey"></IonIcon> {vehicle.year}</IonNote>
            <IonNote><IonIcon icon={speedometer} color="grey"></IonIcon> {vehicle.mileage}</IonNote>
          </span>
        </h2>
      </IonLabel>
    </IonItem>
  );
};

export default VehicleListItem;
