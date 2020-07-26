using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NewsReal.Data;
using NewsReal.Models;
using NewsReal.Repositories;

namespace NewsReal.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryRepository _categoryRepository;
        public CategoryController(ApplicationDbContext context)
        {
            _categoryRepository = new CategoryRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            var categories = _categoryRepository.GetCategories();

            return Ok(categories);
        }
    }
}
