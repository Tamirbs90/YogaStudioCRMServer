﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace YogaStudio.Models
{
    public class ClassParticipated
    {

        public ClassParticipated()
        {

        }
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Date { get; set; }
        public int Paid { get; set; }
        public int Debt { get; set; }
        public int MonthId { get; set; }
        public int PersonId { get; set; }
    }
}