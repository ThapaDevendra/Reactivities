using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        //this is command type that do not return any thing so we do 
        //not have type parameter of IRequest
        public class Command: IRequest //here we are passing object that we create but not returning
        {
            public Activity Activity { get; set; }  
            
        }
        public class Handler : IRequestHandler<Command> // only one parameter as Command since it is creating and initializing
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);

                await _context.SaveChangesAsync(); 
                
                return Unit.Value; //this is to let API controller the action has comopleted
            }
        }
    }
}