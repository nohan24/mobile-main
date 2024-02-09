import { IonButton, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import React, { useState } from 'react';
import {logInOutline, chevronForwardOutline} from 'ionicons/icons';
import {login, token} from '../services/index';
import { PushNotifications } from '@capacitor/push-notifications';
import '../assets/login.css'
import { FCM } from "@capacitor-community/fcm";

const Login: React.FC = () => {
    const addListeners = async () => {
        await PushNotifications.addListener('registration', token => {
          localStorage.setItem("token", token.value)
        });

        await PushNotifications.addListener('registrationError', err => {
          console.error('Registration error: ', err.error);
        });

        await PushNotifications.addListener('pushNotificationReceived', notification => {
          console.log('Push notification received: ', notification);
        });

        await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
          console.log('Push notification action performed', notification.actionId, notification.inputValue);
        });
      }

      const registerNotifications = async () => {
        let permStatus = await PushNotifications.checkPermissions();

        if (permStatus.receive === 'prompt') {
          permStatus = await PushNotifications.requestPermissions();
        }

        if (permStatus.receive !== 'granted') {
          throw new Error('User denied permissions!');
        }

        await PushNotifications.register();
      }
    const router = useIonRouter();
    const [error, setError] = useState("");
    const doLogin = (event: any) => {
        event.preventDefault();
        var formData = new FormData(event.target);
        login(formData).then((res) => {
         
            localStorage.setItem("auth",res.data.token);
            registerNotifications()
            addListeners();
            FCM.getToken().then((r) => {
                let formData = new FormData();
                formData.set("token", r.token);
                localStorage.setItem("notif", r.token);
                token(formData, res.data.token);
            }).catch(err => {
                alert(err.response.data.message)
            })
            router.push("/listee");
        }).catch(err => {
            setError(err.response.data.message);
        })
    }
    return (
        <IonPage>
           

            <IonContent className='cont'>
            <div className='header'>
                <h1>Login</h1>
               </div>
               <div className='form'>
                        <form onSubmit={doLogin}>
                            {
                                error != "" ? <p style={{marginBottom: '10px', color:'#f23e3e', fontSize:'16px'}}>{error}</p> : ""
                            }
                        <IonInput className='email' name='email' labelPlacement='floating' label='Email' type='email'></IonInput>
                       

                        <IonInput className='email' name='password' labelPlacement='floating' label='Mot de passe' type='password'></IonInput>
                       
                      
                        <button type='submit' className='button' style={{cursor: 'pointer'}}>
                            Se connecter <IonIcon icon={chevronForwardOutline}></IonIcon>
                        </button>
                  
                        
                            <div className='footer'>
                                <div>Vous n'avez pas de compte? <span style={{cursor: 'pointer'}} onClick={() => { router.push("/register") }}>S'inscrire</span></div>
                            </div>
                  
                        {/* <center>
                            <IonButton  routerLink='/listee' className='ion-margin-top' color={'warning'} type='submit' expand='block'>
                                List
                                <IonIcon icon={personAddOutline} slot='end'></IonIcon>
                            </IonButton>
                        </center> */}

                        </form>
                    </div>
            </IonContent>

        </IonPage>
    );
};

export default Login;