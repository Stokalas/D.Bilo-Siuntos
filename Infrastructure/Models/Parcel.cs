using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class Parcel
    {
        public int Id { get; set; }
        [Key]
        public string TrackingNumber { get; set; }
        
    }
}
