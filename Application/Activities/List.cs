using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        //IRequest is the MediatR Interface that helps to fetch list of data of type Activity
        //from our API
        public class Query : IRequest<List<Activity>> {} //we not passing anything in parameter, it is returning List of Activity as out Response
        // public record Query() : IRequest<List<Activity>>; this would be if we implemented as a method


        //then we will pass in first as Query that is the list and return list of Activity
        //back to our client side through the handler
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;

            //get access to DataContext to use its property to get access to database
            //Handler is the Constructor that takes in DataContext type as the parameter
            public Handler(DataContext context)
            {
                _context = context;
            }
            //returns List of Activity
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
               return await _context.Activities.ToListAsync();
            }
        }
    }
}