using System.ComponentModel.DataAnnotations.Schema;

namespace NewsReal.Models.EFModels
{
    public class ArticleReference
    {
        public int Id { get; set; }

        public int ArticleId { get; set; }

        public int ReferenceArticleId { get; set; }

        public Article Article { get; set; }

        public Article ReferenceArticle { get; set; }
    }
}