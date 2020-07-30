using System.ComponentModel.DataAnnotations.Schema;

namespace NewsReal.Models.EFModels
{
    [Table("ArticleReference")]
    public class EFArticleReference
    {
        public int Id { get; set; }

        [Column("ArticleId")]
        [ForeignKey("ArticleId")]
        public int ArticleId { get; set; }

        [Column("ReferenceArticleId")]
        [ForeignKey("ReferenceArticleId")]
        public int ReferenceArticleId { get; set; }

        public EFArticle Article { get; set; }

        public EFArticle ReferenceArticle { get; set; }
    }
}