using System;

namespace Domain
{
    public class Activity
    {
        //Guid helps generate unique ID from both client or server side. 
        //Using property name as Id EntityFrameworkCore will automatically identifies this as a Primary key.
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string  Description { get; set; }
        public string  Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
    }
}