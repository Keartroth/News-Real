using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NewsReal.Data;
using NewsReal.Models;
using NewsReal.Repositories;

namespace NewsReal.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SnippetController : ControllerBase
    {
        private readonly SnippetRepository _snippetRepository;
        private readonly UserProfileRepository _userProfileRepository;

        public SnippetController(ApplicationDbContext context)
        {
            _snippetRepository = new SnippetRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            var currentUserId = GetCurrentUserProfile().Id;

            var snippets = _snippetRepository.GetCurrentUsersSnippets(currentUserId);

            return Ok(snippets);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var snippet = _snippetRepository.GetSnippetById(id);
            
            if (snippet == null)
            {
                return NotFound();
            }
            else if (snippet != null && snippet.UserProfileId == currentUserProfile.Id)
            {
                return Ok(snippet);
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost]
        public IActionResult Post(Article snippet)
        {
            var currentUserId = GetCurrentUserProfile().Id;

            snippet.UserProfileId = currentUserId;
            snippet.CreateDateTime = DateTime.Now;

            _snippetRepository.Add(snippet);
            return CreatedAtAction("Get", new { id = snippet.Id }, snippet);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
