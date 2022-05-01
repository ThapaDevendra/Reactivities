//consist of all the request to our API
import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";


//will create a method called sleep, this will take a delay of number as parameter
//then it will resolve a new promise then set the timeout
const sleep = (delay: number) =>{
    return new Promise((resolve) =>{
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';


//when every time we get response from the API
axios.interceptors.response.use(async response =>{
    try{
       await sleep(1000);
       return response;
    }catch(error){
        console.log(error);
        return await Promise.reject(error);
    }
})
//we will pass in the response and we get back from axios that is type "AxiosResponse" and we will just get response.data
const responseBody = <T>(response: AxiosResponse<T>) => response.data;


//create an object that's going to store the common requests we're going to make to ourselves to get the post(new created obj) the 
//puts(update/edit obj) and delete stories inside an object as well.
const requests = {
get:<T> (url: string) => axios.get<T>(url).then(responseBody), 
post:<T> (url: string, body:{}) => axios.post<T>(url, body).then(responseBody), 
put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody), 
del: <T>(url: string) => axios.delete<T>(url).then(responseBody), 

}

const Activities ={
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`), //passing id and return type is the Activity
    create: (activity: Activity) => requests.post<void>(`/activities`, activity),  //passing activity as the body, and void is the return type
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity), //passing id along with the body of activity, and void is the return type
    delete: (id: string) => requests.del<void>(`/activities/${id}`) //passing id along with the body of activity, and void is the return type


}


//create an object of type Activities
const agent ={
    Activities
}

export default agent;