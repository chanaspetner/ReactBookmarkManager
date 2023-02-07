using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactBookmarksManager.Data
{
    public class BookmarkRepository
    {
        private readonly string _connectionString;

        public BookmarkRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
    }
}
