using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class AddPersonalDetailsToParcel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryDate",
                table: "Parcels");

            migrationBuilder.DropColumn(
                name: "ShipmentDate",
                table: "Parcels");

            migrationBuilder.AddColumn<int>(
                name: "ReceiverDetailsId",
                table: "Parcels",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ShipperDetailsId",
                table: "Parcels",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Parcels_ReceiverDetailsId",
                table: "Parcels",
                column: "ReceiverDetailsId");

            migrationBuilder.CreateIndex(
                name: "IX_Parcels_ShipperDetailsId",
                table: "Parcels",
                column: "ShipperDetailsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Parcels_RecipientDetails_ReceiverDetailsId",
                table: "Parcels",
                column: "ReceiverDetailsId",
                principalTable: "RecipientDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Parcels_RecipientDetails_ShipperDetailsId",
                table: "Parcels",
                column: "ShipperDetailsId",
                principalTable: "RecipientDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Parcels_RecipientDetails_ReceiverDetailsId",
                table: "Parcels");

            migrationBuilder.DropForeignKey(
                name: "FK_Parcels_RecipientDetails_ShipperDetailsId",
                table: "Parcels");

            migrationBuilder.DropIndex(
                name: "IX_Parcels_ReceiverDetailsId",
                table: "Parcels");

            migrationBuilder.DropIndex(
                name: "IX_Parcels_ShipperDetailsId",
                table: "Parcels");

            migrationBuilder.DropColumn(
                name: "ReceiverDetailsId",
                table: "Parcels");

            migrationBuilder.DropColumn(
                name: "ShipperDetailsId",
                table: "Parcels");

            migrationBuilder.AddColumn<DateTime>(
                name: "DeliveryDate",
                table: "Parcels",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ShipmentDate",
                table: "Parcels",
                type: "datetime2",
                nullable: true);
        }
    }
}
