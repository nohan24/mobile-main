import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import {  personAddOutline } from 'ionicons/icons';
import React from 'react';
import { IonRadio, IonRadioGroup } from '@ionic/react';
import '../assets/login.css'
import { register } from '../services';

const Register: React.FC = () => {
    
    const router = useIonRouter();
    const doRegister = (event : any) => {
        event.preventDefault();
        var formData = new FormData(event.target);
        register(formData).then((res) => {
            localStorage.setItem("auth", res.data.token);
            router.push("/listee");
        }).catch((err) => {
            alert(err.response.data);
        })
    }
    return (
        <IonPage>
           
            <IonContent className='cont'>
                <div className='header'>
                    <h1>Inscription</h1>
                </div>
                <div className='form'>
                        <form onSubmit={doRegister}>

                        <IonInput className='email' name='email' labelPlacement='floating' label='Email' type='email'></IonInput>
                    

                        <IonInput className='email'name='password' labelPlacement='floating' label='Mot de passe' type='password'></IonInput>
                   
                            <IonInput className='email' name='date_naissance' labelPlacement='floating' label='Date de naissance' type='date'></IonInput>
                   
                            <IonInput className='email' name='username' labelPlacement='floating' label='Username' type='text'></IonInput>
                      
                   
                            <IonRadioGroup name='genre' style={{display:'flex', gap:'20px'}} value="1">
                                <IonRadio value="1">Homme</IonRadio>
                                <IonRadio value="0">Femme</IonRadio>
                            </IonRadioGroup>
                          
                       
                        <button className='button' type='submit'>
                            S'inscrire
                                <IonIcon icon={personAddOutline} slot='end'></IonIcon>
                            </button>
                            <div className='footer'>
                <div>Vous avez déjà un compte ? <span style={{cursor: 'pointer'}} onClick={() => { router.push("/login"); }}>Se connecter</span></div>
               </div>

                        </form>
                    </div>
            </IonContent>
        </IonPage>
    );
};

export default Register;