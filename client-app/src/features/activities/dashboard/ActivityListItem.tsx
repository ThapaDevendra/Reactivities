import { Link } from "react-router-dom";
import { Button, Icon, Segment } from "semantic-ui-react";
import Item from "semantic-ui-react/dist/commonjs/views/Item";
import { Activity } from "../../../app/models/activity";

interface Props{
    activity: Activity
}

export default function ActivityListitem({activity}: Props) {
      
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png'/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>
                                Hosted By Devendra
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
           <Segment>
               <span>
                   <Icon name='clock'/>{activity.date}
                   <Icon name='marker'/>{activity.venue}
               </span>
           </Segment>
           <Segment secondary>
                Attendees go here
           </Segment>
           <Segment clearing>
               <span>{activity.description}</span>
               <Button 
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color='teal'
                    content='View'
                    floated='right'
               />
           </Segment>
        </Segment.Group>
    )
}