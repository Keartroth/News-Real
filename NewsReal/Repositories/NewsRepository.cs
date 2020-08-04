using Microsoft.Extensions.Configuration;
using NewsReal.Data;
using NewsReal.Models.CurrentsModels;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace NewsReal.Repositories
{
    public class NewsRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;

        public NewsRepository(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _config = configuration;
        }

        private static string currentsBaseUrl = "https://api.currentsapi.services/v1/";

        public async Task<List<CurrentsArticle>> GetNewsAsync()
        {
            string CurrentsApiKey = _config["CurrentsApiKey"];

            List<CurrentsArticle> articles;
            using (var httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri(currentsBaseUrl);
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await httpClient.GetAsync("latest-news?apiKey=" + CurrentsApiKey);
                
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

        public async Task<List<CurrentsArticle>> SearchNewsByCriteriaAsync(string criteria)
        {
            string CurrentsApiKey = _config["CurrentsApiKey"];

            List<CurrentsArticle> articles;
            using (var httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri(currentsBaseUrl);
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await httpClient.GetAsync("search?apiKey=" + CurrentsApiKey + criteria);

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