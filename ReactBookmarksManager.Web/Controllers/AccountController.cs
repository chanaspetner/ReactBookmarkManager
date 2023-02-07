using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReactBookmarksManager.Data;
using Microsoft.AspNetCore.Authentication;
using ReactBookmarksManager.Web.Models;
using System.Security.Claims;

namespace ReactBookmarksManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private string _connectionString;
        public AccountController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("login")]
        public User Login(LoginViewModel vm)
        {
            var repo = new BookmarkUserRepository(_connectionString);
            var user = repo.Login(vm.Email, vm.Password);
            if(user == null)
            {
                return null;
            }

            var claims = new List<Claim>()
            {
                new Claim("user", vm.Email)
            };

            HttpContext.SignInAsync(new ClaimsPrincipal(
                new ClaimsIdentity(claims, "Cookies", "user", "role"))).Wait();
            return user;

        }

        [HttpGet]
        [Route("getcurrentuser")]
        public User GetCurrentUser()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return null;
            }
            var repo = new BookmarkUserRepository(_connectionString);
            return repo.GetByEmail(User.Identity.Name);
        }

        [HttpPost]
        [Route("logout")]
        public void Logout()
        {
            HttpContext.SignOutAsync().Wait();
        }

        [HttpPost]
        [Route("signup")]
        public void Signup(SignupViewModel user)
        {
            var repo = new BookmarkUserRepository(_connectionString);
            repo.AddUser(user, user.Password);
        }
    }
}
