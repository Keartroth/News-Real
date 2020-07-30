﻿using Microsoft.EntityFrameworkCore;
using NewsReal.Models;
using Newtonsoft.Json;

namespace NewsReal.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<UserProfile> UserProfile { get; set; }

        public DbSet<Article> Article { get; set; }

        public DbSet<Category> Category { get; set; }

        public DbSet<ArticleReference> ArticleReferrence { get; set; }

        public DbSet<ArticleCategory> ArticleCategory { get; set; }
    }
}