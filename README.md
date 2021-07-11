"# Reactivities" 
Building an app with .Net Core and React using VSCode.
This is the training done using Udemy course: "Complete guide to building an app with .Net Core and React".
https://digitalu.udemy.com/course/complete-guide-to-building-an-app-with-net-core-and-react/learn/lecture/24835550#reviews


Architectural Pattern:
This architectural pattern was introduced by Uncle Bob, a guy called Robert Martin, who in 2012 coined the clean architecture.
To implement the flow of control in application.We use a tool called "Mediator". When a request comes to API controller, we're going 
to send something using the media to send method and we can even make a query or send a command via the mediator. The idea of the mediator
is going to send this query or command to a mediator handler and this is going to handle our Use case. And we would send this query via the 
media to send method to our mediator handler that live in our application layer. The media to handle is going to process the logic and it's 
going to return an object to our API controller and our API controller is going to return the object with the HTP response. So that's the idea 
of what we're building.

Domain Project:
Activity.cs contains property for the entity. Database table will contain a table called "Activities.db" and its table will contains columns
with this entity property name.





Persistence Project:
DataContext.cs derives from the DbContex class. It helps create initialize database table with the Domain entity type.



Core:
MappingProfile.cs provides mapping between the databse obj with our Domain class
