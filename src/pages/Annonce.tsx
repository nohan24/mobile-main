import { useState } from 'react';
import '../assets/style.css';
import voitureImage  from '../assets/voiture.jpg';
import { IonContent, IonGrid, IonRow, IonCol, IonTitle, IonIcon, IonButton, IonLabel, useIonRouter } from '@ionic/react';
import { heart, heartOutline} from 'ionicons/icons';
const Annonce = ({data} : any) => {
    const route = useIonRouter();
    function currencyFormat(num: number) {
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    function km(num: number) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
  return (
    <center>
    <div className="conteneur" onClick={() => {
        route.push("/details/" + data.voiture.id)
    }}>
        <div className="nom">
            <h6><IonLabel>{data.detailAnnonce.titre_voiture}</IonLabel></h6>
                    
        </div>
        <div className="info">
            <img src={"https://rest-production-c243.up.railway.app/images/" + data.detailAnnonce.images[0]} />
            <div className="donne">
                <ul>
                <li><IonLabel>{data.detailAnnonce.annee_fabrication}</IonLabel></li>
                <li><IonLabel>{km(data.detailAnnonce.kilometrage)} Km</IonLabel></li>
                <li><IonLabel>{data.detailAnnonce.transmission}</IonLabel></li>
                <li><IonLabel>{data.detailAnnonce.carburant}</IonLabel></li>
                </ul>
            </div>
        </div>
        <br />
        <div className="prix">
            <div>
            <h5><IonLabel>{currencyFormat(data.voiture.prix)} MGA</IonLabel></h5>
            </div>
        </div>
    </div>
    </center>
  );
};
export default Annonce;
