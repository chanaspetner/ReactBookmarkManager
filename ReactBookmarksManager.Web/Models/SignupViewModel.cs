using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReactBookmarksManager.Data;

namespace ReactBookmarksManager.Web.Models
{
    public class SignupViewModel : User
    {
        public string Password { get; set; }
    }
}
