using Microsoft.EntityFrameworkCore;
using NewsReal.Data;
using NewsReal.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using System.Data;
using NewsReal.Utilities;
using System.Net;
using System.Runtime.InteropServices.ComTypes;

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

        public List<Article> GetCurrentUsersSnippets(int id)
        {
            List<Article> articles = new List<Article>();

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
                        var testing = reader.Read();
                        if (reader.Read())
                        {
                            UserProfile userProfile = new UserProfile
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

                            while (reader.Read())
                            {
                                Article article = new Article
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
                                    Categories = new List<Category>(),
                                    ArticleReferrences = null,
                                    UserProile = userProfile,
                                };

                                articles.Add(article);
                            }
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
                            var testing2 = reader.Read();
                            if (reader.Read())
                            {
                                while (reader.Read())
                                {
                                    Category category = new Category
                                    {
                                        Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                        Name = reader.GetString(reader.GetOrdinal("Name")),
                                    };

                                    article.Categories.Add(category);
                                }
                            }
                            //else { return null; }
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
                                  FROM Article a
                            RIGHT JOIN ArticleReference ar ON ar.ArticleId = a.Id
                                 WHERE a.Id = @id
                        ";

                        cmd.Parameters.AddWithValue("@id", article.Id);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                while (reader.Read())
                                {
                                    ArticleReference articleReference = new ArticleReference
                                    {
                                        Id = reader.GetInt32(reader.GetOrdinal("ArticleReferenceId")),
                                        ArticleId = article.Id,
                                        ReferenceArticleId = reader.GetInt32(reader.GetOrdinal("ReferenceArticleId")),
                                    };
                                }
                            }
                            //else { return null; }
                        }
                    }
                }

                if (article.ArticleReferrences != null)
                {
                    foreach (var articleReference in article.ArticleReferrences)
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
                                    if (reader.Read())
                                    {
                                        Article referenceArticle = new Article
                                        {
                                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                            UserProfileId = article.UserProfileId,
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
                                        };

                                        articleReference.ReferenceArticle = referenceArticle;
                                    }
                                    //else { return null; }
                                }
                            }
                        }
                    }
                }
                //else { return null; }
            }

            return articles;
        }

        public Article GetSnippetById(int id)
        {
            return _context.Article
                            .Include(a => a.UserProile)
                            .Include(a => a.ArticleCategory)
                                .ThenInclude(ac => ac.Category)
                            .FirstOrDefault(a => a.Id == id);
        }

        public void Add(Article snippet)
        {
            _context.Add(snippet);
            _context.SaveChanges();
        }

        public void Update(Article snippet)
        {
            _context.Entry(snippet).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var snippet = GetSnippetById(id);
            int snippetId = snippet.Id;
            var articleCategories = GetArticleCategoriesByArticleId(snippetId);
            var articleReferences = GetArticleReferencesByArticleId(snippetId);

            if (articleCategories != null)
            {
                _context.ArticleCategory.RemoveRange(articleCategories);
            }

            if (articleReferences != null)
            {
                List<Article> referenceArticles = new List<Article>();

                foreach (var reference in articleReferences)
                {
                    int referenceArticleId = reference.ReferenceArticleId;
                    var referenceArticle = GetArticleById(referenceArticleId);
                    referenceArticles.Add(referenceArticle);
                }

                _context.ArticleReferrence.RemoveRange(articleReferences);
                _context.Article.RemoveRange(referenceArticles);
            }

            _context.Article.Remove(snippet);
            _context.SaveChanges();
        }

        //Beginning of ArticleReference methods.
        public void AddArticleReference(ArticleReference articleReferrence)
        {
            _context.Add(articleReferrence);
            _context.SaveChanges();
        }

        public void DeleteArticleReference(int articleId, int referenceArticleId)
        {
            var articleReferrence = GetArticleReferenceByArticleIdAndReferenceArticleId(articleId, referenceArticleId);
            var referenceArticle = GetArticleById(referenceArticleId);

            _context.ArticleReferrence.Remove(articleReferrence);

            _context.Article.Remove(referenceArticle);
            _context.SaveChanges();
        }

        //Private methods for returning data.

        private List<ArticleCategory> GetArticleCategoriesByArticleId(int id)
        {
            return _context.ArticleCategory.Where(ac => ac.ArticleId == id).ToList();
        }

        private List<ArticleReference> GetArticleReferencesByArticleId(int id)
        {
            return _context.ArticleReferrence.Where(ac => ac.ArticleId == id).ToList();
        }

        private Article GetArticleById(int id)
        {
            return _context.Article.FirstOrDefault(a => a.Id == id);
        }

        private ArticleReference GetArticleReferenceByArticleIdAndReferenceArticleId(int articleId, int referenceArticleId)
        {
            return _context.ArticleReferrence.FirstOrDefault(ar => ar.ArticleId == articleId && ar.ReferenceArticleId == referenceArticleId);
        }
    }
}