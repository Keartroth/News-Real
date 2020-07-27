using Microsoft.EntityFrameworkCore;
using NewsReal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NewsReal.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<UserProfile> UserProfile { get; set; }

        public DbSet<Article> Article { get; set; }

        public DbSet<Category> Category { get; set; }

        public DbSet<ArticleReferrence> ArticleReferrence { get; set; }

        public DbSet<ArticleCategory> ArticleCategories { get; set; }
    }
}