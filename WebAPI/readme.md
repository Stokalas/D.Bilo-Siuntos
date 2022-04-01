# .NET WEB API & Database

## Database setup

1. Download and install SQL **Express** [Here](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
2. During installation keep everything as default.
3. Download and install SSMS [Here](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15)
4. (*Optional*) You can try connecting to the empty Database using SSMS.
5. Launch WEB API application as this will run migrations on database (if you have kept the settings as default during instalation of SQL Express default `connectionString` in `appSettings.json` should work).
6. (*Optional*) If you've used custom naming of DB during instalation change that in `appSettings.json`, but **DON'T COMMIT AND PUSH THIS CHANGE** (later we will have 2 appSettings files so one will be for local config and you won' be able to commit it, so will be safe :) )
7. Connect to the Database using SSMS and check if migrations created needed infrastructure.