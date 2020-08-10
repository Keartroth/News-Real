using System;
namespace NewsReal.Models.EFModels
{
    public class SearchParameter
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public bool? Primary { get; set; }
        public string Title { get; set; }
        public string Keywords { get; set; }
        public string Language { get; set; }
        public int? StartDate { get; set; }
        public int? EndDate { get; set; }
        public int? Type { get; set; }
        public string Country { get; set; }
        public string Category { get; set; }
        public int? PageNumber { get; set; }
        public string Domain { get; set; }
        public string DomainNot { get; set; }
    }
}