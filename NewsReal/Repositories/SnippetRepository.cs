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
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT a.Id, a.UserProfileId, a.Author, a.Publisher, 
                               a.CurrentsId, a.Title, a.[Description], a.[Url], 
                               a.UserTitle, a.Content, a.CreateDateTime, a.[Image], 
                               a.[Language], a.Published, a.Objectivity, a.Sentimentality, 
                               u.Id AS UserId, u.CreateDateTime AS UserCreateDateTime, u.DisplayName, 
                               u.Email, u.FirebaseUserId, u.FirstName, u.ImageLocation, u.LastName, 
                               ac.Id AS ArticleCategoryId, c.Id AS CategoryId, c.[Name], ra.Id AS ReferenceArticleId,
                               ar.Id AS ArticleReferenceId, ra.Author AS ReferenceArticleAuthor, ra.[Image] AS ReferenceArticleImage, 
                               ra.Content AS ReferenceArticleContent, ra.CreateDateTime AS ReferenceArticleCreateDateTime, 
                               ra.CurrentsId AS ReferenceArticleCurrentsId, ra.[Description] AS ReferenceArticleDescription, 
                               ra.[Language] AS ReferenceArticleLanguage, ra.Objectivity AS ReferenceArticleObjectivity, 
                               ra.Publisher AS ReferenceArticlePublisher, ra.Sentimentality AS ReferenceArticleSentimentality, 
                               ra.[Url] AS ReferenceArticleUrl, ra.UserTitle AS ReferenceArticleUserTitle, ra.Title AS ReferenceArticleTitle, 
                               ra.Published AS ReferenceArticlePublished
                          FROM Article a
                          JOIN UserProfile u ON u.Id = a.UserProfileId
                          LEFT JOIN ArticleCategory ac ON ac.ArticleId = a.Id
                          JOIN Category c ON c.Id = ac.CategoryID
                          LEFT JOIN ArticleReferrence ar ON ar.ArticleId = a.Id
                          LEFT JOIN Article ra ON ra.Id = ar.ReferenceArticleId
                         WHERE u.Id = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        List<Article> articles = new List<Article>();

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
                                Description = reader.GetString(reader.GetOrdinal("Description")),
                                Url = reader.GetString(reader.GetOrdinal("Url")),
                                UserTitle = ReaderHelpers.GetNullableString(reader, "UserTitle"),
                                Content = ReaderHelpers.GetNullableString(reader, "Content"),
                                CreateDateTime = ReaderHelpers.GetNullableDateTime(reader, "CreateDateTime"),
                                Image = ReaderHelpers.GetNullableString(reader, "Image"),
                                Language = ReaderHelpers.GetNullableString(reader, "Language"),
                                Published = ReaderHelpers.GetNullableDateTime(reader, "Published"),
                                Objectivity = ReaderHelpers.GetNullableDouble(reader, "Objectivity"),
                                Sentimentality = ReaderHelpers.GetNullableDouble(reader, "Sentimentality"),
                                UserProile = userProfile,
                            };

                            if (ReaderHelpers.GetNullableString(reader, "ArticleReferenceReferenceId") == null)
                            {
                                articles.Add(article);
                            }
                        }

                        foreach (var article in articles)
                        {
                            reader.Close();

                            cmd.CommandText = @"
                            SELECT a.Id, a.UserProfileId, a.Author, a.Publisher, 
                                   a.CurrentsId, a.Title, a.[Description], a.[Url], 
                                   a.UserTitle, a.Content, a.CreateDateTime, a.[Image], 
                                   a.[Language], a.Published, a.Objectivity, a.Sentimentality, 
                                   ac.Id AS ArticleCategoryId, c.Id AS CategoryId, c.[Name], ra.Id AS ReferenceArticleId,
                                   ar.Id AS ArticleReferenceId, ra.Author AS ReferenceArticleAuthor, ra.[Image] AS ReferenceArticleImage, 
                                   ra.Content AS ReferenceArticleContent, ra.CreateDateTime AS ReferenceArticleCreateDateTime, 
                                   ra.CurrentsId AS ReferenceArticleCurrentsId, ra.[Description] AS ReferenceArticleDescription, 
                                   ra.[Language] AS ReferenceArticleLanguage, ra.Objectivity AS ReferenceArticleObjectivity, 
                                   ra.Publisher AS ReferenceArticlePublisher, ra.Sentimentality AS ReferenceArticleSentimentality, 
                                   ra.[Url] AS ReferenceArticleUrl, ra.UserTitle AS ReferenceArticleUserTitle, ra.Title AS ReferenceArticleTitle, 
                                   ra.Published AS ReferenceArticlePublished
                              FROM Article a
                              LEFT JOIN ArticleCategory ac ON ac.ArticleId = a.Id
                              JOIN Category c ON c.Id = ac.CategoryID
                             WHERE u.Id = @id AND a.id =article.id
                            ";

                            cmd.Parameters.AddWithValue("@id", id);
                            cmd.Parameters.AddWithValue("@id", id);

                            SqlDataReader categoryReader = cmd.ExecuteReader();
                        }


                        return articles;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
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
        public void AddArticleReference(ArticleReferrence articleReferrence)
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

        private List<ArticleReferrence> GetArticleReferencesByArticleId(int id)
        {
            return _context.ArticleReferrence.Where(ac => ac.ArticleId == id).ToList();
        }

        private Article GetArticleById(int id)
        {
            return _context.Article.FirstOrDefault(a => a.Id == id);
        }

        private ArticleReferrence GetArticleReferenceByArticleIdAndReferenceArticleId(int articleId, int referenceArticleId)
        {
            return _context.ArticleReferrence.FirstOrDefault(ar => ar.ArticleId == articleId && ar.ReferenceArticleId == referenceArticleId);
        }
    }
}