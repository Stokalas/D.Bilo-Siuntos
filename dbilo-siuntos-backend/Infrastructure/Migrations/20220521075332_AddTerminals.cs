using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class AddTerminals : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TerminalId",
                table: "Parcels",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TerminalId",
                table: "Address",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Terminals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AddressLine1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AddressLine2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PostalCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Latitude = table.Column<double>(type: "float", nullable: true),
                    Longitude = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Terminals", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Parcels_TerminalId",
                table: "Parcels",
                column: "TerminalId");

            migrationBuilder.CreateIndex(
                name: "IX_Address_TerminalId",
                table: "Address",
                column: "TerminalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Address_Terminals_TerminalId",
                table: "Address",
                column: "TerminalId",
                principalTable: "Terminals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Parcels_Terminals_TerminalId",
                table: "Parcels",
                column: "TerminalId",
                principalTable: "Terminals",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Address_Terminals_TerminalId",
                table: "Address");

            migrationBuilder.DropForeignKey(
                name: "FK_Parcels_Terminals_TerminalId",
                table: "Parcels");

            migrationBuilder.DropTable(
                name: "Terminals");

            migrationBuilder.DropIndex(
                name: "IX_Parcels_TerminalId",
                table: "Parcels");

            migrationBuilder.DropIndex(
                name: "IX_Address_TerminalId",
                table: "Address");

            migrationBuilder.DropColumn(
                name: "TerminalId",
                table: "Parcels");

            migrationBuilder.DropColumn(
                name: "TerminalId",
                table: "Address");
        }
    }
}
