using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskManagementApp.Api.Migrations
{
    /// <inheritdoc />
    public partial class RmCreatedAtHasDV : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateAt",
                table: "TaskItems",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2025, 6, 20, 1, 0, 38, 849, DateTimeKind.Local).AddTicks(3015));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateAt",
                table: "TaskItems",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2025, 6, 20, 1, 0, 38, 849, DateTimeKind.Local).AddTicks(3015),
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }
    }
}
