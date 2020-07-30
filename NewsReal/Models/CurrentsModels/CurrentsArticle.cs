using Newtonsoft.Json;
using System.Collections.Generic;

namespace NewsReal.Models.CurrentsModels
{
    public class CurrentsArticle
    {
        [JsonProperty("author")]
        public string Author { get; set; }

        [JsonProperty("category")]
        public List<string> Category { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("id")]
        public string CurrentsId { get; set; }

        [JsonProperty("image")]
        public string Image { get; set; }

        [JsonProperty("language")]
        public string Language { get; set; }

        [JsonProperty("published")]
        public string Published { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }
    }
}
