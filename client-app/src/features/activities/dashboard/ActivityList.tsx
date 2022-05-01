import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityListitem from "./ActivityListItem";

// interface Props{
//     activities: Activity[];
//     deleteActivity: (id: string) => void;
//     submitting: boolean;

// }

// export default function ActivityList({activities, deleteActivity, submitting}: Props){
export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { groupedActivities, activitiesByDate } = activityStore;

    console.log(activitiesByDate);
    console.log(groupedActivities);
    return (
        <>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    {activities.map(activity => (
                        <ActivityListitem key={activity.id} activity={activity} />
                    ))}
                </Fragment>
            ))}
        </>
        //this tag will give us some padding and background color
        //divided helps to put horizontal line after each activity
        //whenever looping through each item in react its gonna duplicated therefore we need to assign a key to prevent that
        //as='a' forms a link, onClick={()=>selectActivity(activity.id)} this will prevent from execution of function when components render
        //but will only executes when button is click
        // In the angle bracket 'divided': creates horizontal line after each activity

    )
})
