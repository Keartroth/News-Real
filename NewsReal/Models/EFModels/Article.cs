﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NewsReal.Models.EFModels
{
    public class Article
    {
        public int Id { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        [Required]
        [MaxLength(255)]
        public string Author { get; set; }

        [Required]
        [MaxLength(255)]
        public string Publisher { get; set; }

        [Required]
        [MaxLength(255)]
        public string CurrentsId { get; set; }

        [Required]
        [MaxLength(255)]
        public string Title { get; set; }

        [Required]
        [MaxLength(5000)]
        public string Description { get; set; }

        [Required]
        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string Url { get; set; }

        [MaxLength(500)]
        public string UserTitle { get; set; }

        [MaxLength(100000)]
        public string Content { get; set; }

        public DateTime? CreateDateTime { get; set; }

        [DataType(DataType.ImageUrl)]
        public string Image { get; set; }

        [MaxLength(2)]
        public string Language { get; set; }

        public DateTime? Published { get; set; }

        public double? Objectivity { get; set; }

        public double? Sentimentality { get; set; }

        public UserProfile UserProfile { get; set; }

        public List<ArticleCategory> ArticleCategory { get; set; }

        [NotMapped]
        public List<ArticleReference> ArticleReferences { get; set; }
    }
}