using Microsoft.EntityFrameworkCore;

namespace backend.Models {
  public class ApplicationDbContext : DbContext
  {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    { }

    // Adding 'PizzaVotes' model to db
    public DbSet<PizzaVotes> PizzaVotes { get; set; }
  }
}