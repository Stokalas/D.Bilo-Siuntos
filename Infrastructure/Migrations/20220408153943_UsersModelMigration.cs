using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class UsersModelMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DeliveryAddressId",
                table: "Parcels",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeliveryDate",
                table: "Parcels",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "ShipmentDate",
                table: "Parcels",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "ShipperID",
                table: "Parcels",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ShippingAddressId",
                table: "Parcels",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Size",
                table: "Parcels",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Parcels",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Address",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Street = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HouseNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PostalCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Address", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AddressId = table.Column<int>(type: "int", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Address_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Address",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Parcels_DeliveryAddressId",
                table: "Parcels",
                column: "DeliveryAddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Parcels_ShippingAddressId",
                table: "Parcels",
                column: "ShippingAddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Parcels_UserId",
                table: "Parcels",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_AddressId",
                table: "Users",
                column: "AddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Parcels_Address_DeliveryAddressId",
                table: "Parcels",
                column: "DeliveryAddressId",
                principalTable: "Address",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Parcels_Address_ShippingAddressId",
                table: "Parcels",
                column: "ShippingAddressId",
                principalTable: "Address",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Parcels_Users_UserId",
                table: "Parcels",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Parcels_Address_DeliveryAddressId",
                table: "Parcels");

            migrationBuilder.DropForeignKey(
                name: "FK_Parcels_Address_ShippingAddressId",
                table: "Parcels");

            migrationBuilder.DropForeignKey(
                name: "FK_Parcels_Users_UserId",
                table: "Parcels");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Address");

            migrationBuilder.DropIndex(
                name: "IX_Parcels_DeliveryAddressId",
                table: "Parcels");

            migrationBuilder.DropIndex(
                name: "IX_Parcels_ShippingAddressId",
                table: "Parcels");

            migrationBuilder.DropIndex(
                name: "IX_Parcels_UserId",
                table: "Parcels");

            migrationBuilder.DropColumn(
                name: "DeliveryAddressId",
                table: "Parcels");

            migrationBuilder.DropColumn(
                name: "DeliveryDate",
                table: "Parcels");

            migrationBuilder.DropColumn(
                name: "ShipmentDate",
                table: "Parcels");

            migrationBuilder.DropColumn(
                name: "ShipperID",
                table: "Parcels");

            migrationBuilder.DropColumn(
                name: "ShippingAddressId",
                table: "Parcels");

            migrationBuilder.DropColumn(
                name: "Size",
                table: "Parcels");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Parcels");
        }
    }
}
