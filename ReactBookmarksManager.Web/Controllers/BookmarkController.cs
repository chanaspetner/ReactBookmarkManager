using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReactBookmarksManager.Data;

namespace ReactBookmarksManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {

        private string _connectionString;
        public BookmarkController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getuserbookmarks")]
        public List<Bookmark> GetUserBookmarks()
        {
            var repo = new BookmarkUserRepository(_connectionString);
            var email = User.Identity.Name;
            var user = repo.GetByEmail(email);
            return repo.GetUserBookmarks(user.Id);
        }

        [HttpPost]
        [Route("addbookmark")]
        public void AddBookmark(Bookmark bookmark)
        {
            var repo = new BookmarkUserRepository(_connectionString);
            var email = User.Identity.Name;
            var user = repo.GetByEmail(email);
            bookmark.UserId = user.Id;
            repo.AddBookmark(bookmark);
        }

        [HttpPost]
        [Route("updatetitle")]
        public void UpdateTitle(string title, int id)
        {
            var repo = new BookmarkUserRepository(_connectionString);
            repo.UpdateTitle(title, id);
        }

        [HttpPost]
        [Route("delete")]
        public void Delete(int id)
        {
            var repo = new BookmarkUserRepository(_connectionString);
            repo.Delete(id);
        }

        [HttpGet]
        [Route("mostpopularbookmarks")]
        public List<BookmarkCount> MostPopularBookmarks()
        {
            var repo = new BookmarkUserRepository(_connectionString);
            return repo.MostPopularBookmarks();
        }
    }
}
