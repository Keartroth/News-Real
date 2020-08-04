using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NewsReal.Data;
using NewsReal.Models.EFModels;
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
        private readonly CategoryRepository _categoryRepository;

        public SnippetController(ApplicationDbContext context, IConfiguration configuration)
        {
            _snippetRepository = new SnippetRepository(context, configuration);
            _userProfileRepository = new UserProfileRepository(context);
            _categoryRepository = new CategoryRepository(context);
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
            snippet.CreateDateTime = DateTime.Now;

            _snippetRepository.Add(snippet);

            return CreatedAtAction("Get", new { id = snippet.Id }, snippet);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Article snippet)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var snippetDBState = _snippetRepository.GetTracklessArticleById(id);

            if ((currentUserProfile.Id != snippet.UserProfileId) || (snippetDBState.UserProfileId != snippet.UserProfileId))
            {
                return Unauthorized();
            }

            if (id != snippet.Id)
            {
                return BadRequest();
            }

            _snippetRepository.Update(snippet);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var snippet = _snippetRepository.GetSnippetById(id);

            if (currentUserProfile.Id != snippet.UserProfileId)
            {
                return Unauthorized();
            }

            _snippetRepository.Delete(id);
            return NoContent();
        }

        [HttpDelete("deletereferencearticle/{id}")]
        public IActionResult DeleteReferenceArticle(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var referenceArticle = _snippetRepository.GetArticleById(id);

            if (currentUserProfile.Id != referenceArticle.UserProfileId)
            {
                return Unauthorized();
            }

            _snippetRepository.DeleteReferenceArticle(id);
            return NoContent();
        }

        // Start of SnippetReferrence methods
        [HttpPost("addsnippetreferrence")]
        public IActionResult Post(ArticleReference snippetReferrence)
        {
            _snippetRepository.AddArticleReference(snippetReferrence);

            return CreatedAtAction("Get", new { id = snippetReferrence.Id }, snippetReferrence);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}