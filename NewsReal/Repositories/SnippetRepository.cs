using Microsoft.EntityFrameworkCore;
using NewsReal.Data;
using NewsReal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            snippet.CreateDateTime = DateTime.Now;
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
                    var referenceArticle = GetReferenceArticleByArticleReferenceId(referenceArticleId);
                    referenceArticles.Add(referenceArticle);
                }

                _context.ArticleReferrence.RemoveRange(articleReferences);
                _context.Article.RemoveRange(referenceArticles);
            }

            _context.Article.Remove(snippet);
            _context.SaveChanges();
        }

        private List<ArticleCategory> GetArticleCategoriesByArticleId(int id)
        {
            return _context.ArticleCategory.Where(ac => ac.ArticleId == id).ToList();
        }

        private List<ArticleReferrence> GetArticleReferencesByArticleId(int id)
        {
            return _context.ArticleReferrence.Where(ac => ac.ArticleId == id).ToList();
        }

        private Article GetReferenceArticleByArticleReferenceId(int id)
        {
            return _context.Article.FirstOrDefault(a => a.Id == id);
        }
    }
}