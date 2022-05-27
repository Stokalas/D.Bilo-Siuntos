using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class ChangeParcelAddressStructure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Parcels_Addresses_ShippingAddressId",
                table: "Parcels");

            migrationBuilder.DropForeignKey(
                name: "FK_Parcels_Terminals_TerminalId",
                table: "Parcels");

            migrationBuilder.DropIndex(
                name: "IX_Parcels_ShippingAddressId",
                table: "Parcels");

            migrationBuilder.DropColumn(
                name: "ShippingAddressId",
                table: "Parcels");

            migrationBuilder.RenameColumn(
                name: "TerminalId",
                table: "Parcels",
                newName: "PickupTerminalId");

            migrationBuilder.RenameIndex(
                name: "IX_Parcels_TerminalId",
                table: "Parcels",
                newName: "IX_Parcels_PickupTerminalId");

            migrationBuilder.AlterColumn<int>(
                name: "DeliveryAddressId",
                table: "Parcels",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "DeliveryTerminalId",
                table: "Parcels",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PickupAddressId",
                table: "Parcels",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Parcels_DeliveryTerminalId",
                table: "Parcels",
                column: "DeliveryTerminalId");

            migrationBuilder.CreateIndex(
                name: "IX_Parcels_PickupAddressId",
                table: "Parcels",
                column: "PickupAddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Parcels_Addresses_PickupAddressId",
                table: "Parcels",
                column: "PickupAddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Parcels_Terminals_DeliveryTerminalId",
                table: "Parcels",
                column: "DeliveryTerminalId",
                principalTable: "Terminals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Parcels_Terminals_PickupTerminalId",
                table: "Parcels",
                column: "PickupTerminalId",
                principalTable: "Terminals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Parcels_Addresses_PickupAddressId",
                table: "Parcels");

            migrationBuilder.DropForeignKey(
                name: "FK_Parcels_Terminals_DeliveryTerminalId",
                table: "Parcels");

            migrationBuilder.DropForeignKey(
                name: "FK_Parcels_Terminals_PickupTerminalId",
                table: "Parcels");

            migrationBuilder.DropIndex(
                name: "IX_Parcels_DeliveryTerminalId",
                table: "Parcels");

            migrationBuilder.DropIndex(
                name: "IX_Parcels_PickupAddressId",
                table: "Parcels");

            migrationBuilder.DropColumn(
                name: "DeliveryTerminalId",
                table: "Parcels");

            migrationBuilder.DropColumn(
                name: "PickupAddressId",
                table: "Parcels");

            migrationBuilder.RenameColumn(
                name: "PickupTerminalId",
                table: "Parcels",
                newName: "TerminalId");

            migrationBuilder.RenameIndex(
                name: "IX_Parcels_PickupTerminalId",
                table: "Parcels",
                newName: "IX_Parcels_TerminalId");

            migrationBuilder.AlterColumn<int>(
                name: "DeliveryAddressId",
                table: "Parcels",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ShippingAddressId",
                table: "Parcels",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Parcels_ShippingAddressId",
                table: "Parcels",
                column: "ShippingAddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Parcels_Addresses_ShippingAddressId",
                table: "Parcels",
                column: "ShippingAddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Parcels_Terminals_TerminalId",
                table: "Parcels",
                column: "TerminalId",
                principalTable: "Terminals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
