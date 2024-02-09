import { useEffect, useState } from "react";
// import { Photo } from "../types/Photo";
import { Photo,Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { isPlatform } from "@ionic/react";
import {Directory, Filesystem} from "@capacitor/filesystem";

import { PhotoItem } from "../types/PhotoItem";


export const usePhotoGalleri = () => {
    const [photos, setPhotos] = useState<PhotoItem[]>([]);


    const takePhoto = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Base64,
            quality: 80
        })
        const fileName = new Date().getTime()+'.'+photo.format+'';
        
        let bb : PhotoItem = {
            format: photo.format,
            images: 'data:image/'+photo.format+';base64,' +  photo.base64String,
            key: fileName
        }
        setPhotos([...photos,bb])
    };

    const deletePhoto = async (fileName: string) => {
        setPhotos(photos.filter((photo) => photo.key !== fileName));
    };

    return{
        photos,
        takePhoto,
        deletePhoto
    }
}