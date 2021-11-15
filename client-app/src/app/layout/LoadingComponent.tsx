import { Dimmer, Loader } from "semantic-ui-react";

interface Props{
    inverted?: boolean; //this will hold the darker background color
    content?: string; //this will store the string that says "Loading"
}

//we gave default value for inverted and content
export default function LoadingComponent({inverted=true, content = 'Loading...'}: Props){
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content}/>
        </Dimmer>
    )
}