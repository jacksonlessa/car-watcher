import VehicleListItem from '../../components/VehicleListItem';
import { useEffect, useState } from 'react';
import { Vehicle } from '../../data/vehicles';
import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './ListVehicles.css';
import { add } from 'ionicons/icons';
import {vehicleCollectionRef} from '../../firebase-config';
import { getDocs } from '@firebase/firestore';

const ListVehicles: React.FC = () => {

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const [showModal, setShowModal] = useState(false);

  useIonViewWillEnter(() => {
    // const vehiclesList = getVehicles();
    // setVehicles(vehiclesList);
  });
  useEffect(() => {
    const getFirebaseVehicles = async () => {
      const data = await getDocs(vehicleCollectionRef)
      const list = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setVehicles(list)
    }
    getFirebaseVehicles();
  }, []);

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const [text, setText] = useState('');

  const addTodo = () => {
    // const nextId = todos.reduce((id, todo) => Math.max(id, todo.id!), 0) + 1;
    const vehicle: Vehicle = {
        type: 'car',
        brand: 'Peugeot',
        model: '206',
        mileage: 150000,
        year: 2006,
        plate: 'AAA-0000',
        id: "asadads"
    };
    // setTodos([...todos, todo]);
    setShowModal(false);
    setText('');
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


        <IonFab vertical="bottom" horizontal="end">
          <IonFabButton title="Add Todo" onClick={() => setShowModal(true)}>
            <IonIcon data-icon="add" icon={add} />
          </IonFabButton>
        </IonFab>
        <IonModal
          onDidDismiss={() => setShowModal(false)}
          isOpen={showModal}
        >
          <IonToolbar>
            <IonTitle>Add Todo</IonTitle>
          </IonToolbar>
          <IonContent>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Todo</IonLabel>
                <IonInput id="todo" title="Todo Text" value={text} onIonChange={e => setText(e.detail.value!)} />
              </IonItem>
            </IonList>
            <IonButton expand="block" onClick={addTodo}>
              Save
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default ListVehicles;
