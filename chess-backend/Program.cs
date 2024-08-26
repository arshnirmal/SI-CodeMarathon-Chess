
using chess_backend.DataAccessLayers;
using Npgsql;

namespace chess_backend {
    public class Program {
        public static void Main(string[] args) {
            var builder = WebApplication.CreateBuilder(args);
            var connectionString = builder.Configuration.GetConnectionString("ChessDatabase");

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddScoped<IChessDAO, ChessDAO>();
            builder.Services.AddScoped(
                (provider) => new NpgsqlConnection(connectionString)
            );
            builder.Services.AddCors(options => {
                options.AddDefaultPolicy(builder => {
                    builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
                options.AddPolicy("FrontEnd", builder => {
                    builder.WithOrigins("http://localhost:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });

            var app = builder.Build();

            app.UseCors();

            // Configure the HTTP request pipeline.
            if(app.Environment.IsDevelopment()) {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}

/*
Create action methods to retrieve the specified data:
    1. Create an action method to Add a new match. Ensure that a match can only be created if
    both players exist in the Players table.

    2. Retrieve all players from a specific country, sorted by their current world ranking. The
    accepts two parameters.

    3. Create an endpoint that retrieves each player&#39;s performance in the matches they have
    played. The response should include the player&#39;s full name, the total number of matches
    they have played, the total number of matches they have won, and their win percentage.

    4. create an API endpoint that retrieves a list of players who have won more matches than the
    average number of matches won by all players. The response should include the player&#39;s full
    name, the number of matches they have won, and their win percentage.
*/