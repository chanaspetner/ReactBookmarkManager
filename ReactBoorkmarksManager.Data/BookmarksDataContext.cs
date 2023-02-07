using Microsoft.EntityFrameworkCore;
using System;

namespace ReactBookmarksManager.Data
{
    public class BookmarksDataContext : DbContext
    {
        private string _connectionString;

        public BookmarksDataContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Bookmark> Bookmarks { get; set; }
    }
}
