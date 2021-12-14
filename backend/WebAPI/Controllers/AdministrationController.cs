using CustomIdentity.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models.BindingModels;

namespace WebAPI.Controllers
{
    //[Authorize(Roles = "Admin")]
    public class AdministrationController : Controller
    {
        private readonly RoleManager<AppRole> _roleManager;
        private readonly UserManager<AppUser> _userManager;

        public AdministrationController(RoleManager<AppRole> roleManager, UserManager<AppUser> userManager)
        {
            this._roleManager = roleManager;
            this._userManager = userManager;
        }

        [HttpPost("CreateRole")]
        public async Task<IActionResult> CreateRole([FromBody] AddRoleBindingModel model)
        {
            if (ModelState.IsValid)
            {
                AppRole appRole = new AppRole
                {
                    Name = model.RoleName
                };
                IdentityResult result = await _roleManager.CreateAsync(appRole);
                if (result.Succeeded)
                {
                    return Ok();
                }
            }
            return BadRequest();
        }

        [HttpPost("EditUserInRole")]
        public async Task<IActionResult> EditUserInRole([FromBody] AddUserRoleBindingModel model,string roleId)
        {
            if (ModelState.IsValid)
            {
                AppUser appUser = new AppUser
                {
                    Id = model.Id,
                    UserName = model.Name
                };
                var role = await _roleManager.FindByIdAsync(roleId);
                if (role == null)
                {
                    return NotFound("role not found");
                }
                var user = await _userManager.FindByIdAsync((model.Id).ToString());
                IdentityResult result = null;
                if(user != null)
                {
                    result = await _userManager.AddToRoleAsync(user, role.Name);
                }
                else
                {
                    return NotFound("User not found");
                }
                
            }
            return BadRequest();
        }
    }
}
