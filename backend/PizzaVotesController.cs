using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers
{
    // api/[controller] -> api/PizzaVotes
    [Route("api/[controller]")]
    [ApiController]
    public class PizzaVotesController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public PizzaVotesController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET api/pizzavotes
        [HttpGet]
        public async Task<ActionResult<List<PizzaVotes>>> Get()
        {
            return await _dbContext.PizzaVotes.ToListAsync();
        }

        // GET api/pizzavotes/{email}
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<PizzaVotes>> Get(string id)
        {
            return await _dbContext.PizzaVotes.FindAsync(id);
        }

        // POST api/pizzavotes
        [Authorize]
        [HttpPost]
        public async Task Post(PizzaVotes model)
        {
            await _dbContext.AddAsync(model);
            await _dbContext.SaveChangesAsync();
        }

        // PUT api/pizzavotes/{email}
        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, PizzaVotes model)
        {
            var exists = await _dbContext.PizzaVotes.AnyAsync(f => f.Id == id);
            if (!exists)
            {
                return NotFound();
            }

            _dbContext.PizzaVotes.Update(model);

            await _dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}