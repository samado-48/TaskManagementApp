using Microsoft.AspNetCore.Mvc;
using TaskManagementApp.Api.Models;
using TaskManagementApp.Api.Services;

namespace TaskManagementApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController(ITaskService taskService) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
        {
            var tasks = await taskService.GetAllTaskAsync();
            return Ok(tasks);
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<TaskItem>> GetTask(int id)
        {
            try
            {
                var task = await taskService.GetTaskByIdAsync(id);
                return Ok(task);
            }
            catch (Exception exp)
            {
                return NotFound(exp.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<TaskItem>> PosTask(TaskItem task)
        {
            var createdTask = await taskService.CreateTaskAsync(task);
            return CreatedAtAction(nameof(GetTask), new { id = createdTask.Id }, createdTask);
        }
    }
}
