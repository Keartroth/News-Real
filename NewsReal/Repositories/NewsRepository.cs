using NewsReal.Data;
using NewsReal.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace NewsReal.Repositories
{
    public class NewsRepository
    {
        private readonly ApplicationDbContext _context;

        public NewsRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        private static string currentsBaseUrl = "https://api.currentsapi.services/v1/";

        private static string apiKey = "KEEP_IT_SECRET_KEEP_IT_SAFE";

        public async Task<List<CurrentsArticle>> GetArticlesAsync()
        {
            List<CurrentsArticle> articles;
            using (var httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri(currentsBaseUrl);
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await httpClient.GetAsync("latest-news?apiKey=" + apiKey);
                
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadAsStringAsync().Result;
                    
                    var currentsResponse = JsonConvert.DeserializeObject<CurrentsResponse>(result);

                    articles = currentsResponse.news;
                    
                    httpClient.Dispose();
                    return articles;
                }
                else
                {
                    httpClient.Dispose();
                    return null;
                }
            }
        }
    }
}