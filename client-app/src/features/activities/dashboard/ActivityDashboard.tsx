import { observer } from "mobx-react-lite";
import { Grid} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

// interface Props{
//     activities: Activity[];
//     deleteActivity: (id: string) => void;
//     submitting: boolean;
// }

// export default (function ActivityDashboard({activities, deleteActivity, submitting}: Props){
    export default observer(function ActivityDashboard(){
    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;

    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails />}
                {editMode && 
                <ActivityForm />}
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