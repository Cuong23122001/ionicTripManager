import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonPopover, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { IonDatetime } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Trip } from '../models/Trip';
import { useParams } from 'react-router';
import { deleteTripById, getTripByID } from '../databaseHandler';

interface IdParam {
  id: string
}

const DetailTrip: React.FC = () => {
  const [name, setName] = useState('')
  const [destination, setDestination] = useState('')
  const [dateTrip, setDateTrip] = useState<string>()
  const [description, setDescription] = useState('')
  const [transportion, setTransportion] = useState('')
  const [people, setPeople] = useState('')
  const [risk, setRisk] = useState('')
  const { id } = useParams<IdParam>()

  const setDateInput = (e: any) => {
    const dateTime = new Date(e.detail.value)
    setDateTrip(dateTime.toLocaleDateString("en-GB"))
  }

  const deleteHandle = async () => {
    await deleteTripById(Number.parseInt(id))
    alert('Delete done!')
    fetchDataFromDB()
  }
  const fetchDataFromDB = async () => {
    const trip = await getTripByID(Number.parseInt(id)) as Trip
    setName(trip.name)
    setDestination(trip.destination)
    setDateTrip(trip.dateTrip)
    setDescription(trip.description)
    setTransportion(trip.transportion)
    setPeople(trip.people)
    setRisk(trip.risk)
  }
  useEffect(() => {
    fetchDataFromDB()
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'warning'}>
          <IonTitle >Detail Trip</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel >Name: {name}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel >Destination: {destination}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel >Date: {dateTrip}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel >Description: {description}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel >Mode of Transportion: {transportion}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel >Number of People: {people}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel >Risk assessment: {risk}</IonLabel>
        </IonItem>
        <IonGrid>
          <IonRow>
            <IonCol><IonButton href='/ViewAllTrip' expand='block' className='ion-margin'>Return</IonButton></IonCol>
            <IonCol><IonButton href={'/EditTrip/' + id} expand='block' className='ion-margin'>Edit Trip</IonButton></IonCol>
            <IonCol><IonButton href='/ViewAllTrip' onClick={deleteHandle} expand='block' className='ion-margin'>Delete Trip</IonButton></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DetailTrip;
