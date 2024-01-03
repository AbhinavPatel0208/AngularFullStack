using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {

        private readonly AppDbContext _context;

        public StudentController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Student>> GetStudents()
        {
            var students = await _context.Students.AsNoTracking().ToListAsync();
            return students;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Student student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _context.AddAsync(student);

            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return Ok();
            }
            return BadRequest();
        }
    }
}