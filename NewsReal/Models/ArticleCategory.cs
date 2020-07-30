﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace NewsReal.Models
{
    public class ArticleCategory
    {
        public int Id { get; set; }
        
        public int ArticleId { get; set; }

        public int CategoryId { get; set; }

        public Article Article { get; set; }

        public Category Category { get; set; }
    }
}