import React, { useEffect, useState } from 'react';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {

  const[loading, setLoading]= useState(true);
  const[submitting, setSubmitting] = useState(false);

  //used to display the list after loading the page in default
  //in square bracket, first variable will store our state, second variable
  // is the function that we can use to set the state and we use React hook
  //called useState. This generally renders the list of activity.
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(()=>{
    agent.Activities.list().then (response =>{
      let activities: Activity[] = [];
      response.forEach(activity =>{
        activity.date = activity.date.split('T')[0]; //will split on the text, T char and take the first part
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false); //after loading activities we will turn of the loading screen
    })
  }, [])

  //used for "View" button in our dashboard
  //first variable will store our selected activity returned by the second parameter
  //which is the function and pass that selectedActivity to the front end for display
  // using union type to say that our activity can be either the activity itself or undefined
 const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

 //this function will be passed through Activitydashboard to ActivityList so we select activity
 //from the list and initialize selectedActivity and selectedActivity is than passed through ActivityDashboard 
 //to the ActivityDetail to show the details of the selected.
 function handleSelectActivity(id:string) {
   setSelectedActivity(activities.find(x => x.id === id))
 }
  
function handleCancelSelectActivity(){
  setSelectedActivity(undefined)
}

//this is for the "edit" button
const[editMode, setEditMode] = useState(false);

function handleFormOpen(id?: string){
  //if id is not null then we pass into handleSelectActivity, if not then we cancel the Activity details form if in case if open
  id ? handleSelectActivity(id) : handleCancelSelectActivity();
  setEditMode(true);
}

function handleFormClose(){
  setEditMode(false);
}

function handleCreateOrEditActivity(activity: Activity){
  setSubmitting(true);
  if(activity.id){
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(x => x.id !== activity.id), activity])
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    })
  }else{
    activity.id = uuid();
    agent.Activities.create(activity).then(()=> {
    setActivities([...activities, activity])
    setSelectedActivity(activity);
    setEditMode(false);
    setSubmitting(false);  
    })
  }
}

function handleDeletedActity(id: string){     //delete activity from the list
  setSubmitting(true);
  agent.Activities.delete(id).then(()=>{
    setActivities([...activities.filter(x => x.id !== id)])
    setSubmitting(false);
  })
  
}

 if(loading) return <LoadingComponent content='Loading app '/>

  return (
    //using this instead of div, helps prevent unnecessry div ta
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em' }}>
        <ActivityDashboard 
          activities={activities} 
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode ={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeletedActity}
          submitting={submitting}
          />
      </Container>
      </>
  );
}

export default App;
