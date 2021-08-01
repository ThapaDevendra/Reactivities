using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Activity> //returning type is single Activity
        {
            //since we passing id here we have Guid property
            public Guid Id { get; set; }
            
        }

        public class Handler : IRequestHandler<Query, Activity> //query is the type passed in and Activity is the requrn type by the handler
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.FindAsync(request.Id);
            }
        }
    }
}