using Microsoft.EntityFrameworkCore;
using NewsReal.Models.EFModels;

namespace NewsReal.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<EFUserProfile> UserProfile { get; set; }

        public DbSet<EFArticle> Article { get; set; }

        public DbSet<EFCategory> Category { get; set; }

        public DbSet<EFArticleReference> ArticleReference { get; set; }

        public DbSet<EFArticleCategory> ArticleCategory { get; set; }
    }
}