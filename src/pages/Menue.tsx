import { useEffect, useState } from 'react';
import { IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonLabel, IonMenu, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonSpinner, IonTitle, IonToolbar, RefresherEventDetail, useIonRouter } from '@ionic/react';
import Annonce from './Annonce';
import { duplicate, exit, home } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { logout, mesannonces } from '../services';
function Menue() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [annonces, setAnnonces] = useState<Array<Object> | any>(null);
  const router = useIonRouter();
  async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    try {
      setIsRefreshing(true);
      setAnnonces(null)
      mesannonces().then((res) => {
        setAnnonces(res.data);
        setIsRefreshing(false);
      }).catch(err => {
        alert(err.response.data.message);
      })
      event.detail.complete();
    } catch (error) {
      console.error(error);
      event.detail.complete();
    } finally {
      setIsRefreshing(false);
    }
  }


  useEffect(() => {
    mesannonces().then((res) => {
      setAnnonces(res.data)
    }).catch((err) => {
      alert(err.response.data);
    })
  }, [])
  
  return (
    <>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar style={{ '--background': '#287aa9' }}>
            <IonTitle style={{ '--color': 'white' }}>Annonce</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
                {
                  annonces == null ? 
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '200px'}}>
                    <IonSpinner style={{ width: '80px' }} name="lines"></IonSpinner> 
                  </div> :
                  annonces.length > 0 ? annonces.map((a : any, i: any) => {
                    return(<Annonce key={i} data={a} />)     
                  }) : "Pas d'annonces."
                }
              
            </IonContent>

            <IonFooter>
            <IonToolbar style={{ '--background': '#287aa9'}}>
                <IonButtons slot="start">        
                    <Link to="/listee">
                      <IonIcon icon={home} style={{ fontSize: '30px', color: 'white',marginLeft : '25px' }}></IonIcon>
                    </Link>
                </IonButtons>
                
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <IonButtons>
                    <Link to="/ajoutAnnonce">
                      <IonIcon icon={duplicate} style={{ fontSize: '30px', color: 'white' }}></IonIcon>
                    </Link>
                  </IonButtons>
                </div>

                
                <IonButtons slot="end" onClick={() => {
                
                logout().then(() => {
                  localStorage.clear();
                }).catch(err => {

                }).finally(() => {
            
                  router.push("/login");
                })
              }}>
                  <IonIcon icon={exit} style={{ fontSize: '30px', color: 'white', marginRight: '25px' }}></IonIcon>
              </IonButtons>
                
              </IonToolbar>
            </IonFooter>

      </IonPage>
    </>
  );
}
export default Menue;