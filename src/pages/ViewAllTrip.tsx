import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useEffect, useState } from 'react';
import { Trip } from '../models/Trip';
import { deleteAllTrip, getAllTrip } from '../databaseHandler';


const ViewAllTrip: React.FC = () => {

  const [listTrip, setlistTrip] = useState<Trip[]>([])

  const fetchDataFromDB = async () => {
    const allCus = await getAllTrip()
    setlistTrip(allCus)
  }
  const DeleteAllTrip = async () => {
    await deleteAllTrip()
  }
  useEffect(() => {
    fetchDataFromDB()
  })
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'warning'}>
          <IonButton slot='start' href='/Home' expand='block' className='ion-margin'>Return</IonButton>
          <IonTitle>Show All Trip</IonTitle>
          <IonButton slot='end' href='/Home' onClick={DeleteAllTrip} expand='block' className='ion-margin' color={'danger'}>Delete All Trip</IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {listTrip.map(c =>
            <IonItem key={c.id}>
              <IonLabel>
                <IonRouterLink routerLink={'/DetailTrip/' + c.id}>{c.name} - {c.destination} - {c.dateTrip}</IonRouterLink>
              </IonLabel>
            </IonItem>
          )}
        </IonList>


      </IonContent>
    </IonPage>
  );
};

export default ViewAllTrip;
