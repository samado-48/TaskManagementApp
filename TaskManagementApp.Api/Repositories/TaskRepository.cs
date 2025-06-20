using Microsoft.EntityFrameworkCore;
using TaskManagementApp.Api.Data;
using TaskManagementApp.Api.Models;

namespace TaskManagementApp.Api.Repositories
{
    public class TaskRepository(AppDbContext dbContext) : ITaskRepository
    {
        public async Task<IEnumerable<TaskItem>> GetAllTasksAsync()
        {
            return await dbContext.TaskItems.ToListAsync();
        }

        public async Task<TaskItem?> GetTaskByIdAsync(int id)
        {
            return await dbContext.TaskItems.FindAsync(id);
        }

        public async Task<TaskItem> AddTaskAsync(TaskItem task)
        {
            dbContext.TaskItems.Add(task);
            await dbContext.SaveChangesAsync();
            return task;
        }

        public async Task<TaskItem?> UpdateTaskAsync(TaskItem task)
        {
            var existingTask = await dbContext.TaskItems.FindAsync(task.Id);
            if (existingTask is null)
            {
                return null;
            }

            dbContext.Entry(existingTask).CurrentValues.SetValues(task);
            await dbContext.SaveChangesAsync();
            return task;
        }

        public async Task<bool> DeleteTaskAsync(int id)
        {
            var taskToDelete =await dbContext.TaskItems.FindAsync(id);
            if (taskToDelete is null)
            {
                return false;
            }

            dbContext.TaskItems.Remove(taskToDelete);
            await dbContext.SaveChangesAsync();
            return true;
        }
    }
}
