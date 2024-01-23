using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ticketer.Migrations
{
    /// <inheritdoc />
    public partial class MovieUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MovieState",
                table: "Movies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MovieState",
                table: "Movies");
        }
    }
}
