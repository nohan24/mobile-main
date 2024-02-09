import { IonCol, IonFab, IonFabButton, IonGrid, IonIcon, IonRow, useIonAlert } from '@ionic/react';
import { PhotoItem } from "../types/PhotoItem";
import React from 'react';
import { close } from 'ionicons/icons';


type Props = {
    photos: PhotoItem[] ,
    deletePhoto: (fileName: string) => void
}

const PhotoGallery : React.FC<Props> = ({photos, deletePhoto}) => {
    const [displayAlert] = useIonAlert()
    const confirmDelete = (fileName: string) =>
        displayAlert({
            message: 'Supprimer ?',
            buttons: [
                {text: 'Annuler', role: 'cancel'},
                {text: 'Confirmer',role: 'confirm'},
            ],
            onDidDismiss: (e) => {
                if(e.detail.role ==='cancel') return
                deletePhoto(fileName)
            },
        })
        return (
            <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
              <IonGrid>
                <IonRow>
                  {photos.map((photo, idx) => (
                    <IonCol size="6" key={idx} style={{ display: 'inline-block' }}>
                      <IonFab vertical="top" horizontal="end">
                        <IonFabButton
                          onClick={() => confirmDelete(photo.key)}
                          style={{ width: '20px', height: '20px' }}
                          color="light"
                        >
                          <IonIcon icon={close}></IonIcon>
                        </IonFabButton>
                      </IonFab>
                      <div style={{backgroundImage:'url('+ photo.images +')', backgroundSize: 'cover', height: '220px'}}/>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            </div>
          );
}

export default PhotoGallery;