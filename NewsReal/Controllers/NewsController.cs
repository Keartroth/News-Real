using Microsoft.AspNetCore.Mvc;
using NewsReal.Data;
using NewsReal.Models;
using NewsReal.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NewsReal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly NewsRepository _newsRepository;
        public NewsController(ApplicationDbContext context)
        {
            _newsRepository = new NewsRepository(context);
        }

        [HttpGet]
        public async Task<ActionResult<List<CurrentsArticle>>> GetNews()
        {
            List<CurrentsArticle> currentsRecentNews = await _newsRepository.GetArticlesAsync();

            return Ok(currentsRecentNews);
        }
    }
}