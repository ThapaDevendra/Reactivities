import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityForm(){

    const {activityStore} = useStore();
    const {selectedActivity, closeForm, createActivity, updateActivity, loading} = activityStore;
    //if selectedactivity is null then any thing to ??(double questionmark) its right will be used as initial state
    //this will either help to edit the object that is open or initalize the property of the Activity
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category:'',
        date:'',
        venue:'',
        city:'',
        description:''
    }

    const[activity, setActivity] = useState(initialState); //initialise the state of the activity object
    

    /*If the id exist we are updating if not we are creating activity*/
    function handleSubmit() {
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    //passing event as a parameter to handleInputChange function, which is a type of event change(ChangeEvent) the we get from React
    //and these types are "HTMLInputElement" and "HTMLTextAreaElement"
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const{name, value} = event.target; //this tracks the name and value of each field through the event meaning it will track whatever is typed into the input box
        setActivity({...activity, [name]: value}) // then we grab above input value to set here, 3 dots helps to spread the initial existing property of the object, 
                                                  //property with the key of [name] should be set to whatever the value is inside the input element
    }

   //using value and name in input field react track as a read only property so we created a function for the onChange event and passed to each input field
    return(
        //clearing helps clear floats like ui button align outside the element
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input placeholder='Date' type='date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
})