using AngleSharp;
using Cloudmersive.APIClient.NETCore.NLP.Api;
using Cloudmersive.APIClient.NETCore.NLP.Model;
using NewsReal.Data;
using NewsReal.Models.CloudmersiveModels;
using NewsReal.Models.CurrentsModels;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Configuration = Cloudmersive.APIClient.NETCore.NLP.Client.Configuration;
using AConfiguration = AngleSharp.Configuration;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;
using System.Net;
using AngleSharp.Dom;
using System.Linq;
using Microsoft.Extensions.Logging.Abstractions;

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

                HttpResponseMessage response = await httpClient.GetAsync("search?" + criteria + "&apiKey=" + CurrentsApiKey);

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

        public async Task<CloudmersiveNLPResponse> CloudmersiveNLPResponseAsync(string type, string url)
        {
            string CloudmersiveApiKey = _config["CloudmersiveApiKey"];

            string scrapeResult = await ScrapeNewsSiteByUrlAsync(url);

            // Configure API key authorization: Apikey
            Configuration.Default.AddApiKey("Apikey", CloudmersiveApiKey); // Get an API key at, https://account.cloudmersive.com/

            var apiInstance = new AnalyticsApi();

            if (type == "sentimentality")
            {
                var input = new SentimentAnalysisRequest(scrapeResult); // SentimentAnalysisRequest | Input sentiment analysis request

                try
                {
                    // Perform Sentiment Analysis and Classification on Text
                    SentimentAnalysisResponse cloudmersiveResult = apiInstance.AnalyticsSentiment(input);

                    CloudmersiveNLPResponse cloudmersiveNLPResponse = new CloudmersiveNLPResponse
                    {
                        Successful = cloudmersiveResult.Successful,
                        SentimentClassificationResult = cloudmersiveResult.SentimentClassificationResult,
                        SentimentScoreResult = cloudmersiveResult.SentimentScoreResult,
                        SentenceCount = cloudmersiveResult.SentenceCount,
                    };

                    return cloudmersiveNLPResponse;
                }
                catch (Exception e)
                {
                    return null;
                }
            }
            else if (type == "subjectivity")
            {
                var input = new SubjectivityAnalysisRequest(scrapeResult); // SentimentAnalysisRequest | Input sentiment analysis request

                try
                {
                    // Perform Subjectivity Analysis and Classification on Text
                    SubjectivityAnalysisResponse cloudmersiveResult = apiInstance.AnalyticsSubjectivity(input);

                    CloudmersiveNLPResponse cloudmersiveNLPResponse = new CloudmersiveNLPResponse
                    {
                        Successful = cloudmersiveResult.Successful,
                        SubjectivityScoreResult = cloudmersiveResult.SubjectivityScoreResult,
                        SentenceCount = cloudmersiveResult.SentenceCount,
                    };

                    return cloudmersiveNLPResponse;
                }
                catch (Exception e)
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        private static async Task<string> ScrapeNewsSiteByUrlAsync(string url)
        {
            var config = AConfiguration.Default.WithDefaultLoader();
            var context = BrowsingContext.New(config);
            var document = await context.OpenAsync(url);

            string pConcat = null;
            var pQuery = document.Body.GetElementsByTagName("p");
            
            string divConcat = null;
            var divQuery = document.Body.GetElementsByTagName("div");

            foreach (var node in pQuery)
            {
                // remove HTML
                foreach (var element in node.QuerySelectorAll("cite, a, b, span, br, strong, em, h1, h2, h3, h4, h5, h6, i"))
                {
                    if (element.HasTextNodes())
                    {
                        element.OuterHtml = element.TextContent;
                    }
                    else
                    {
                        element.Remove();
                    }
                }

                var decodedHtml = WebUtility.HtmlDecode(node.InnerHtml);

                // do something with node.InnerHtml
                if (pQuery.Index(node) == 0)
                {
                    pConcat = decodedHtml;
                }
                else
                {
                    pConcat = pConcat + " " + decodedHtml;
                }
            }

            foreach (var node in divQuery)
            {
                // remove HTML
                foreach (var element in node.QuerySelectorAll("cite, a, b, span, br, strong, em, h1, h2, h3, h4, h5, h6, i"))
                {
                    if (element.HasTextNodes())
                    {
                        element.OuterHtml = element.TextContent;
                    }
                    else
                    {
                        element.Remove();
                    }
                }

                var decodedHtml = WebUtility.HtmlDecode(node.InnerHtml);

                // do something with node.InnerHtml
                if (pQuery.Index(node) == 0)
                {
                    divConcat = decodedHtml;
                }
                else
                {
                    divConcat = divConcat + " " + decodedHtml;
                }
            }

            int? pCount = null;
            int? divCount = null;

            if (pConcat != null)
            {
                pCount = pConcat.Count(p => p == '>' || p == '<');
            }

            if (divConcat != null)
            {
                divCount = divConcat.Count(d => d == '>' || d == '<');
            }

            if (pCount != null && pCount < divCount)
            {
                return pConcat;
            }
            else if (divCount != null)
            {
                return divConcat;
            }
            else
            {
                return null;
            }
        }
    }
}