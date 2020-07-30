using NewsReal.Data;
using NewsReal.Models.EFModels;
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

        public List<EFCategory> GetCategories()
        {
            return _context.Category.OrderBy(c => c.Name).ToList();
        }

        public EFCategory GetCategoryByName(string categoryName)
        {
            return _context.Category.FirstOrDefault(c => c.Name == categoryName);
        }

        public void AddArticleCategory(EFArticleCategory articleCategory)
        {
            _context.Add(articleCategory);
            _context.SaveChanges();
        }
    }
}