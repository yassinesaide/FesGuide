const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

// Read the SQL file
const sqlFilePath = path.join(__dirname, "src", "config", "database.sql");
const sqlScript = fs.readFileSync(sqlFilePath, "utf8");

// Create a connection to MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  multipleStatements: true, // This allows multiple SQL statements in one query
});

// Execute the SQL script
connection.query(sqlScript, (err, results) => {
  if (err) {
    console.error("Error executing SQL script:", err);
    process.exit(1);
  }

  console.log("Database setup completed successfully!");
  connection.end();
});
