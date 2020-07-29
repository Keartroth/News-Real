using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NewsReal.Models
{
    public class ArticleReferrence
    {
        public int Id { get; set; }

        public int ArticleId { get; set; }

        public int ReferenceArticleId { get; set; }

        public Article Article { get; set; }

        public Article ReferenceArticle { get; set; }
    }
}