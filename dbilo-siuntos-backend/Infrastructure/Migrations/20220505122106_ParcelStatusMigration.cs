using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class ParcelStatusMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Status",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParcelStatus = table.Column<int>(type: "int", nullable: false),
                    ParcelTrackingNumber = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Status", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Status_Parcels_ParcelTrackingNumber",
                        column: x => x.ParcelTrackingNumber,
                        principalTable: "Parcels",
                        principalColumn: "TrackingNumber");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Status_ParcelTrackingNumber",
                table: "Status",
                column: "ParcelTrackingNumber");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Status");
        }
    }
}
