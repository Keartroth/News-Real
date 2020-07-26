using System;

namespace NewsReal.Models
{
    public class CurrentsSearchParameters
    {
        public string language { get; set; }

        public DateTime? start_date { get; set; }

        public DateTime? end_date { get; set; }

        public int type { get; set; }

        public string country { get; set; }

        public string category { get; set; }

        public int page_number {get; set; }

        public string domain { get; set; }

        public string domain_not { get; set; }
    }
}
