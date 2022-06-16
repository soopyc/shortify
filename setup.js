import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';

// check if file already exists and prevent overwriting values
// technically i can put .answers to the questions/the Prompt but that requires more Effort and i am Lazy as Hell so i am not going to do that
if (fs.existsSync('config.json')) {
    // Spot the python developer
    const {remake} = await inquirer.prompt([{type: "confirm", name: "remake", message: "A config.json file already exists. Do you still want to make a new one?", default: false}])
    if (!remake) {
        process.exit(0)
    }
}

const modes = await inquirer.prompt([
    {type: "list", name: "db", message: "Database connection method:", choices: ['Connection String', 'Credentials']}
])
function nonEmpty(input) {return input === "" ? "Please enter something" : true}

const questions = []

if (modes.db === 'Connection String') {
    questions.push({type: "input", name: "db.connection_string", message: "Database connection string:", validate: nonEmpty})
} else if (modes.db === 'Credentials') {
    questions.push({type: "input", name: "db.host", message: "Database host:", validate: nonEmpty})
    questions.push({type: "input", name: "db.port", message: "Database port:", default: "5432", validate: nonEmpty})
    questions.push({type: "input", name: "db.database", message: "Database name:", validate: nonEmpty})
    questions.push({type: "input", name: "db.user", message: "Database user:", validate: nonEmpty})
    questions.push({type: "password", name: "db.password", message: "Database password:", validate: nonEmpty})
}

const ans = await inquirer.prompt(questions)

fs.writeFileSync('config.json', JSON.stringify(ans, null, 4))
console.log(chalk.green("✔"), "Wrote config to config.json")
