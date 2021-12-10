using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomIdentity.Data.Entities
{
    public class AppUserTokens:IdentityUserToken<Guid>
    {
    }
}
