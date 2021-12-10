using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models.DTO
{
    public class UserDTO
    {
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Token { get; set; }
        public UserDTO(string email, string username)
        {
            Email = email;
            UserName = username;
        }
    }
}
