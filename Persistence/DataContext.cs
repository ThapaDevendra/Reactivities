using Microsoft.EntityFrameworkCore;
using Domain;

namespace Persistence
{
    public class DataContext : DbContext
    {
        //constructor
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        //this property is the type "DbSet" and takes "Activity" type parameter. It's property name is "Activities"
        //which is the database table name.
        public DbSet<Activity> Activities { get; set; }
    }
}