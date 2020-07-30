using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NewsReal.Models.EFModels
{
    [Table("ArticleCategory")]
    public class EFArticleCategory
    {
        public int Id { get; set; }

        [Column("ArticleId")]
        [ForeignKey("ArticleId")]
        public int ArticleId { get; set; }

        [Column("CategoryId")]
        [ForeignKey("CategoryId")]
        public int CategoryId { get; set; }

        public EFCategory Category { get; set; }
    }
}