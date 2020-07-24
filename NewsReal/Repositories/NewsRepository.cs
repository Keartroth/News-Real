using NewsReal.Data;
using NewsReal.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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
        private static string currentsBaseUrl = "https://api.currentsapi.services/v1/";

        private static string apiKey = "nrnl2jYQ7yFM4EhxMixvcAQ4ZFub4sRI6yuCNF9qpZPGWmNk";

        public static async Task<string> GetArticles()
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    using (HttpResponseMessage response = await client.GetAsync(currentsBaseUrl))
                    {
                        using (HttpContent content = response.Content)
                        {
                            var data = await content.ReadAsStringAsync();

                            if (data != null)
                            {
                                Console.WriteLine("data------------{0}", JObject.Parse(data)["results"]);
                                return data;
                            }
                            else
                            {
                                Console.WriteLine("NO Data----------");
                                return null;
                            }
                        }
                    }
                }
            }
            catch (Exception exception)
            {
                Console.WriteLine("Exception Hit------------");
                Console.WriteLine(exception);
                return exception.ToString();
            }
        }
    }
}
