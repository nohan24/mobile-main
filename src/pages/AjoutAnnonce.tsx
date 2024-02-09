import { IonButton, IonButtons, IonCard, IonCardContent, IonCheckbox, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonInput, IonPage, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { addCircle, camera, duplicate, exit, home} from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import '../assets/details.css';
import { usePhotoGalleri } from '../hooks/usePhotoGalleri';
import PhotoGallery from './PhotoGallery';
import { Link } from 'react-router-dom';
import { logout, ajoutannonce, getMarques, getModeles, getEquipements, getCarburants, getCategories, getTransmissions } from '../services';
import { Item } from '../types/Item';
import { Electrique } from '../types/Electrique';

const AjoutAnnonce: React.FC = () => {
const {photos,takePhoto,deletePhoto} = usePhotoGalleri();

const router = useIonRouter();
const formData = new FormData();

const [disable, setDisable]= useState(false)

const [marques, setMarques] = useState<any>([])
const [transmission, setTransmission] = useState<any>([])
const [carburant, setCarburant] = useState<any>([])
const [categorie, setCategorie]= useState<any>([])
const [modele, setModele] = useState<any>([])
const [equipement, setEquipement] = useState<any>([])

const [carb, setCarb] = useState('');
const [trans, setTrans] = useState('');
const [ma, setMa] = useState('');
const [mo, setMo] = useState('');
const [cat, setCat] = useState('');
const [kil, setKil] = useState<any>('')
const [prix, setPrix] = useState<any>('')
const [place, setPlace] = useState<any>('')
const [eq, setEq] = useState<any>([])
const [puissancef, setPf] = useState<any>('');
const [puissancer, setPr] = useState<any>('');
const [porte, setPorte] = useState<any>('')
const [annee, setAnnee] = useState<any>('')
const [descr, setDescr] = useState<any>('');
const  [capacite, setCapacite] = useState<any>('');

const [titre, setTitre] = useState<any>('');
const  [conso, setConso] = useState<any>('');

useEffect(() => {
    

    getMarques().then((res) => {
      setMarques(res.data);
  })

  getCarburants().then((res) => {
      setCarburant(res.data)
  })

  getTransmissions().then((res) => {
      setTransmission(res.data)
  })

  getCategories().then((res) => {
      setCategorie(res.data)
  })

    getEquipements().then((res) => {
      setEquipement(res.data)
    })
}, [])

function base64ToFile(base64String: any, contentType: any, fileName: any) {
  const base64DataWithoutPrefix = base64String.split(',')[1];
  const byteCharacters = atob(base64DataWithoutPrefix);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  const file = new File([blob], fileName, { type: contentType });

  return file;
}

function ajout(){
   
    if(titre == ""){
      return alert("Titre requis.");
    }
    
    if(place == ""){
      return alert("Nombre de place requis.");
    }

    if(annee == ""){
      return alert("Année de fabrication requis.");
    }

    if(kil == "")return alert("Kilometrage requis.");
    if(porte == "")return alert("Nombre de porte requis.");
    if(puissancef == "")return alert("Puissance fiscale requise.");
    if(puissancer == "")return alert("Puissance réelle requise.");
    if(prix == "")return alert("Prix requis.");

    setDisable(true)

    var detailAnnonce : Item = {
      titre_voiture: titre,
      marque: ma,
      modele: mo,
      categorie: cat,
      transmission: trans,
      kilometrage: parseInt(kil,0),
      carburant: carb,
      places: parseInt(place,10),
      portes: parseInt(porte,10),
      annee_fabrication: parseInt(annee,10),
      equipement: eq,
      puissance_fiscale: parseInt(puissancef,10),
      puissance_reelle: parseInt(puissancer,10),
      description_supplementaire: descr
    }
  
    
    var electrique : Electrique = {
      capacite: capacite != null && capacite != "" ? parseInt(capacite,100) : null,
      consommation: conso != null && conso != "" ? parseInt(conso,100) : null
    }

    if(electrique.capacite != null || electrique.consommation != null){
      formData.set("detailelectrique", JSON.stringify(electrique));
    }
  
    formData.set("prix", prix);
    formData.set("detail", JSON.stringify(detailAnnonce));
    photos.forEach((i, index) => {
        formData.append('images', base64ToFile(i.images, 'image/' + i.format, index+ "." + i.format));
    })    
    
    ajoutannonce(formData).then((res) => {
      alert("Annonce ajouté !");
    }).catch((err) => {
      if(err.response.data.message != undefined && err.response.data.message != null){
        alert(err.response.data.message)
      }else{
        alert(err.response.data)
      }
    }).finally(() => {
      setDisable(false)
    })
}

    return (
        <IonPage>
            <IonHeader>
          <IonToolbar style={{ '--background': '#287aa9' }}>
            <IonTitle style={{ '--color': 'white' }}>Ajouter une annonce</IonTitle>
          </IonToolbar>
        </IonHeader>
        <br />
        <IonContent>    
          
        
<IonCard>

    <IonCardContent>
    
<IonTitle className="ion-text-center" style={{ fontSize: '1.7em',color:'#287aa9' }}>Photos</IonTitle>
            <center>
            <hr className="ligne"></hr>
            </center>
            <br />
    
<IonButton expand='full'  onClick={takePhoto}>
    <IonIcon icon={camera}></IonIcon>
</IonButton>
<PhotoGallery photos={photos} deletePhoto={deletePhoto}/>

</IonCardContent>
<br />
<IonTitle className="ion-text-center" style={{ fontSize: '1.7em',color:'#287aa9' }}>Détails</IonTitle>
            <center>
            <hr className="ligne"></hr>
            </center>
            <br />
    <IonCardContent>
    <IonInput type="text" onIonChange={(e) => {
      setTitre(e.target.value);
    }} label="Titre" required placeholder='ex: Golf V 2.0 TDI' labelPlacement="floating" fill="solid" min={1000}></IonInput>
        <br />
    <IonSelect label="Marques" labelPlacement="floating" fill="solid" onIonChange={(e) => {
        let a = e.target.value;
        let b = a.split('|');
        setMa(b[0])
        getModeles(b[1]).then((res) => {
          setModele(res.data)
        })
    }}>
          {
              marques.map((m: any, i: number) => {
                return(
                  <IonSelectOption key={i} value={m._id+ "|" + m.marque}>{m.marque}</IonSelectOption>
                )
              })
          }
      </IonSelect>
        <br />
        <IonSelect label="Model" onIonChange={(e) => {
          setMo(e.target.value)
        }} labelPlacement="floating" fill="solid" disabled={modele.length > 0 ? false : true}>
        {
          modele.map((m: any, i: number) => {
            return(
              <IonSelectOption key={i} value={m._id}>{m.modele}</IonSelectOption>
            )
          })
        }
    
      </IonSelect>
      <br />
      <IonSelect onIonChange={(e) => {
        setCat(e.target.value)
      }} label="Catégorie" labelPlacement="floating" fill="solid">
        {
          categorie.map((c: any, i: number) => {
            return(
              <IonSelectOption value={c._id} key={i}>{c.categorie}</IonSelectOption>
            )
          })
        }
      </IonSelect>
      <br />
      <IonSelect onIonChange={(e) => {
        setCarb(e.target.value)
      }} label="Carburant" labelPlacement="floating" fill="solid">
        {
          carburant.map((c: any, i: number) => {
            return(
              <IonSelectOption value={c._id} key={i}>{c.carburant}</IonSelectOption>
            )
          })
        }
      </IonSelect>
      <br />
        <IonSelect  onIonChange={(e) => {
        setTrans(e.target.value)
      }} label="Type de transmission" labelPlacement="floating" fill="solid">
        {
          transmission.map((c: any, i: number) => {
            return(
              <IonSelectOption value={c._id} key={i}>{c.transmission}</IonSelectOption>
            )
          })
        }
      </IonSelect>
              
      <br />

      <IonInput required type="number" onIonChange={(e) => {
      setPrix(e.target.value);
    }} label="Prix" labelPlacement="floating" fill="solid" min={1000}></IonInput>
        <br />

        <IonInput required type="number" onIonChange={(e) => {
      setAnnee(e.target.value);
    }} label="Année de sortie" labelPlacement="floating" fill="solid" min={1000}></IonInput>
        <br />

    <IonInput required type="number" onIonChange={(e) => {
      setKil(e.target.value);
    }} label="Kilometrage" labelPlacement="floating" fill="solid" min={0}></IonInput>
        <br />

      <IonInput required onIonChange={(e) => {
        setPf(e.target.value)
      }} type="number" min={1} label="Puisssance fiscale" labelPlacement="floating" fill="solid"></IonInput>
      <br />
      <IonInput required onIonChange={(e) => {
        setPr(e.target.value)
      }} type="number" min={1} label="Puisssance réelle" labelPlacement="floating" fill="solid"></IonInput>
      <br />

      <IonInput type="number"min={1} onIonChange={(e) => {
        setCapacite(e.target.value)
      }} label="Capacité battérie" labelPlacement="floating" fill="solid" ></IonInput>
      <br />

      
      <IonInput type="number"min={1} onIonChange={(e) => {
        setConso(e.target.value)
      }} label="Consommation battérie" labelPlacement="floating" fill="solid" ></IonInput>
      <br />
    
      <IonInput required type="number"min={1} onIonChange={(e) => {
        setPorte(e.target.value)
      }} label="Nombre de portes" labelPlacement="floating" fill="solid" ></IonInput>
      <br />
      <IonInput type="number" onIonChange={(e) => {
        setPlace(e.target.value)
        
      }} min={1} required label="Nombre de places" labelPlacement="floating" fill="solid" ></IonInput>
    </IonCardContent>
    <br />
    <IonTitle className="ion-text-center" style={{ fontSize: '1.7em',color:'#287aa9' }}>Equipements</IonTitle>
            <center>
            <hr className="ligne"></hr>
            </center>
    <br />
            <IonCardContent>
        {
          equipement.map((e:any,i: number) => {
            return(
              <div key={i} >
              <IonCheckbox onIonChange={(e) => {
                e.target.checked ? setEq([...eq, e.target.value]) 
                : setEq(eq?.filter((val:any) => val !== e.target.value))
              }
          
              } labelPlacement="end" value={e._id}>{e.designation}</IonCheckbox>
    <br />
    <br /></div>
            )
          })
        }
    </IonCardContent>
    <br />
    <IonCardContent>
    <IonTitle className="ion-text-center" style={{ fontSize: '1.7em',color:'#287aa9' }}>Déscription supplémentaire</IonTitle>
            <center>
            <hr className="ligne"></hr>
            </center>
    <br />
    <IonTextarea labelPlacement="floating" onIonChange={(e) => {
      setDescr(e.target.value)
    }} fill="solid"></IonTextarea>
    <br />
    <br />
    <IonButton expand="full" color="success" onClick={() => {
        ajout()
    }} disabled={disable}>Enregistre</IonButton>
    </IonCardContent>
    <br />
</IonCard>
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
                 
                }).catch(err => {

                }).finally(() => {
                  localStorage.clear();
                  router.push("/login");
                })
              }}>
                    <IonIcon icon={exit} style={{ fontSize: '30px', color: 'white', marginRight: '25px' }}></IonIcon>
                </IonButtons>
                
              </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default AjoutAnnonce;

