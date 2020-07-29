using System.ComponentModel.DataAnnotations.Schema;

namespace NewsReal.Models
{
    public class ArticleReferrence
    {
        public int Id { get; set; }

        [ForeignKey("Id")]
        public int ArticleId { get; set; }

        [ForeignKey("Id")]
        public int ReferenceArticleId { get; set; }

        public Article Article { get; set; }

        public Article ReferenceArticle { get; set; }
    }
}