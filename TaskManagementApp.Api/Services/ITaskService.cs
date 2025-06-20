using TaskManagementApp.Api.Models;

namespace TaskManagementApp.Api.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItem>> GetAllTaskAsync();
        Task<TaskItem> GetTaskByIdAsync(int id);
        Task<TaskItem> CreateTaskAsync(TaskItem task);
        Task<TaskItem> UpdateTaskAsync(TaskItem task);
        Task DeleteTaskAsync(int id);
    }
}
