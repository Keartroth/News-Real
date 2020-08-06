namespace NewsReal.Models.CloudmersiveModels
{
    public class CloudmersiveNLPResponse
    {
        public bool? Successful { get; set; }

        public double? SubjectivityScoreResult { get; set; }

        public string SentimentClassificationResult { get; set; }

        public double? SentimentScoreResult { get; set; }

        public int? SentenceCount { get; set; }
    }
}