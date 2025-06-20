using TaskManagementApp.Api.Exceptions;
using TaskManagementApp.Api.Models;
using TaskManagementApp.Api.Repositories;

namespace TaskManagementApp.Api.Services
{
    public class TaskService (ITaskRepository taskRepository) : ITaskService
    {

        public async Task<IEnumerable<TaskItem>> GetAllTaskAsync()
        {
            return await taskRepository.GetAllTasksAsync();
        }

        public async Task<TaskItem> GetTaskByIdAsync(int id)
        {
            var task = await taskRepository.GetTaskByIdAsync(id);
            if (task is null)
            {
                throw new NotFoundException($"Task with ID {id} not found.");
            }
            return task;
        }

        public async Task<TaskItem> CreateTaskAsync(TaskItem task)
        {
            task.IsCompleted = false;
            task.CreateAt = DateTime.Now;
            ;
            return await taskRepository.AddTaskAsync(task);
        }

        public async Task<TaskItem> UpdateTaskAsync(TaskItem task)
        {
            var updatedTask = await taskRepository.UpdateTaskAsync(task);
            if (updatedTask is null)
            {
                throw new NotFoundException($"Task with ID {task.Id} not found for update.");
            }
            return updatedTask;
        }

        public async Task DeleteTaskAsync(int id)
        {
            var isDeleted = await taskRepository.DeleteTaskAsync(id);
            if (!isDeleted)
            {
                throw new NotFoundException($"Task with ID {id} not found for deletion.");
            }
        }
    }
}
