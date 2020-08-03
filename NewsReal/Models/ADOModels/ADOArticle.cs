using System;
using System.Collections.Generic;

namespace NewsReal.Models.ADOModels
{
    public class ADOArticle
    {

        public int Id { get; set; }

        public int UserProfileId { get; set; }

        public string Author { get; set; }

        public string Publisher { get; set; }

        public string CurrentsId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Url { get; set; }

        public string UserTitle { get; set; }
        public string Content { get; set; }

        public DateTime? CreateDateTime { get; set; }

        public string Image { get; set; }

        public string Language { get; set; }

        public DateTime? Published { get; set; }

        public double? Objectivity { get; set; }

        public double? Sentimentality { get; set; }

        public ADOUserProfile UserProfile { get; set; }

        public List<ADOCategory> Categories { get; set; }

        public List<ADOArticleReference> ArticleReferences { get; set; }
    }
}