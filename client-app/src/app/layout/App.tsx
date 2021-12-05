import {  Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import { Route, Routes, useLocation} from 'react-router-dom';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {
 
  //const[submitting, setSubmitting] = useState(false);

  //used to display the list after loading the page in default
  //in square bracket, first variable will store our state, second variable
  // is the function that we can use to set the state and we use React hook
  //called useState. This generally renders the list of activity.
  // const [activities, setActivities] = useState<Activity[]>([]);

  

  //used for "View" button in our dashboard
  //first variable will store our selected activity returned by the second parameter
  //which is the function and pass that selectedActivity to the front end for display
  // using union type to say that our activity can be either the activity itself or undefined

 
 //this function will be passed through Activitydashboard to ActivityList so we select activity
 //from the list and initialize selectedActivity and selectedActivity is than passed through ActivityDashboard 
 //to the ActivityDetail to show the details of the selected.
 //function handleSelectActivity(id:string) {
  // setSelectedActivity(activities.find(x => x.id === id))
 //}
  
//function handleCancelSelectActivity(){
//  setSelectedActivity(undefined)
//}

//this is for the "edit" button

//function handleFormOpen(id?: string){
  //if id is not null then we pass into handleSelectActivity, if not then we cancel the Activity details form if in case if open
 // id ? handleSelectActivity(id) : handleCancelSelectActivity();
//  setEditMode(true);
//}

//function handleFormClose(){
 // setEditMode(false);
//}


// function handleCreateOrEditActivity(activity: Activity){
//   setSubmitting(true);
//   if(activity.id){
//     agent.Activities.update(activity).then(() => {
//       setActivities([...activities.filter(x => x.id !== activity.id), activity])
//       setSelectedActivity(activity);
//       setEditMode(false);
//       setSubmitting(false);
//     })
//   }else{
//     activity.id = uuid();
//     agent.Activities.create(activity).then(()=> {
//     setActivities([...activities, activity])
//     setSelectedActivity(activity);
//     setEditMode(false);
//     setSubmitting(false);  
//     })
//   }
// }

// function handleDeletedActity(id: string){     //delete activity from the list
//   setSubmitting(true);
//   agent.Activities.delete(id).then(()=>{
//     setActivities([...activities.filter(x => x.id !== id)])
//     setSubmitting(false);
//   })
// }

  const location = useLocation();
  //console.log(location.key)
  return (
    //using this instead of div, helps prevent unnecessry div ta
    //path={/(.+)} will match that has path with forward slash and anything after that
    <>
    <Routes>
      <Route key ={location.key} path='/' element={<HomePage/>}/>
      <Route key ={location.key} path='/*' element={
      <>
        <NavBar />
          <Container style={{marginTop: '7em' }}>
            <Routes key={location.key}>
              <Route  key={location.key} path='activities' element={<ActivityDashboard/>}/>
              <Route  key={location.key} path='activities/:id' element={<ActivityDetails/>}/>
              {['/createActivity','/manage/:id'].map((path) =>
                <Route key={location.key} path={path} element={<ActivityForm/>} /> ) } 
                </Routes>
      </Container>
      </>}/>
      </Routes>
      </>
  );
}

export default observer(App);
 
