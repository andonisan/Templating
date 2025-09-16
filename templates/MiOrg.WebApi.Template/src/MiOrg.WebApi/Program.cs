using Microsoft.AspNetCore.Mvc;
#if (UseEntityFramework)
using Microsoft.EntityFrameworkCore;
using MiOrg.WebApi.Data;
#endif
#if (IncludeAuth)
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
#endif
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
builder.Host.UseSerilog((context, configuration) =>
{
    configuration
        .ReadFrom.Configuration(context.Configuration)
        .Enrich.FromLogContext()
        .WriteTo.Console();
});

// Add services to the container.
builder.Services.AddControllers();

#if (UseSwagger)
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
#endif

#if (UseEntityFramework)
// Add Entity Framework
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
#if (Database == "SqlServer")
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
#endif
#if (Database == "PostgreSQL")
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
#endif
#if (Database == "InMemory")
    options.UseInMemoryDatabase("MiOrg.WebApi");
#endif
});
#endif

#if (IncludeAuth)
// Add JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });
#endif

// Add Health Checks
builder.Services.AddHealthChecks()
#if (UseEntityFramework)
    .AddDbContextCheck<ApplicationDbContext>()
#endif
    ;

var app = builder.Build();

#if (UseEntityFramework)
// Ensure database is created
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    context.Database.EnsureCreated();
}
#endif

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
#if (UseSwagger)
    app.UseSwagger();
    app.UseSwaggerUI();
#endif
}

app.UseHttpsRedirection();

#if (IncludeAuth)
app.UseAuthentication();
#endif
app.UseAuthorization();

app.MapControllers();

// Map Health Checks
app.MapHealthChecks("/health");

app.Run();