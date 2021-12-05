import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityDetails(){
  const {activityStore} = useStore();
  const {selectedActivity:activity, loadActivity, loadingInitial} = activityStore;

  /**useParams returns an object data=" of key/value pairs of URL parameters.
   * Use it to access match.params of the current <Route>.
   */
  const{id} = useParams(); //gets the id of the object from the navLink parameter
  
  /**we want side effect to occur whenever this particular component is loaded */
  useEffect(()=>{
    if(id) loadActivity(id);
  }, [id, loadActivity]);

    if(loadingInitial || !activity) return <LoadingComponent/>;

    return(
            //fluid helps to take all amount of space inside the grid 
            <Card fluid>
              <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
              <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                  <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                  {activity.description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
               <Button.Group widths='2'>
                  {/* <Button onClick={()=>openForm(activity.id)} basic color='blue' content='Edit'/>  */}
                  <Button as={Link} to={`/manage/${activity.id}`} basic color='blue' content='Edit'/> 
                  {/* <Button onClick={cancelSelectedActivity} basic color='grey' content='Cancel'/> */}
                  <Button as={Link} to='/activities' basic color='grey' content='Cancel'/>
               </Button.Group>
              </Card.Content>
            </Card>
    )
})