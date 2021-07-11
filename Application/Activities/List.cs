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
        public class Query : IRequest<List<Activity>> {}


        //we will pass in first as Query and return list of Activity
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