"# Reactivities" 
Building an app with .Net Core and React using VSCode.
This is the training done using Udemy course: "Complete guide to building an app with .Net Core and React".
https://digitalu.udemy.com/course/complete-guide-to-building-an-app-with-net-core-and-react/learn/lecture/24835550#reviews

In order to fetch data from our API we use two React hooks:
1. UseState: This allows us to store state in our components
2. UseEffect: allows us to use side effects when a component initializes and our side effects that we're going to use is to go and actually get the data from our API.


Architectural Pattern:
This architectural pattern was introduced by Uncle Bob, a guy called Robert Martin, who in 2012 coined the clean architecture.
To implement the flow of control in application.We use a tool called "Mediator". When a request comes to API controller, we're going 
to send something using the media to send method and we can even make a query or send a command via the mediator. The idea of the mediator
is going to send this query or command to a mediator handler and this is going to handle our Use case. And we would send this query via the 
media to send method to our mediator handler that live in our application layer. The media to handle is going to process the logic and it's 
going to return an object to our API controller and our API controller is going to return the object with the HTP response. So that's the idea 
of what we're building.

We use Entity Framework which provides layer of abstraction to our databasee entities.

Domain Project:
Activity.cs contains property for the entity. Database table will contain a table called "Activities.db" and its table will contains columns
with this entity property name.

We use Entity Framework which provides layer of abstraction to our databasee entities. For this we install "Microsoft.EntityFrameworkCore.SqlServer" NuGet package 
to our "Persistence" project. We have "DataContext.cs" which provides mapping with our database table to our domain "Activity". We run command 
"dotnet ef migrations add InitialCreate -p Persistence -s API" to create migration between database and domain based on the code written.
Here -p refer to project where our "DataContext" is located and -s refer to our startup which is located in the API project.

Startup.cs contains the database injection,

Persistence Project:
DataContext.cs derives from the DbContex class. It helps create initialize database table with the Domain entity type.

Core:
MappingProfile.cs provides mapping between the databse obj with our Domain class

READ App.tsx FILE TO SEE HOW THE ACTIVITIES ARE PASSED TO OTHER .TSX FILE TO RENDER OUR 
CLIENT WEB PAGE.

agent.tsx file will contain all the response to our API through our client side that is React