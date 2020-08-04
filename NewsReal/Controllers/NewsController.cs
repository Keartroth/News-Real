using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NewsReal.Data;
using NewsReal.Models.CurrentsModels;
using NewsReal.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NewsReal.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly NewsRepository _newsRepository;
        public NewsController(ApplicationDbContext context, IConfiguration configuration)
        {
            _newsRepository = new NewsRepository(context, configuration);
        }

        [HttpGet]
        public async Task<ActionResult<List<CurrentsArticle>>> GetNews()
        {
            List<CurrentsArticle> currentsRecentNews = await _newsRepository.GetNewsAsync();

            return Ok(currentsRecentNews);
        }

        [HttpGet("searchnews/{searchCriteria}")]
        public async Task<ActionResult<List<CurrentsArticle>>> SearchNews(string searchCriteria)
        {
            List<CurrentsArticle> currentsNewsSearchResults = await _newsRepository.SearchNewsByCriteriaAsync(searchCriteria);

            return Ok(currentsNewsSearchResults);
        }
    }
}