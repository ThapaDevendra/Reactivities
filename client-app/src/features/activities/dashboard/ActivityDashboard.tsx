import React from "react";
import { Grid} from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props{
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void; //this function do not return so its return is set to void, and takes in id as string
    cancelSelectActivity: () => void; //this function also do not return anything, make sure function return type is defined in interface
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void; //takes activity of type Activity
    deleteActivity: (id: string) => void;
    submitting: boolean;
}
export default function ActivityDashboard({activities, selectedActivity, selectActivity, cancelSelectActivity,
                                            editMode, openForm, closeForm, createOrEdit, deleteActivity, submitting}: Props){
    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList 
                    activities={activities}
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails 
                                activity={selectedActivity}
                                cancelSelectActivity={cancelSelectActivity}
                                openForm={openForm}
                />}
                {editMode && 
                <ActivityForm 
                    closeForm={closeForm}
                    activity={selectedActivity}
                    createOrEdit={createOrEdit}
                    submitting={submitting}/>}
            </Grid.Column>
        </Grid>
    )
}