using Microsoft.EntityFrameworkCore;
using NewsReal.Data;
using NewsReal.Models;
using System.Collections.Generic;
using System.Linq;

namespace NewsReal.Repositories
{
    public class SnippetRepository
    {
        private readonly ApplicationDbContext _context;

        public SnippetRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Article> GetCurrentUsersSnippets(int id)
        {
            return _context.Article
                            .Include(a => a.UserProile)
                            .Include(a => a.ArticleCategory)
                                .ThenInclude(ac => ac.Category)
                            .Where(a => a.UserProfileId == id)
                            .OrderByDescending(a => a.CreateDateTime).ToList();
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