using Microsoft.EntityFrameworkCore;
using NewsReal.Data;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using System.Data;
using NewsReal.Utilities;
using NewsReal.Models.ADOModels;
using NewsReal.Models.EFModels;

namespace NewsReal.Repositories
{
    public class SnippetRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly string _connectionString;

        public SnippetRepository(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }

        public List<ADOArticle> GetCurrentUsersSnippets(int id)
        {
            List<ADOArticle> articles = new List<ADOArticle>();
            ADOUserProfile userProfile = new ADOUserProfile();

            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT
                                 a.Id, 
                                 a.UserProfileId, a.Author, a.Published, a.CurrentsId, a.Title, 
                                 a.[Description], a.[Url], a.UserTitle, a.Content, a.CreateDateTime, 
                                 a.[Image], a.[Language], a.Publisher, a.Objectivity, a.Sentimentality,
                                 up.FirebaseUserId, up.FirstName, up.LastName, up.DisplayName, up.CreateDateTime,
                                 up.ImageLocation, up.CreateDateTime, up.Email, ar.ArticleId, ar.ReferenceArticleId 
                            FROM Article a
                            JOIN UserProfile up ON up.Id = a.UserProfileId
                       LEFT JOIN ArticleReference ar ON ar.ReferenceArticleId = a.Id
                           WHERE a.UserProfileId = @id AND ReferenceArticleId IS NULL
                    ";

                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                userProfile.Id = reader.GetInt32(reader.GetOrdinal("UserProfileId"));
                                userProfile.FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId"));
                                userProfile.FirstName = reader.GetString(reader.GetOrdinal("FirstName"));
                                userProfile.LastName = reader.GetString(reader.GetOrdinal("LastName"));
                                userProfile.DisplayName = reader.GetString(reader.GetOrdinal("DisplayName"));
                                userProfile.Email = reader.GetString(reader.GetOrdinal("Email"));
                                userProfile.CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime"));
                                userProfile.ImageLocation = ReaderHelpers.GetNullableString(reader, "ImageLocation");

                                ADOArticle article = new ADOArticle
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                    Author = reader.GetString(reader.GetOrdinal("Author")),
                                    Publisher = reader.GetString(reader.GetOrdinal("Publisher")),
                                    CurrentsId = reader.GetString(reader.GetOrdinal("CurrentsId")),
                                    Title = reader.GetString(reader.GetOrdinal("Title")),
                                    Description = ReaderHelpers.GetNullableString(reader, "Description"),
                                    Url = reader.GetString(reader.GetOrdinal("Url")),
                                    UserTitle = ReaderHelpers.GetNullableString(reader, "UserTitle"),
                                    Content = ReaderHelpers.GetNullableString(reader, "Content"),
                                    CreateDateTime = ReaderHelpers.GetNullableDateTime(reader, "CreateDateTime"),
                                    Image = ReaderHelpers.GetNullableString(reader, "Image"),
                                    Language = ReaderHelpers.GetNullableString(reader, "Language"),
                                    Published = ReaderHelpers.GetNullableDateTime(reader, "Published"),
                                    Objectivity = ReaderHelpers.GetNullableDouble(reader, "Objectivity"),
                                    Sentimentality = ReaderHelpers.GetNullableDouble(reader, "Sentimentality"),
                                    Categories = new List<ADOCategory>(),
                                    ArticleReferences = new List<ADOArticleReference>(),
                                    UserProfile = userProfile,
                                };

                                articles.Add(article);
                            }
                            reader.Close();
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }

            foreach (var article in articles)
            {
                using (SqlConnection conn = Connection)
                {
                    conn.Open();
                    using (SqlCommand cmd = conn.CreateCommand())
                    {   
                        cmd.CommandText = @"
                            SELECT 
                                   ac.Id AS ArticleCategoryId, c.Id AS CategoryId, c.[Name]
                              FROM Article a
                              LEFT JOIN ArticleCategory ac ON ac.ArticleId = a.Id
                              JOIN Category c ON c.Id = ac.CategoryID
                             WHERE a.Id = @id
                        ";

                        cmd.Parameters.AddWithValue("@id", article.Id);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                while (reader.Read())
                                {
                                    ADOCategory category = new ADOCategory
                                    {
                                        Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                        Name = reader.GetString(reader.GetOrdinal("Name")),
                                    };

                                    article.Categories.Add(category);
                                }
                            }
                        }
                    }
                }

                using (SqlConnection conn = Connection)
                {
                    conn.Open();
                    using (SqlCommand cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                                SELECT ar.Id AS ArticleReferenceId,
                                       ar.ReferenceArticleId
                                  FROM ArticleReference ar
                            LEFT JOIN Article a ON ar.ArticleId = a.Id
                                 WHERE a.Id = @id
                        ";

                        cmd.Parameters.AddWithValue("@id", article.Id);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                while (reader.Read())
                                {
                                    ADOArticleReference articleReference = new ADOArticleReference
                                    {
                                        Id = reader.GetInt32(reader.GetOrdinal("ArticleReferenceId")),
                                        ArticleId = article.Id,
                                        ReferenceArticleId = reader.GetInt32(reader.GetOrdinal("ReferenceArticleId")),
                                    };

                                    article.ArticleReferences.Add(articleReference);
                                }
                            }
                        }
                    }
                }

                if (article.ArticleReferences != null)
                {
                    foreach (var articleReference in article.ArticleReferences)
                    {
                        using (SqlConnection conn = Connection)
                        {
                            conn.Open();
                            using (SqlCommand cmd = conn.CreateCommand())
                            {
                                cmd.CommandText = @"
                                        SELECT 
                                               a.Id, a.Author, a.[Image], 
                                               a.Content, a.CreateDateTime, 
                                               a.CurrentsId, a.[Description], 
                                               a.[Language], a.Objectivity, 
                                               a.Publisher, a.Sentimentality, 
                                               a.[Url], a.UserTitle, a.Title, 
                                               a.Published
                                          FROM Article a
                                    RIGHT JOIN ArticleReference ar ON ar.ReferenceArticleId = a.Id
                                         WHERE a.Id = @id
                                ";

                                cmd.Parameters.AddWithValue("@id", articleReference.ReferenceArticleId);

                                using (SqlDataReader reader = cmd.ExecuteReader())
                                {
                                    if (reader.HasRows)
                                    {
                                        while(reader.Read())
                                        {
                                            ADOArticle referenceArticle = new ADOArticle
                                            {
                                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                                UserProfileId = article.UserProfileId,
                                                Author = ReaderHelpers.GetNullableString(reader, "Author"),
                                                Publisher = ReaderHelpers.GetNullableString(reader, "Publisher"),
                                                CurrentsId = ReaderHelpers.GetNullableString(reader, "CurrentsId"),
                                                Title = ReaderHelpers.GetNullableString(reader, "Title"),
                                                Description = ReaderHelpers.GetNullableString(reader, "Description"),
                                                Url = ReaderHelpers.GetNullableString(reader, "Url"),
                                                UserTitle = ReaderHelpers.GetNullableString(reader, "UserTitle"),
                                                Content = ReaderHelpers.GetNullableString(reader, "Content"),
                                                CreateDateTime = ReaderHelpers.GetNullableDateTime(reader, "CreateDateTime"),
                                                Image = ReaderHelpers.GetNullableString(reader, "Image"),
                                                Language = ReaderHelpers.GetNullableString(reader, "Language"),
                                                Published = ReaderHelpers.GetNullableDateTime(reader, "Published"),
                                                Objectivity = ReaderHelpers.GetNullableDouble(reader, "Objectivity"),
                                                Sentimentality = ReaderHelpers.GetNullableDouble(reader, "Sentimentality"),
                                                Categories = new List<ADOCategory>(),
                                                UserProfile = userProfile,
                                            };

                                            articleReference.ReferenceArticle = referenceArticle;
                                        }
                                    }
                                }
                            }
                        }

                        using (SqlConnection conn = Connection)
                        {
                            conn.Open();
                            using (SqlCommand cmd = conn.CreateCommand())
                            {
                                cmd.CommandText = @"
                                    SELECT 
                                           ac.Id AS ArticleCategoryId, c.Id AS CategoryId, c.[Name]
                                      FROM Article a
                                      LEFT JOIN ArticleCategory ac ON ac.ArticleId = a.Id
                                      JOIN Category c ON c.Id = ac.CategoryID
                                     WHERE a.Id = @id
                                ";

                                cmd.Parameters.AddWithValue("@id", articleReference.ReferenceArticle.Id);

                                using (SqlDataReader reader = cmd.ExecuteReader())
                                {
                                    if (reader.HasRows)
                                    {
                                        while (reader.Read())
                                        {
                                            ADOCategory category = new ADOCategory
                                            {
                                                Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                            };

                                            articleReference.ReferenceArticle.Categories.Add(category);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            return articles;
        }

        public ADOArticle GetSnippetById(int id)
        {
            ADOArticle article = new ADOArticle();

            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT
                                 a.Id, 
                                 a.UserProfileId, a.Author, a.Published, a.CurrentsId, a.Title, 
                                 a.[Description], a.[Url], a.UserTitle, a.Content, a.CreateDateTime, 
                                 a.[Image], a.[Language], a.Publisher, a.Objectivity, a.Sentimentality,
                                 up.FirebaseUserId, up.FirstName, up.LastName, up.DisplayName, up.CreateDateTime,
                                 up.ImageLocation, up.CreateDateTime, up.Email, ar.ArticleId, ar.ReferenceArticleId 
                            FROM Article a
                            JOIN UserProfile up ON up.Id = a.UserProfileId
                       LEFT JOIN ArticleReference ar ON ar.ReferenceArticleId = a.Id
                           WHERE a.Id = @id AND ReferenceArticleId IS NULL
                    ";

                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                ADOUserProfile userProfile = new ADOUserProfile()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                    FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                                    Email = reader.GetString(reader.GetOrdinal("Email")),
                                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                                    ImageLocation = ReaderHelpers.GetNullableString(reader, "ImageLocation"),
                                };

                                    article.Id = reader.GetInt32(reader.GetOrdinal("Id"));
                                    article.UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId"));
                                    article.Author = reader.GetString(reader.GetOrdinal("Author"));
                                    article.Publisher = reader.GetString(reader.GetOrdinal("Publisher"));
                                    article.CurrentsId = reader.GetString(reader.GetOrdinal("CurrentsId"));
                                    article.Title = reader.GetString(reader.GetOrdinal("Title"));
                                    article.Description = ReaderHelpers.GetNullableString(reader, "Description");
                                    article.Url = reader.GetString(reader.GetOrdinal("Url"));
                                    article.UserTitle = ReaderHelpers.GetNullableString(reader, "UserTitle");
                                    article.Content = ReaderHelpers.GetNullableString(reader, "Content");
                                    article.CreateDateTime = ReaderHelpers.GetNullableDateTime(reader, "CreateDateTime");
                                    article.Image = ReaderHelpers.GetNullableString(reader, "Image");
                                    article.Language = ReaderHelpers.GetNullableString(reader, "Language");
                                    article.Published = ReaderHelpers.GetNullableDateTime(reader, "Published");
                                    article.Objectivity = ReaderHelpers.GetNullableDouble(reader, "Objectivity");
                                    article.Sentimentality = ReaderHelpers.GetNullableDouble(reader, "Sentimentality");
                                    article.Categories = new List<ADOCategory>();
                                    article.ArticleReferences = new List<ADOArticleReference>();
                                    article.UserProfile = userProfile;
                            }
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }

            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT 
                                   ac.Id AS ArticleCategoryId, c.Id AS CategoryId, c.[Name]
                              FROM Article a
                              LEFT JOIN ArticleCategory ac ON ac.ArticleId = a.Id
                              JOIN Category c ON c.Id = ac.CategoryID
                             WHERE a.Id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", article.Id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                ADOCategory category = new ADOCategory
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                    Name = reader.GetString(reader.GetOrdinal("Name")),
                                };

                                article.Categories.Add(category);
                            }
                        }
                    }
                }
            }

            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT ar.Id AS ArticleReferenceId,
                                  ar.ReferenceArticleId
                             FROM ArticleReference ar
                        LEFT JOIN Article a ON ar.ArticleId = a.Id
                            WHERE a.Id = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", article.Id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                ADOArticleReference articleReference = new ADOArticleReference
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("ArticleReferenceId")),
                                    ArticleId = article.Id,
                                    ReferenceArticleId = reader.GetInt32(reader.GetOrdinal("ReferenceArticleId")),
                                };

                                article.ArticleReferences.Add(articleReference);
                            }
                        }
                    }
                }
            }

            if (article.ArticleReferences != null)
            {
                foreach (var articleReference in article.ArticleReferences)
                {
                    using (SqlConnection conn = Connection)
                    {
                        conn.Open();
                        using (SqlCommand cmd = conn.CreateCommand())
                        {
                            cmd.CommandText = @"
                                        SELECT 
                                               a.Id, a.Author, a.[Image], 
                                               a.Content, a.CreateDateTime, 
                                               a.CurrentsId, a.[Description], 
                                               a.[Language], a.Objectivity, 
                                               a.Publisher, a.Sentimentality, 
                                               a.[Url], a.UserTitle, a.Title, 
                                               a.Published
                                          FROM Article a
                                    RIGHT JOIN ArticleReference ar ON ar.ReferenceArticleId = a.Id
                                         WHERE a.Id = @id
                                ";

                            cmd.Parameters.AddWithValue("@id", articleReference.ReferenceArticleId);

                            using (SqlDataReader reader = cmd.ExecuteReader())
                            {
                                if (reader.HasRows)
                                {
                                    while (reader.Read())
                                    {
                                        ADOArticle referenceArticle = new ADOArticle
                                        {
                                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                            UserProfileId = article.UserProfileId,
                                            Author = ReaderHelpers.GetNullableString(reader, "Author"),
                                            Publisher = ReaderHelpers.GetNullableString(reader, "Publisher"),
                                            CurrentsId = ReaderHelpers.GetNullableString(reader, "CurrentsId"),
                                            Title = ReaderHelpers.GetNullableString(reader, "Title"),
                                            Description = ReaderHelpers.GetNullableString(reader, "Description"),
                                            Url = ReaderHelpers.GetNullableString(reader, "Url"),
                                            UserTitle = ReaderHelpers.GetNullableString(reader, "UserTitle"),
                                            Content = ReaderHelpers.GetNullableString(reader, "Content"),
                                            CreateDateTime = ReaderHelpers.GetNullableDateTime(reader, "CreateDateTime"),
                                            Image = ReaderHelpers.GetNullableString(reader, "Image"),
                                            Language = ReaderHelpers.GetNullableString(reader, "Language"),
                                            Published = ReaderHelpers.GetNullableDateTime(reader, "Published"),
                                            Objectivity = ReaderHelpers.GetNullableDouble(reader, "Objectivity"),
                                            Sentimentality = ReaderHelpers.GetNullableDouble(reader, "Sentimentality"),
                                            Categories = new List<ADOCategory>(),
                                            UserProfile = article.UserProfile,
                                        };

                                        articleReference.ReferenceArticle = referenceArticle;
                                    }
                                }
                            }
                        }
                    }

                    using (SqlConnection conn = Connection)
                    {
                        conn.Open();
                        using (SqlCommand cmd = conn.CreateCommand())
                        {
                            cmd.CommandText = @"
                                    SELECT 
                                           ac.Id AS ArticleCategoryId, c.Id AS CategoryId, c.[Name]
                                      FROM Article a
                                      LEFT JOIN ArticleCategory ac ON ac.ArticleId = a.Id
                                      JOIN Category c ON c.Id = ac.CategoryID
                                     WHERE a.Id = @id
                                ";

                            cmd.Parameters.AddWithValue("@id", articleReference.ReferenceArticle.Id);

                            using (SqlDataReader reader = cmd.ExecuteReader())
                            {
                                if (reader.HasRows)
                                {
                                    while (reader.Read())
                                    {
                                        ADOCategory category = new ADOCategory
                                        {
                                            Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                            Name = reader.GetString(reader.GetOrdinal("Name")),
                                        };

                                        articleReference.ReferenceArticle.Categories.Add(category);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            return article;
        }

        //return _context.Article
        //                    .Include(a => a.UserProfile)
        //                    .Include(a => a.ArticleCategory)
        //                        .ThenInclude(ac => ac.Category)
        //                    .FirstOrDefault(a => a.Id == id);

        public void Add(EFArticle snippet)
        {
            _context.Add(snippet);
            _context.SaveChanges();
        }

        public void Update(EFArticle snippet)
        {
            _context.Entry(snippet).State = EntityState.Modified;
            _context.SaveChanges();
        }

        //public void Delete(int id)
        //{
        //    var snippet = GetSnippetById(id);
        //    var articleCategories = GetArticleCategoriesByArticleId(id);
        //    var articleReferences = GetArticleReferencesByArticleId(id);

        //    if (articleCategories != null)
        //    {
        //        _context.ArticleCategory.RemoveRange(articleCategories);
        //    }

        //    if (articleReferences != null)
        //    {
        //        List<ADOArticle> referenceArticles = new List<ADOArticle>();

        //        foreach (var reference in articleReferences)
        //        {
        //            int referenceArticleId = reference.ReferenceArticleId;
        //            var referenceArticle = GetArticleById(referenceArticleId);
        //            referenceArticles.Add(referenceArticle);
        //        }

        //        _context.ArticleReference.RemoveRange(articleReferences);
        //        _context.Article.RemoveRange(referenceArticles);
        //    }

        //    _context.Article.Remove(snippet);
        //    _context.SaveChanges();
        //}

        //Beginning of ArticleReference methods.
        public void AddArticleReference(EFArticleReference articleReferrence)
        {
            _context.Add(articleReferrence);
            _context.SaveChanges();
        }

        public void DeleteArticleReference(int articleId, int referenceArticleId)
        {
            var articleReferrence = GetArticleReferenceByArticleIdAndReferenceArticleId(articleId, referenceArticleId);
            var referenceArticle = GetArticleById(referenceArticleId);

            _context.ArticleReference.Remove(articleReferrence);

            _context.Article.Remove(referenceArticle);
            _context.SaveChanges();
        }

        //Private methods for returning data.

        private List<EFArticleCategory> GetArticleCategoriesByArticleId(int id)
        {
            return _context.ArticleCategory.Where(ac => ac.ArticleId == id).ToList();
        }

        private List<EFArticleReference> GetArticleReferencesByArticleId(int id)
        {
            return _context.ArticleReference.Where(ac => ac.ArticleId == id).ToList();
        }

        private EFArticle GetArticleById(int id)
        {
            return _context.Article.FirstOrDefault(a => a.Id == id);
        }

        private EFArticleReference GetArticleReferenceByArticleIdAndReferenceArticleId(int articleId, int referenceArticleId)
        {
            return _context.ArticleReference.FirstOrDefault(ar => ar.ArticleId == articleId && ar.ReferenceArticleId == referenceArticleId);
        }
    }
}