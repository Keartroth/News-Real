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
    }
}