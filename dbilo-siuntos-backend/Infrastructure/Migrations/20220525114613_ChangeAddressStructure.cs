using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class ChangeAddressStructure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Addresses");

            migrationBuilder.AddColumn<int>(
                name: "AddressId",
                table: "Statuses",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TerminalId",
                table: "Statuses",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Statuses_AddressId",
                table: "Statuses",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Statuses_TerminalId",
                table: "Statuses",
                column: "TerminalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Statuses_Addresses_AddressId",
                table: "Statuses",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Statuses_Terminals_TerminalId",
                table: "Statuses",
                column: "TerminalId",
                principalTable: "Terminals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Statuses_Addresses_AddressId",
                table: "Statuses");

            migrationBuilder.DropForeignKey(
                name: "FK_Statuses_Terminals_TerminalId",
                table: "Statuses");

            migrationBuilder.DropIndex(
                name: "IX_Statuses_AddressId",
                table: "Statuses");

            migrationBuilder.DropIndex(
                name: "IX_Statuses_TerminalId",
                table: "Statuses");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "Statuses");

            migrationBuilder.DropColumn(
                name: "TerminalId",
                table: "Statuses");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Addresses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Addresses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Addresses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Addresses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
