using Newtonsoft.Json;
using System.Collections.Generic;

namespace NewsReal.Models.CurrentsModels
{
    public class CurrentsResponse
    {
        [JsonProperty("status")]
        public string status { get; set; }

        [JsonProperty("news")]
        public List<CurrentsArticle> news { get; set; }

        [JsonProperty("page")]
        public int page { get; set; }
    }
}
