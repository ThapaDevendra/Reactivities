/* These async task are invoked when the Postman API invokes the url
*/


using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
      
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query()); //creating a request object and is pass to Mediator which in turn invokes the correct Handler for the request object
        }

        [HttpGet("{id}")]//passing id of the object
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});//creating a request object and is pass to Mediator which in turn invokes the correct Handler for the request object
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity) //since we are not returning anything we use IActionResult, it returns http request type like OK.
        {
            return Ok(await Mediator.Send(new Create.Command {Activity = activity}));
        }

        //we will update the object of the id passed
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity) //we are adding id to the object before passing to our handler
        {
            activity.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Activity = activity}));
            
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }

    }
}