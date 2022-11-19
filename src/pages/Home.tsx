import { IonAlert, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonPopover, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { IonDatetime } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { Trip } from '../models/Trip';
import { getAllTrip, insertTrip } from '../databaseHandler';


const Home: React.FC = () => {
  const [name, setName] = useState('')
  const [destination, setDestination] = useState('')
  const [dateTrip, setDateTrip] = useState<string>()
  const [description, setDescription] = useState('')
  const [transportion, setTransportion] = useState('')
  const [people, setPeople] = useState('')
  const [risk, setRisk] = useState('')

  const setDateInput = (e: any) => {
    const dateTime = new Date(e.detail.value)
    setDateTrip(dateTime.toLocaleDateString("en-GB"))
  }
  const [error, setError] = useState<string>()


  const SaveDB = async () => {
    if (!name) {
      setError('Please enter name');
      return
    }
    if (!destination) {
      setError('Please enter destinaton');
      return
    }
    if (!dateTrip) {
      setError('Please enter date');
      return
    }
    if (!risk) {
      setError('Please choose risk assessment: Yes or No');
      return
    }

    const newTrip: Trip = {
      'name': name,
      'destination': destination,
      'dateTrip': dateTrip,
      'description': description,
      'transportion': transportion,
      'people': people,
      'risk': risk
    }
    await insertTrip(newTrip);
    alert("Save successfully!!!")
  }
  const clearError = () => {
    setError('')
  }
  return (
    <React.Fragment>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: 'OK', handler: clearError }]}
      />
      <IonPage>
        <IonHeader>
          <IonToolbar color={'warning'}>
            <IonTitle>Manager Trip</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem>
            <IonLabel position='floating'>Name<IonText color="danger">*</IonText></IonLabel>
            <IonInput onIonChange={e => setName(e.detail.value!)} ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>Destination<IonText color="danger">*</IonText></IonLabel>
            <IonInput onIonChange={e => setDestination(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>Date<IonText color="danger">*</IonText></IonLabel>
            <IonInput id='date' value={dateTrip} ></IonInput>
            <IonPopover keepContentsMounted={true} trigger='date' triggerAction='click'>
              <IonContent>
                <IonDatetime onIonChange={e => setDateInput(e)}></IonDatetime>
              </IonContent>
            </IonPopover>
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>Description</IonLabel>
            <IonInput onIonChange={e => setDescription(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>Mode of Transportion</IonLabel>
            <IonInput onIonChange={e => setTransportion(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>Number of People</IonLabel>
            <IonInput onIonChange={e => setPeople(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>Risk assessment<IonText color="danger">*</IonText></IonLabel>
            <IonSelect onIonChange={e => setRisk(e.detail.value)}>
              <IonSelectOption value="Yes">Yes</IonSelectOption>
              <IonSelectOption value="No">No</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton id="popover-button" expand='block' className='ion-margin'>Save</IonButton>
                <IonPopover trigger="popover-button" dismissOnSelect={true} side="top" alignment="center">
                  <IonContent>
                    <IonList>
                      <IonItem type='submit' onClick={SaveDB} button={true} detail={false}>
                        Save
                      </IonItem>
                      <IonItem button={true} detail={false}>
                        Cancel
                      </IonItem>
                    </IonList>
                  </IonContent>
                </IonPopover>
              </IonCol>
              <IonCol><IonButton href='/ViewAllTrip' expand='block' className='ion-margin'>View All Trip</IonButton></IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </React.Fragment>
  );

};

export default Home;
