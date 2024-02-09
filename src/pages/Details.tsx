import React, { useState, useEffect } from 'react';
import { IonBackButton, IonButtons, IonIcon, IonButton, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonTitle, IonToolbar, IonAlert, IonSpinner } from '@ionic/react';
import voitureImg from '../assets/voiture.jpg';
import '../assets/details.css';
import 'swiper/swiper-bundle.css';
import { accessibility, car, checkmark, heart, tabletPortrait } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useParams } from 'react-router-dom';
import { detail, vente } from '../services';

const Details: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const {id} = useParams<any>();
  const [isSold, setIsSold] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    detail(id).then((res) => {
      setData(res.data)
      console.log(res.data);
      
    })
  }, [])
  

  const handleButtonClick = () => {
    setShowAlert(true);
  };

  const handleAlertConfirm = () => {
    vente(data.voiture.id);
    data.voiture.etat = 300;
    setData(data)
    setShowAlert(false);
  };

  const handleAlertCancel = () => {
    setShowAlert(false);
  };

  function currencyFormat(num: number) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function km(num: number) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

function etat(){
  if(data.voiture.etat == 300){
      return (
        <div className={`etiquette vendue `}>Vendue</div>
      )
  }if(data.voiture.etat == 200){
    return(
        <div className={`etiquette en-vente`}>En vente</div>
      )
  }if(data.voiture.etat == 100){
    return(
      <div className={`etiquette attente`}>Attente de validation</div>
    )
  }if(data.voiture.etat == 210){
    return(
      <div className={`etiquette refuser`}>Refuser par le site</div>
    )
  }

}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': '#287aa9' }}>
          <IonButtons slot='start'>
            <IonBackButton style={{ '--color': 'white' }} defaultHref='/listee'></IonBackButton>
          </IonButtons>
          <IonTitle style={{ '--color': 'white' }}>Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      {
        data != null ? 
        <IonContent className="ion-padding">

        <Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop
      >
        {
          data.detailAnnonce.images.map((url: string, i: number) => {
            return(
            <SwiperSlide key={i}><IonImg style={{width: '100%',height: '100%'}} src={"https://rest-production-e2d3.up.railway.app/images/" + url} /></SwiperSlide>
            )
          })
        }
       
      </Swiper>
   

        <IonList lines='none'>
          
        
          <IonItem className='item'>
          <IonCardTitle style={{ fontSize: '1.3em',color:'#287aa9' }}>{data.detailAnnonce.titre_voiture}</IonCardTitle>
          </IonItem>
          <IonItem className='item'>
              <IonLabel><b>Marque : </b> {data.detailAnnonce.marque}</IonLabel>  
          </IonItem>
          <IonItem className='item'>
              <IonLabel><b>Modèle : </b> {data.detailAnnonce.modele}</IonLabel>  
          </IonItem>
          <IonItem className='item'>
              <IonLabel><b>Prix : </b> {currencyFormat(data.voiture.prix)} MGA</IonLabel>  
          </IonItem>
        
          <IonItem className='item'>
              <IonLabel><b>Statut : </b>{etat()}</IonLabel>  
          </IonItem>
          <br />

          {data.voiture.etat == 200 && (
          <IonButton expand="full" onClick={handleButtonClick}>Vendre la voiture</IonButton>
          )
        }
          <IonAlert
      isOpen={showAlert}
      onDidDismiss={handleAlertCancel}
      header={'Confirmation'}
      message={'Êtes-vous sûr de vouloir vendre la voiture?'}
      buttons={[
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: handleAlertCancel
        },
        {
          text: 'Oui',
          handler: handleAlertConfirm
        }
      ]}
    />
      </IonList>
  <br />
  <br />
          <IonTitle className="ion-text-center" style={{ fontSize: '1.7em',color:'#287aa9' }}>Détails</IonTitle>
          <center>
          <hr className="ligne"></hr>
          </center>
<br />
          <div className="custom-card">
            <div className="custom-card-header">
              <div className="custom-card-subtitle">
                <div className="side-by-side" style={{ display:'flex', alignItems:'center' }}>
                  <span className="test"><img src='https://artifacts-cdn.autohero.com/retail-sharding/public/assets/mileage-ff5440ca0e6dc8147b543433122f58ca.svg' style={{width: '40px',height: '20px',marginLeft: '-10px'}}></img></span>
                  <span className="info"><IonLabel>Kilometrage</IonLabel></span>
                </div>
                <div className="to-the-right">
                  <span><IonLabel>{km(data.detailAnnonce.kilometrage)} Km</IonLabel></span>
                </div>
              </div>
            </div>
          </div>


          <div className="custom-card">
            <div className="custom-card-header">
              <div className="custom-card-subtitle">
                <div className="side-by-side" style={{ display:'flex', alignItems:'center' }}>
                  <span className="test"><img src='https://artifacts-cdn.autohero.com/retail-sharding/public/assets/fuel-3492c5cbbc8c47a60fc257778f4a9304.svg' style={{width: '40px',height: '20px',marginLeft: '-10px'}}></img></span>
                  <span className="info"><IonLabel>Carburant</IonLabel></span>
                </div>
                <div className="to-the-right">
                  <span><IonLabel>{data.detailAnnonce.carburant}</IonLabel></span>
                </div>
              </div>
            </div>
          </div>

          <div className="custom-card">
            <div className="custom-card-header">
              <div className="custom-card-subtitle">
                <div className="side-by-side" style={{ display:'flex', alignItems:'center' }}>
                  <span className="test"><IonIcon icon={car} style={{width: '40px',height: '20px',marginLeft: '-10px',color:'#F37121'}}></IonIcon></span>
                  <span className="info"><IonLabel>Catégorie</IonLabel></span>
                </div>
                <div className="to-the-right">
                  <span><IonLabel>{data.detailAnnonce.categorie}</IonLabel></span>
                </div>
              </div>
            </div>
          </div>

          <div className="custom-card">
            <div className="custom-card-header">
              <div className="custom-card-subtitle">
              <div className="side-by-side" style={{ display:'flex', alignItems:'center'}}>
                  <span className="test"><img src='https://artifacts-cdn.autohero.com/retail-sharding/public/assets/transmission-b833ce65ae0cbd7d70c164d504d0ce40.svg' style={{width: '40px',height: '20px',marginLeft: '-10px'}}></img></span>
                  <span className="info"><IonLabel>Transmission</IonLabel></span>
                </div>
                <div className="to-the-right">
                  <span><IonLabel>{data.detailAnnonce.transmission}</IonLabel></span>
                </div>
              </div>
            </div>
          </div>


          <div className="custom-card">
            <div className="custom-card-header">
              <div className="custom-card-subtitle">
                <div className="side-by-side">
                  <span className="test"><img src='https://artifacts-cdn.autohero.com/retail-sharding/public/assets/power-596639fde4e38eb7ee84897c86fbb75b.svg' style={{width: '40px',height: '20px',marginLeft: '-10px'}}></img></span>
                  <span className="info"><IonLabel>Puissance fiscale</IonLabel></span>
                </div>
                <div className="to-the-right">
                  <span><IonLabel>{data.detailAnnonce.puissance_fiscale} Cv</IonLabel></span>
                </div>
              </div>
            </div>
          </div>

          <div className="custom-card">
            <div className="custom-card-header">
              <div className="custom-card-subtitle">
                <div className="side-by-side">
                  <span className="test"><img src='https://artifacts-cdn.autohero.com/retail-sharding/public/assets/power-596639fde4e38eb7ee84897c86fbb75b.svg' style={{width: '40px',height: '20px',marginLeft: '-10px'}}></img></span>
                  <span className="info"><IonLabel>Puissance réelle</IonLabel></span>
                </div>
                <div className="to-the-right">
                  <span><IonLabel>{data.detailAnnonce.puissance_reelle} Ch</IonLabel></span>
                </div>
              </div>
            </div>
          </div>

          <div className="custom-card">
            <div className="custom-card-header">
              <div className="custom-card-subtitle">
                <div className="side-by-side">
                  <span className="test"><IonIcon icon={tabletPortrait} style={{width: '40px',height: '20px',marginLeft: '-10px',color:'#F37121'}}></IonIcon></span>
                  <span className="info"><IonLabel>Porte(s)</IonLabel></span>
                </div>
                <div className="to-the-right">
                  <span><IonLabel>{data.detailAnnonce.portes}</IonLabel></span>
                </div>
              </div>
            </div>
          </div>

          <div className="custom-card">
            <div className="custom-card-header">
              <div className="custom-card-subtitle">
                <div className="side-by-side">
                  <span className="test"><IonIcon icon={accessibility} style={{width: '40px',height: '20px',marginLeft: '-10px',color:'#F37121'}}></IonIcon></span>
                  <span className="info"><IonLabel>Place(s)</IonLabel></span>
                </div>
                <div className="to-the-right">
                  <span><IonLabel>{data.detailAnnonce.places}</IonLabel></span>
                </div>
              </div>
            </div>
          </div>

<br />

     
<IonList lines='none'>
          <IonListHeader style={{ fontSize: '1.5em', fontWeight: 'bold', marginBottom: '5px' }}>
              <IonLabel>Equipements</IonLabel>
          </IonListHeader>

          {
            data.detailAnnonce.equipement.map((e: any, i: number) => {
              return(
                <IonItem key={i} className='item'>
                  <IonLabel style={{ display:'flex', gap:'20px' }}><IonIcon color='success' icon={checkmark} /> {e}</IonLabel>  
              </IonItem>
              )
            })
          }
      </IonList>

     {
      data.detailAnnonce.description_supplementaire != '' && data.detailAnnonce.description_supplementaire != null ? 
      <IonList lines='none'>
      <IonListHeader style={{ fontSize: '1.5em', fontWeight: 'bold', marginBottom: '5px' }}>
          <IonLabel>Description supplémentaire</IonLabel>
      </IonListHeader>
      <IonItem>
        <p style={{fontSize: '15px'}}>{data.detailAnnonce.description_supplementaire}</p>
      </IonItem>
    
  </IonList> : 
  ""
     }
<br />
     
          </IonContent> : 
          <IonContent className='ion-padding'>
            <center><IonSpinner name="lines"></IonSpinner></center>
          </IonContent>
      }      
      </IonPage>
  );
};

export default Details;
