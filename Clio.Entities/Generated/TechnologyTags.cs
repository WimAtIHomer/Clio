// <auto-generated />
// This file was generated by a T4 template.
// Don't change it directly as your change would get overwritten.  Instead, make changes
// to the .tt file (i.e. the T4 template) and save it to regenerate this file.

// Make sure the compiler doesn't complain about missing Xml comments
#pragma warning disable 1591

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using ServiceStack.OrmLite;
using ServiceStack.DataAnnotations;
using ServiceStack.DesignPatterns.Model;

namespace IHomer.Clio.Entities
{
	[Alias("TechnologyTags")]
    public partial class TechnologyTag 
    {
		public TechnologyTag()
		{
		}

        [Required]
        public long TagId { get; set;}
        [Required]
        public long TechnologyId { get; set;}
    }
}
#pragma warning restore 1591
