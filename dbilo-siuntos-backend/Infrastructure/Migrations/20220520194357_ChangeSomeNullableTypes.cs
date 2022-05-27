using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class ChangeSomeNullableTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Address_AddressId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Parcels_Address_DeliveryAddressId",
                table: "Parcels");

            migrationBuilder.DropForeignKey(
                name: "FK_Parcels_Address_ShippingAddressId",
                table: "Parcels");

            migrationBuilder.DropForeignKey(
                name: "FK_Parcels_AspNetUsers_UserId",
                table: "Parcels");

            migrationBuilder.DropForeignKey(
                name: "FK_Status_Parcels_ParcelTrackingNumber",
                table: "Status");

            migrationBuilder.DropIndex(
                name: "IX_Parcels_UserId",
                table: "Parcels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Status",
                table: "Status");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Address",
                table: "Address");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Parcels");

            migrationBuilder.RenameTable(
                name: "Status",
                newName: "Statuses");

            migrationBuilder.RenameTable(
                name: "Address",
                newName: "Addresses");

            migrationBuilder.RenameColumn(
                name: "ShipperID",
                table: "Parcels",
                newName: "ShipperId");

            migrationBuilder.RenameIndex(
                name: "IX_Status_ParcelTrackingNumber",
                table: "Statuses",
                newName: "IX_Statuses_ParcelTrackingNumber");

            migrationBuilder.AlterColumn<int>(
                name: "ShippingAddressId",
                table: "Parcels",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "ShipmentDate",
                table: "Parcels",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<string>(
                name: "ParcelTrackingNumber",
                table: "Statuses",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Statuses",
                table: "Statuses",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Addresses",
                table: "Addresses",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Parcels_ShipperId",
                table: "Parcels",
                column: "ShipperId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Addresses_AddressId",
                table: "AspNetUsers",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Parcels_Addresses_DeliveryAddressId",
                table: "Parcels",
                column: "DeliveryAddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Parcels_Addresses_ShippingAddressId",
                table: "Parcels",
                column: "ShippingAddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Parcels_AspNetUsers_ShipperId",
                table: "Parcels",
                column: "ShipperId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Statuses_Parcels_ParcelTrackingNumber",
                table: "Statuses",
                column: "ParcelTrackingNumber",
                principalTable: "Parcels",
                principalColumn: "TrackingNumber",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Addresses_AddressId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Parcels_Addresses_DeliveryAddressId",
                table: "Parcels");

            migrationBuilder.DropForeignKey(
                name: "FK_Parcels_Addresses_ShippingAddressId",
                table: "Parcels");

            migrationBuilder.DropForeignKey(
                name: "FK_Parcels_AspNetUsers_ShipperId",
                table: "Parcels");

            migrationBuilder.DropForeignKey(
                name: "FK_Statuses_Parcels_ParcelTrackingNumber",
                table: "Statuses");

            migrationBuilder.DropIndex(
                name: "IX_Parcels_ShipperId",
                table: "Parcels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Statuses",
                table: "Statuses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Addresses",
                table: "Addresses");

            migrationBuilder.RenameTable(
                name: "Statuses",
                newName: "Status");

            migrationBuilder.RenameTable(
                name: "Addresses",
                newName: "Address");

            migrationBuilder.RenameColumn(
                name: "ShipperId",
                table: "Parcels",
                newName: "ShipperID");

            migrationBuilder.RenameIndex(
                name: "IX_Statuses_ParcelTrackingNumber",
                table: "Status",
                newName: "IX_Status_ParcelTrackingNumber");

            migrationBuilder.AlterColumn<int>(
                name: "ShippingAddressId",
                table: "Parcels",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ShipmentDate",
                table: "Parcels",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Parcels",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ParcelTrackingNumber",
                table: "Status",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Status",
                table: "Status",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Address",
                table: "Address",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Parcels_UserId",
                table: "Parcels",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Address_AddressId",
                table: "AspNetUsers",
                column: "AddressId",
                principalTable: "Address",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Parcels_Address_DeliveryAddressId",
                table: "Parcels",
                column: "DeliveryAddressId",
                principalTable: "Address",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Parcels_Address_ShippingAddressId",
                table: "Parcels",
                column: "ShippingAddressId",
                principalTable: "Address",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Parcels_AspNetUsers_UserId",
                table: "Parcels",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Status_Parcels_ParcelTrackingNumber",
                table: "Status",
                column: "ParcelTrackingNumber",
                principalTable: "Parcels",
                principalColumn: "TrackingNumber");
        }
    }
}
