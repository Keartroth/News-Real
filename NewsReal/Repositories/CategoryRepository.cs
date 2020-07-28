using NewsReal.Data;
using NewsReal.Models;
using System.Collections.Generic;
using System.Linq;

namespace NewsReal.Repositories
{
    public class CategoryRepository
    {
        private readonly ApplicationDbContext _context;

        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Category> GetCategories()
        {
            return _context.Category.OrderBy(c => c.Name).ToList();
        }

        public Category GetCategoryByName(string categoryName)
        {
            return _context.Category.FirstOrDefault(c => c.Name == categoryName);
        }

        public void AddArticleCategory(ArticleCategory articleCategory)
        {
            _context.Add(articleCategory);
            _context.SaveChanges();
        }
    }
}