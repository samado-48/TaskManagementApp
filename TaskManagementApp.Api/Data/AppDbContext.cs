using Microsoft.EntityFrameworkCore;
using TaskManagementApp.Api.Models;

namespace TaskManagementApp.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext (DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<TaskItem> TaskItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskItem>(
                entity =>
                {
                    entity.HasKey(e => e.Id);
                    entity.Property(e => e.Title)
                        .IsRequired()
                        .HasMaxLength(250);
                }
            );
        }
    }
}
