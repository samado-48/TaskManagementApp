using System.ComponentModel.DataAnnotations;

namespace TaskManagementApp.Api.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(250)]
        public string Title { get; set; } = string.Empty;
        
        public string Description { get; set; } = string.Empty;
        
        public bool IsCompleted { get; set; }
        
        public DateTime CreateAt { get; set; } = DateTime.Now;
        
        public DateTime? DueDate { get; set; }
    }
}
