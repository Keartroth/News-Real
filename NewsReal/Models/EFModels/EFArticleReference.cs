using System.ComponentModel.DataAnnotations.Schema;

namespace NewsReal.Models.EFModels
{
    public class EFArticleReference
    {
        public int Id { get; set; }

        [ForeignKey("ArticleId")]
        public int ArticleId { get; set; }

        [ForeignKey("ReferenceArticleId")]
        public int ReferenceArticleId { get; set; }

        public EFArticle Article { get; set; }

        public EFArticle ReferenceArticle { get; set; }
    }
}