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
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './ListVehicles.css';
import { add } from 'ionicons/icons';
import {vehicleCollectionRef} from '../../firebase-config';
import { getDocs, addDoc } from '@firebase/firestore';

const ListVehicles: React.FC = () => {

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const [showModal, setShowModal] = useState(false);
  

  const [type, setType] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [mileage, setMileage] = useState<number>(0);
  const [year, setYear] = useState<number>(2022);
  const [plate, setPlate] = useState<string>('');



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


  const createVehicle = async () => {
    // const nextId = todos.reduce((id, todo) => Math.max(id, todo.id!), 0) + 1;
    const vehicle: Vehicle = {
        type: type,
        brand: brand,
        model: model,
        mileage: mileage,
        year: year,
        plate: plate,
    };
    await addDoc(vehicleCollectionRef, vehicle)
    // setTodos([...todos, todo]);
    setShowModal(false);
    setType("")
    setBrand("")
    setModel("")
    setMileage(0)
    setYear(2022)
    setPlate("")
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
          <IonFabButton title="Add Vehicle" onClick={() => setShowModal(true)}>
            <IonIcon data-icon="add" icon={add} />
          </IonFabButton>
        </IonFab>
        <IonModal
          onDidDismiss={() => setShowModal(false)}
          isOpen={showModal}
        >
          <IonToolbar>
            <IonTitle>Add Vehicle</IonTitle>
          </IonToolbar>
          <IonContent>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Type</IonLabel>
                <IonSelect value={type} placeholder="Select One" onIonChange={e => setType(e.detail.value)}>
                  <IonSelectOption value="car">Car</IonSelectOption>
                  <IonSelectOption value="motorcycle">Motorcycle</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonList>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Brand</IonLabel>
                <IonInput title="Brand" value={brand} onIonChange={e => setBrand(e.detail.value!)} />
              </IonItem>
            </IonList>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Model</IonLabel>
                <IonInput title="Model" value={model} onIonChange={e => setModel(e.detail.value!)} />
              </IonItem>
            </IonList>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Mileage</IonLabel>
                <IonInput type="number" title="Mileage" value={mileage} onIonChange={e => setMileage(parseInt(e.detail.value!, 10))} />
              </IonItem>
            </IonList>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Year</IonLabel>
                <IonInput type="number" title="Year" value={year} onIonChange={e => setYear(parseInt(e.detail.value!, 10))} max="2030"/>
              </IonItem>
            </IonList>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Plate</IonLabel>
                <IonInput title="Plate" value={plate} onIonChange={e => setPlate(e.detail.value!)} />
              </IonItem>
            </IonList>
            <IonButton expand="block" onClick={createVehicle}>
              Save
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default ListVehicles;
