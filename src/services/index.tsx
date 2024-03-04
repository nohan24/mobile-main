import axiosInstance from './AxiosInstance'

export function login(formData: FormData){
    return axiosInstance.post("https://rest-production-c243.up.railway.app/auth/login", formData);
}

export function register(formData: FormData){
    return axiosInstance.post("https://rest-production-c243.up.railway.app/auth/register", formData);
}

export function token(token: FormData, auth : string){
    return axiosInstance.post("https://rest-production-c243.up.railway.app/token", token, {
        headers: {"Authorization" : `Bearer ${auth}`}
    });
}

export function mesannonces(){
    let auth = localStorage.getItem("auth");
    return axiosInstance.get("https://rest-production-c243.up.railway.app/user/annonces", {
        headers: {"Authorization" : `Bearer ${auth}`}
    });
}

export function detail(id: number){
    let auth = localStorage.getItem("auth");
    return axiosInstance.get("https://rest-production-c243.up.railway.app/annonces/" + id, {
        headers: {"Authorization" : `Bearer ${auth}`}
    });
}

export function vente(id: number){
    let auth = localStorage.getItem("auth");
    return axiosInstance.put("https://rest-production-c243.up.railway.app/annonces/"+id+"/vendu", null, {
        headers: {"Authorization" : `Bearer ${auth}`}
    });
}


export async function getMarques(){
    return axiosInstance.get("https://rest-production-c243.up.railway.app/marques");
}

export async function getCategories(){
    return axiosInstance.get("https://rest-production-c243.up.railway.app/categories");
}

export async function getCarburants(){
    return axiosInstance.get("https://rest-production-c243.up.railway.app/carburants");
}

export async function getTransmissions(){
    return axiosInstance.get("https://rest-production-c243.up.railway.app/transmissions");
}

export async function getModeles(modele: string){
    return axiosInstance.get("https://rest-production-c243.up.railway.app/modeles/marques/" + modele);
}

export async function getEquipements(){
    return axiosInstance.get("https://rest-production-c243.up.railway.app/equipements");
}

export function ajoutannonce(formdata: FormData){
    let auth = localStorage.getItem("auth");
    return axiosInstance.post("https://rest-production-c243.up.railway.app/annonces", formdata, {
        headers: {
            "Authorization" : `Bearer ${auth}`,
            'Content-Type': 'multipart/form-data',
        },
    });
}

export function logout(){
    let auth = localStorage.getItem("auth");
    let notif = localStorage.getItem("notif");
    return axiosInstance.delete("https://rest-production-c243.up.railway.app/token/" + notif, {
        headers: {
            "Authorization" : `Bearer ${auth}`
        }
    });
}