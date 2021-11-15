import { observer } from "mobx-react-lite";
import { SyntheticEvent } from "react";
import { useState } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

// interface Props{
//     activities: Activity[];
//     deleteActivity: (id: string) => void;
//     submitting: boolean;

// }

// export default function ActivityList({activities, deleteActivity, submitting}: Props){
export default observer(function ActivityList(){
    const{activityStore} = useStore();
    const{activitiesByDate, deleteActivity,  loading} = activityStore;

    const[target, setTarget] = useState('');  //set the local state
    
    function handleActivityDelete(event: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(event.currentTarget.name);
        deleteActivity(id);
    }
    return(
        //this tag will give us some padding and background color
        //divided helps to put horizontal line after each activity
        //whenever looping through each item in react its gonna duplicated therefore we need to assign a key to prevent that
        //as='a' forms a link, onClick={()=>selectActivity(activity.id)} this will prevent from execution of function when components render
        //but will only executes when button is click
        // In the angle bracket 'divided': creates horizontal line after each activity
        <Segment> 
            <Item.Group divided> 
                {activitiesByDate.map(activity =>(
                    <Item key={activity.id}>  
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={()=>activityStore.selectActivity(activity.id)}floated='right' content='View' color='blue'/> 
                                <Button 
                                    name={activity.id}
                                    loading={loading && target === activity.id} 
                                    onClick={(event)=>handleActivityDelete(event, activity.id)}
                                    floated='right' 
                                    content='Delete' 
                                    color='red'/> 
                                <Button basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})
