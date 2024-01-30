using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ticketer.Migrations
{
    /// <inheritdoc />
    public partial class DataBaseUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Age",
                table: "Users",
                newName: "MovieTheathreId");

            migrationBuilder.AddColumn<string>(
                name: "BirthDate",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Sex",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Movie_Theatre_Id",
                table: "Schedules",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Movie_TheatreId",
                table: "Auditoriums",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Movie_Theatres",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movie_Theatres", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_Movie_Theatre_Id",
                table: "Schedules",
                column: "Movie_Theatre_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Auditoriums_Movie_TheatreId",
                table: "Auditoriums",
                column: "Movie_TheatreId");

            migrationBuilder.AddForeignKey(
                name: "FK_Auditoriums_Movie_Theatres_Movie_TheatreId",
                table: "Auditoriums",
                column: "Movie_TheatreId",
                principalTable: "Movie_Theatres",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_Movie_Theatres_Movie_Theatre_Id",
                table: "Schedules",
                column: "Movie_Theatre_Id",
                principalTable: "Movie_Theatres",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Auditoriums_Movie_Theatres_Movie_TheatreId",
                table: "Auditoriums");

            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_Movie_Theatres_Movie_Theatre_Id",
                table: "Schedules");

            migrationBuilder.DropTable(
                name: "Movie_Theatres");

            migrationBuilder.DropIndex(
                name: "IX_Schedules_Movie_Theatre_Id",
                table: "Schedules");

            migrationBuilder.DropIndex(
                name: "IX_Auditoriums_Movie_TheatreId",
                table: "Auditoriums");

            migrationBuilder.DropColumn(
                name: "BirthDate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Sex",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Movie_Theatre_Id",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "Movie_TheatreId",
                table: "Auditoriums");

            migrationBuilder.RenameColumn(
                name: "MovieTheathreId",
                table: "Users",
                newName: "Age");
        }
    }
}
