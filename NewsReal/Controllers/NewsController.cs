using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NewsReal.Data;
using NewsReal.Repositories;

namespace NewsReal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetNews()
        {
            var currentsRecentNews = NewsRepository.GetArticles();
            if (currentsRecentNews == null)
            {
                return NotFound();
            }
            return Ok(currentsRecentNews);
        }
    }
}
