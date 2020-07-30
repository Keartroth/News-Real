using System.ComponentModel.DataAnnotations;

namespace NewsReal.Models.EFModels
{
    public class EFCategory
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}