import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import {v4 as uuid} from "uuid";

export default class ActivityStore{

    //activities: Activity[] = [];
    activityRegistry = new Map<string, Activity>(); //string is the id type and Activity is the object itself, map takes <key, value> in java script.
    selectedActivity: Activity | undefined = undefined;
    editMode =  false;
    loading = false;
    loadingInitial = true;
    

    constructor(){
        makeAutoObservable(this)
    }


    /* we want to return the activities by date.So what we'll do is we'll say get and then activities by dates.And then inside this method, what we're going to
     do is return the activity sorted by date.So first of all, we want to get an array.So what we're going to do is say return array from and then we can say
     list our activity registry DOT values, which is going to give us all of the activities.And then we can chain on a sort methods.And the sort method is going to take two parameters.
    The activity, A, an activity, b, both the activities we want to compare against each other.So we're passing A comma, B as the parameters here and then inside here what
    we'll do will return the dates don't pass and then will say don't date.Minus dates pass and they must be the date.
    And then all we need to do is set the activities by dates instead of the activities that we're passing
    down. */
    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b) => Date.parse(a.date) - Date.parse(b.date));
    }
    loadActivities = async() =>{
        try{
            const activities = await agent.Activities.list();
            runInAction(() =>{
                activities.forEach(activity =>{
                    activity.date = activity.date.split('T')[0]; //will split on the text, T char and take the first part
                    //this.activities.push(activity);
                    this.activityRegistry.set(activity.id, activity);   //inserting activity id and object itself in activityRegistry array
                })
                this.setLoadingInitital(false);
            })
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.setLoadingInitital(false);
            })
        }
    }

    //MobX Action
    setLoadingInitital = (state: boolean) =>{
        this.loadingInitial = state;
    }

    //MobX Action
    selectActivity = (id: string) =>{
        //this.selectedActivity = this.activities.find(x => x.id === id); //this will return the activity that matches that activity.id
        this.selectedActivity = this.activityRegistry.get(id)           //this will return the activity that matches that activity.id
    }

    //Mobx Action
    cancelSelectedActivity = () =>{
        this.selectedActivity = undefined;
    }

    //MobX Action in the parameter id? question marks represents the optional
    //so this function  takes parameter of id or with no parameter which is optional
    //in line 70 if the id exist then we pass to selectActivity and if not we gonna call cancelSelectedActivity if the detail form was open 
    openForm = (id?: string) =>{
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    //MobX Action
    closeForm = () =>{
        this.editMode = false;
    }

    //MobX Action
    createActivity = async (activity: Activity)=>{
        this.loading = true;
        activity.id = uuid();
        try{
            await agent.Activities.create(activity);
            runInAction(() => {
                //this.activities.push(activity);
                this.activityRegistry.set(activity.id, activity);  /*activity.id is the Key and activity is the value for Map<key, value>*/
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }catch(error){
            console.log(error);
            runInAction(() =>{
                this.loading = false;
            })
        }
    }

     //MobX Action
     updateActivity = async (activity: Activity) =>{
         this.loading = true;
         try{
            await agent.Activities.update(activity);
            runInAction(() => {
                //this.activities = [...this.activities.filter(x => x.id !== activity.id), activity];//spread operator creates new array and replace to old array and is adding new activity as well
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
         }catch(error){
             console.log(error);
             runInAction(() => {
                 this.loading = false;
             })
         }
     }

     deleteActivity = async (id: string) =>{
         this.loading = true;
         try{
            await agent.Activities.delete(id)
            runInAction(()=>{
                //this.activities = [...this.activities.filter(x => x.id !== id)];
                this.activityRegistry.delete(id);
                if(this.selectedActivity?.id === id) this.cancelSelectedActivity(); //we use "?" if in case selectedActivity is undefined
                this.loading = false
            })
         }catch(error){
             console.log(error);
             runInAction(() =>{
                 this.loading = false;
             })
         }
     }
}