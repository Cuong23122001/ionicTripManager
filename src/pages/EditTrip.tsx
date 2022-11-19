import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonPopover, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { IonDatetime } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { Trip } from '../models/Trip';
import { getTripByID, insertTrip } from '../databaseHandler';
import { useParams } from 'react-router';


interface IdParam {
  id: string
}

const EditTrip: React.FC = () => {
  const [name, setName] = useState('')
  const [destination, setDestination] = useState('')
  const [dateTrip, setDateTrip] = useState<string>()
  const [description, setDescription] = useState('')
  const [transportion, setTransportion] = useState('')
  const [people, setPeople] = useState('')
  const [risk, setRisk] = useState('')
  const { id } = useParams<IdParam>()

  const [error, setError] = useState<string>()

  const setDateInput = (e: any) => {
    const dateTime = new Date(e.detail.value)
    setDateTrip(dateTime.toLocaleDateString("en-GB"))
  }

  const fetchDataFromDB = async () => {
    const trip = await getTripByID(Number.parseInt(id)) as Trip
    if (name) {
      setName(name)
    } else {
      setName(trip.name)
    }
    if (destination) {
      setDestination(destination)
    } else {
      setDestination(trip.destination)
    }
    if (dateTrip) {
      setDateTrip(dateTrip)
    } else {
      setDateTrip(trip.dateTrip)
    }
    if (description) {
      setDescription(description)
    } else {
      setDescription(trip.description)
    }
    if (transportion) {
      setTransportion(transportion)
    } else {
      setTransportion(trip.transportion)
    }
    if (people) {
      setPeople(people)
    } else {
      setPeople(trip.people)
    }
    if (risk) {
      setRisk(risk)
    } else {
      setRisk(trip.risk)
    }
  }
  const EditTrip = async () => {
    const newTrip: Trip = {
      'id': Number.parseInt(id),
      'name': name,
      'destination': destination,
      'dateTrip': dateTrip,
      'description': description,
      'transportion': transportion,
      'people': people,
      'risk': risk
    }
    await insertTrip(newTrip);
    alert("Edited successfully!!!")
  }
  useEffect(() => {
    fetchDataFromDB()
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'warning'}>
          <IonButton href={'/DetailTrip/' + id} slot='start' expand='block' className='ion-margin'>Return</IonButton>
          <IonTitle >Detail Trip</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position='floating'>Name: {name}</IonLabel>
          <IonInput onIonChange={e => setName(e.detail.value!)} ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>Destination: {destination}</IonLabel>
          <IonInput onIonChange={e => setDestination(e.detail.value!)} ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>Date: {dateTrip}</IonLabel>
          <IonInput id='date' ></IonInput>
          <IonPopover keepContentsMounted={true} trigger='date' triggerAction='click'>
            <IonContent>
              <IonDatetime onIonChange={e => setDateInput(e)}></IonDatetime>
            </IonContent>
          </IonPopover>
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>Description: {description}</IonLabel>
          <IonInput onIonChange={e => setDescription(e.detail.value!)} ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>Mode of Transportion: {transportion}</IonLabel>
          <IonInput onIonChange={e => setTransportion(e.detail.value!)} ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>Number of People: {people}</IonLabel>
          <IonInput onIonChange={e => setPeople(e.detail.value!)} ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>Risk assessment: {risk}</IonLabel>
          <IonSelect onIonChange={e => setRisk(e.detail.value)}>
            <IonSelectOption value="Yes">Yes</IonSelectOption>
            <IonSelectOption value="No">No</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonGrid>
          <IonRow>
            <IonCol><IonButton href={'/DetailTrip/' + id} onClick={EditTrip} expand='block' className='ion-margin'>Save</IonButton></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EditTrip;
