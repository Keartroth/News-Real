using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NewsReal.Data;
using NewsReal.Models.EFModels;
using NewsReal.Repositories;
using System.Security.Claims;

namespace NewsReal.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SearchParameterController : ControllerBase
    {
        private readonly SearchParameterRepository _searchParameterRepository;
        private readonly UserProfileRepository _userProfileRepository;

        public SearchParameterController(ApplicationDbContext context)
        {
            _searchParameterRepository = new SearchParameterRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            var currentUserId = GetCurrentUserProfile().Id;
            var searchParameters = _searchParameterRepository.GetSearchParametersByUserId(currentUserId);

            return Ok(searchParameters);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var currentUserId = GetCurrentUserProfile().Id;
            var searchParameter = _searchParameterRepository.GetSearchParameterById(id);

            if (searchParameter == null)
            {
                return NotFound();
            }
            else if (searchParameter.UserProfileId == currentUserId)
            {
                return Ok(searchParameter);
            }
            else
            {
                return Unauthorized();
            }

        }

        [HttpPost]
        public IActionResult Post(SearchParameter searchParameter)
        {
            var currentUserId = GetCurrentUserProfile().Id;
            searchParameter.UserProfileId = currentUserId;

            _searchParameterRepository.Add(searchParameter);

            return CreatedAtAction("Get", new { id = searchParameter.Id }, searchParameter);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, SearchParameter searchParameter)
        {
            var currentUserProfileId = GetCurrentUserProfile().Id;
            var searchParameterDBState = _searchParameterRepository.GetTracklessSearchParameterById(id);

            if ((currentUserProfileId != searchParameter.UserProfileId) || (searchParameterDBState.UserProfileId != searchParameter.UserProfileId))
            {
                return Unauthorized();
            }

            if (id != searchParameter.Id)
            {
                return BadRequest();
            }

            _searchParameterRepository.Update(searchParameter);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}