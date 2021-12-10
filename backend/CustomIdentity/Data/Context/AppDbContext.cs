using CustomIdentity.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CustomIdentity.Data.Context
{
    public partial class AppDbContext: IdentityDbContext<AppUser, AppRole, Guid, AppUserClaims, AppUserRole, AppUserLogins, AppUserRoleClaims, AppUserTokens>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options){ }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<AppUser>(entity =>
            {
                //entity.HasKey(u => u.Id);
                entity.ToTable("Users");
            });

            modelBuilder.Entity<AppRole>(entity =>
            {
                //entity.HasKey(u => u.id);
                entity.ToTable("Roles");
            });

            modelBuilder.Entity<AppUserRole>(entity =>
            {
                entity.ToTable("UserRoles");
            });

            modelBuilder.Entity<AppUserClaims>(entity => {
                entity.ToTable("UserClaims");
            });

            modelBuilder.Entity<AppUserRoleClaims>(entity => {
                entity.ToTable("RoleClaims");
            });

            modelBuilder.Entity<AppUserTokens>(entity => {
                entity.ToTable("UserTokens");
            });


            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
