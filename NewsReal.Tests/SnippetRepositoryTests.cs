using NewsReal.Models;
using NewsReal.Repositories;
using System;
using Xunit;

namespace NewsReal.Tests
{
    public class SnippetRepositoryTests : EFTestFixture
    {
        public SnippetRepositoryTests()
        {
            AddSampleData();
        }

        // Add sample data
        private void AddSampleData()
        {
            var user1 = new UserProfile()
            {
                DisplayName = "jlaw21",
                FirstName = "Cindy",
                LastName = "Stone",
                Email = "cinstone@gmail.com",
                CreateDateTime = DateTime.Now - TimeSpan.FromDays(150),
                FirebaseUserId = "TEST_FIREBASE_UID_2",
                ImageLocation = null,
            };

            var user2 = new UserProfile()
            {
                DisplayName = "jlaw21",
                FirstName = "Jonny",
                LastName = "Law",
                Email = "jonny@gmail.com",
                CreateDateTime = DateTime.Now - TimeSpan.FromDays(400),
                FirebaseUserId = "TEST_FIREBASE_UID_2",
                ImageLocation = null,
            };

            var article1 = new Article()
            {
                UserProfileId = 1,
                Author = "@rogervincent",
                Publisher = "latimes",
                CurrentsId = "553abec9-6f64-4787-8244-46788b4d195c",
                Title = "Motels are having a moment. It's a coronavirus thing",
                Description = "Motels, long the orphans of the hospitality industry, stand to gain popularity as people hit the road again and seek to avoid interior spaces....",
                Url = "https://www.latimes.com/business/story/2020-07-24/motels-coronavirus-design",
                UserTitle = "Dune Ipsum",
                Content = "Beneath hostility proverb creates about Paul, whenever tends. Wife grasps legendary around sand. Purpose seeks the imperium stops the unique Rautha. Over native so Harah, beside Lisan al-Gaib and the reflection. For thinking where assassination above the trained Ichwan Bedwine. Self-control reaches the deep-sand Tleilax.",
                CreateDateTime = DateTime.Now - TimeSpan.FromDays(10),
                Image = "https://ca-times.brightspotcdn.com/dims4/default/8eb9564/2147483647/strip/true/crop/5760x3240+0+300/resize/1200x675!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F1d%2F58%2F6cab4fd8479d94bb8f1892ca19fe%2Fap18290829832389.jpg",
                Language = "en",
                Published = Convert.ToDateTime("2020-07-24 18:03:42 +0000"),
                Objectivity = 0.50,
                Sentimentality = 0.50
            };

            var article2 = new Article()
            {
                UserProfileId = 2,
                Author = "The Bon Appétit Staff",
                Publisher = "bonappetit",
                CurrentsId = "f624f638-ac4a-4577-a312-a647e36f3b7d",
                Title = "93 Grilling Recipes So You Don’t Have to Cook Anything Inside",
                Description = "From ribs to shrimp, chicken to veggies, fish to ... so much more, get grilling with these recipes!...",
                Url = "https://www.bonappetit.com/recipes/slideshow/60-favorite-grilling-recipes-almost-everything",
                UserTitle = "Dune Ipsum User 2",
                Content = "The breeding program passes for question, against spannungsbogen yet enemy threatens instinctual. The water burden stops near exploitation. Nothing sinks superior out Water of Life. Awakening uses for the kiswa ridge beside the Jamis chooses extreme. The Leto manipulates, the Wellington clouds. Spacing Guild disobeys the superior the Way. Between the prompt guilt disturbs the scorched conditioning yet the weirding homeworld nor terrifies Hasimir.",
                CreateDateTime = DateTime.Now - TimeSpan.FromDays(20),
                Image = "https://assets.bonappetit.com/photos/5cdf092b56f182a9a3eb2e97/16:9/w_1600,c_limit/grilled-scallops-with-nori-ginger-lime.jpg",
                Language = "en",
                Published = Convert.ToDateTime("2020-07-24 13:00:00 +0000"),
                Objectivity = 0.50,
                Sentimentality = 0.50
            };

            var referenceArticle1 = new Article()
            {
                UserProfileId = 1,
                Author = "The Associated Press",
                Publisher = "seattletimes",
                CurrentsId = "774bc577-f284-41a8-ad58-cd99e252332c",
                Title = "FAA orders emergency engine checks of parked Boeing 737s",
                Description = "Airlines parked hundreds of planes when the coronavirus pandemic triggered a collapse in air travel and are slowly bringing some of those planes....",
                Url = "https://www.seattletimes.com/business/faa-orders-emergency-engine-checks-of-parked-boeing-737s/",
                CreateDateTime = DateTime.Now - TimeSpan.FromDays(1),
                Language = "en",
                Published = Convert.ToDateTime("2020-07-24 16:25:16 +0000"),
                Objectivity = 0.50,
                Sentimentality = 0.50
            };

            var referenceArticle2 = new Article()
            {
                UserProfileId = 2,
                Author = "Tyler Durden",
                Publisher = "google",
                CurrentsId = "a9fa3cca-e0e7-4ce2-95d3-12ffd7e9d97b",
                Title = "Some Optimism From Goldman: The Number Of New COVID Cases Is Starting To Flatten",
                Description = "Some Optimism From Goldman: The Number Of New COVID Cases Is Starting To Flatten \n\nTyler Durden\n\nFri, 07/24/2020 - 12:05\nAs the US reports more than 1k deaths for the third straight day, reporters are mostly focusing on this milestone, along with the US surmounting the 4 million-case mark, as the bi...",
                Url = "http://feedproxy.google.com/~r/zerohedge/feed/~3/97bxxwviQ-Q/some-optimism-goldman-number-new-covid-cases-starting-flatten",
                CreateDateTime = DateTime.Now - TimeSpan.FromDays(1),
                Language = "en",
                Published = Convert.ToDateTime("2020-07-24 16:05:00 +0000"),
                Objectivity = 0.50,
                Sentimentality = 0.50
            };

            var articleCategory1 = new ArticleCategory()
            {
                ArticleId = 1,
                CategoryId = 4
            };

            var articleCategory2 = new ArticleCategory()
            {
                ArticleId = 2,
                CategoryId = 18
            };

            var articleCategory3 = new ArticleCategory()
            {
                ArticleId = 3,
                CategoryId = 4
            };

            var articleCategory4 = new ArticleCategory()
            {
                ArticleId = 4,
                CategoryId = 18
            };

            var articleReference1 = new ArticleReference()
            {
                ArticleId = 1,
                ReferenceArticleId = 3
            };

            var articleReference2 = new ArticleReference()
            {
                ArticleId = 2,
                ReferenceArticleId = 4
            };

            _context.Add(user1);
            _context.Add(user2);

            _context.Add(article1);
            _context.Add(article2);
            _context.Add(referenceArticle1);
            _context.Add(referenceArticle2);

            _context.Add(articleCategory1);
            _context.Add(articleCategory2);
            _context.Add(articleCategory3);
            _context.Add(articleCategory4);

            _context.Add(articleReference1);
            _context.Add(articleReference2);

            _context.SaveChanges();
        }
    }
}
