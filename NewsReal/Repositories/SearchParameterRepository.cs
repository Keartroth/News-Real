using Microsoft.EntityFrameworkCore;
using NewsReal.Data;
using NewsReal.Models.EFModels;
using System.Collections.Generic;
using System.Linq;

namespace NewsReal.Repositories
{
    public class SearchParameterRepository
    {
        private readonly ApplicationDbContext _context;

        public SearchParameterRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<SearchParameter> GetSearchParametersByUserId(int id)
        {
            return _context.SearchParameter
                                .Where(sp => sp.UserProfileId == id)
                                .OrderBy(sp => sp.Title).ToList();
        }

        public SearchParameter GetSearchParameterById(int id)
        {
            return _context.SearchParameter.FirstOrDefault(sp => sp.Id == id);
        }

        public void Add(SearchParameter searchParameter)
        {
            _context.Add(searchParameter);
            _context.SaveChanges();
        }

        public void Delete(int searchParameterId)
        {
            var searchParameter = GetSearchParameterById(searchParameterId);

            _context.SearchParameter.Remove(searchParameter);
            _context.SaveChanges();
        }

        public void Update(SearchParameter searchParameter)
        {
            _context.Entry(searchParameter).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public SearchParameter GetTracklessSearchParameterById(int id)
        {
            return _context.SearchParameter.AsNoTracking().FirstOrDefault(sp => sp.Id == id);
        }
    }
}