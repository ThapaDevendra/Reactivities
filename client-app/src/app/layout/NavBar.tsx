import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

export default observer(function NavBar(){
    // const {activityStore} = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' as={NavLink} to='/activities'></Menu.Item>
                <Menu.Item>
                    {/* <Button as={NavLink} to='/createActivity' onClick={() => activityStore.openForm()} positive content='Create Activity' />  */}
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity' /> 
                </Menu.Item>
            </Container>
        </Menu>
    )
})