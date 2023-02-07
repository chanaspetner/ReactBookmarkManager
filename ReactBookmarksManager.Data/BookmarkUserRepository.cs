using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ReactBookmarksManager.Data
{
    public class BookmarkUserRepository
    {
        private readonly string _connectionString;

        public BookmarkUserRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public User Login(string email, string password)
        {
            var user = GetByEmail(email);
            if(user == null)
            {
                return null;
            }

            var isValidPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (!isValidPassword)
            {
                return null;
            }
            return user;
        }

        public User GetByEmail(string email)
        {
            using var ctx = new BookmarksDataContext(_connectionString);
            return ctx.Users.FirstOrDefault(u => u.Email == email);
        }

        public void AddUser(User user, string password)
        {
            var hash = BCrypt.Net.BCrypt.HashPassword(password);
            user.PasswordHash = hash;
            using var ctx = new BookmarksDataContext(_connectionString);
            ctx.Users.Add(user);
            ctx.SaveChanges();
        }

        public List<Bookmark> GetUserBookmarks(int userId)
        {
            using var ctx = new BookmarksDataContext(_connectionString);
            return ctx.Bookmarks.Where(b => b.UserId == userId).ToList();
        }

        public void AddBookmark(Bookmark bookmark)
        {
            using var ctx = new BookmarksDataContext(_connectionString);
            ctx.Bookmarks.Add(bookmark);
            ctx.SaveChanges();
        }

        public void UpdateTitle(string title, int id)
        {
            using var ctx = new BookmarksDataContext(_connectionString);
            ctx.Database.ExecuteSqlInterpolated($"UPDATE Bookmarks SET Title = {title} WHERE Id = {id}");
        }

        public void Delete(int id)
        {
            using var ctx = new BookmarksDataContext(_connectionString);
            var b = ctx.Bookmarks.FirstOrDefault(b => b.Id == id);
            ctx.Bookmarks.Remove(b);
            ctx.SaveChanges();
        }

        public List<BookmarkCount> MostPopularBookmarks()
        {
            using var ctx = new BookmarksDataContext(_connectionString);
            var users = ctx.Users.Include(u => u.Bookmarks).ToList();
            var bookmarkCounts = new List<BookmarkCount>();
                foreach(User u in users)
                {
                    foreach(Bookmark b in u.Bookmarks)
                    {
                        if (bookmarkCounts.Any(bo => bo.URL == b.URL))
                        {
                            bookmarkCounts.FirstOrDefault(bc => bc.URL == b.URL).Count++;
                        }
                        else
                        {
                            bookmarkCounts.Add(new BookmarkCount
                            {
                                URL = b.URL,
                                Count = 1
                            });

                        }
                        
                    }
                }
                  
            

            return bookmarkCounts.OrderByDescending(bc => bc.Count).Take(5).ToList();

        }

    }
}
