using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NewsReal.Models.EFModels
{
    [Table("Category")]
    public class EFCategory
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}