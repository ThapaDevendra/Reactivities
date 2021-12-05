import { observer } from "mobx-react-lite";
import { Grid} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { useEffect } from "react";
import ActivityList from "./ActivityList";
import LoadingComponent from "../../../app/layout/LoadingComponent";

// interface Props{
//     activities: Activity[];
//     deleteActivity: (id: string) => void;
//     submitting: boolean;
// }

// export default (function ActivityDashboard({activities, deleteActivity, submitting}: Props){
    export default observer(function ActivityDashboard(){
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;
    // const {selectedActivity, editMode} = activityStore;

    
  useEffect(()=>{
    if(activityRegistry.size <= 1) loadActivities();
   }, [activityRegistry.size, loadActivities])


   if(activityStore.loadingInitial) return <LoadingComponent content='Loading app '/>

    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {/* {selectedActivity && !editMode &&
                <ActivityDetails />}
                {editMode && 
                <ActivityForm />} */}
                <h2>Activity filters</h2>
            </Grid.Column>
        </Grid>
    )
})
/**{editMode && 
    <ActivityForm />}
    this above two lines will help to display the form if we are in edit mode

**/
/*
     {selectedActivity && !editMode &&
    <ActivityDetails />}
    this above two lines will help to display ActivityDetails components if the activity is selected and is not in edit mode
*/