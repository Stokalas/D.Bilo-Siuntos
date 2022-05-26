using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class ChangeTerminalStructure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddressLine1",
                table: "Terminals");

            migrationBuilder.DropColumn(
                name: "AddressLine2",
                table: "Terminals");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Terminals");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "Terminals");

            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Terminals");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Terminals");

            migrationBuilder.DropColumn(
                name: "PostalCode",
                table: "Terminals");

            migrationBuilder.AddColumn<int>(
                name: "AddressId",
                table: "Terminals",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Terminals_AddressId",
                table: "Terminals",
                column: "AddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Terminals_Addresses_AddressId",
                table: "Terminals",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Terminals_Addresses_AddressId",
                table: "Terminals");

            migrationBuilder.DropIndex(
                name: "IX_Terminals_AddressId",
                table: "Terminals");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "Terminals");

            migrationBuilder.AddColumn<string>(
                name: "AddressLine1",
                table: "Terminals",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AddressLine2",
                table: "Terminals",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Terminals",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Terminals",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Terminals",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "Terminals",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PostalCode",
                table: "Terminals",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
