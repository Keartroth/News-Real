namespace NewsReal.Models.ADOModels
{
    public class ADOArticleReference
    {
        public int Id { get; set; }

        public int ArticleId { get; set; }

        public int ReferenceArticleId { get; set; }

        public ADOArticle ReferenceArticle { get; set; }
    }
}