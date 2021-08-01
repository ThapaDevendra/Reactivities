Eg: <Grid.Column width='6'>
                {activities[0] && 
                <ActivityDetails activity={activities[0]}/>}
Above eg in ActivityDashboard.tsx line:17, it means anything to the right is executed
unless its left assign value is not null.