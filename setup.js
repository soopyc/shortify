import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';

const environment = process.env.NODE_ENV ?? "development"

// check if file already exists and prevent overwriting values
// technically i can put .answers to the questions/the Prompt but that requires more Effort and i am Lazy as Hell so i am not going to do that
if (fs.existsSync(`config/local-${environment}.json`)) {
    // Spot the python developer
    const {remake} = await inquirer.prompt([{type: "confirm", name: "remake", message: "A config file already exists. Do you still want to make a new one?", default: false}])
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
    questions.push({type: "input", name: "db.url", message: "Database connection string:", validate: nonEmpty})
} else if (modes.db === 'Credentials') {
    questions.push({type: "input", name: "db.host", message: "Database host:", validate: nonEmpty})
    questions.push({type: "number", name: "db.port", message: "Database port:", default: 5432, validate: nonEmpty})
    questions.push({type: "input", name: "db.database", message: "Database name:", validate: nonEmpty})
    questions.push({type: "input", name: "db.user", message: "Database user:", validate: nonEmpty})
    questions.push({type: "password", name: "db.password", message: "Database password:", validate: nonEmpty})
}

questions.push({type: "input", name: "contact.email", message: "Contact: Your contact email:"})

questions.push({type: "number", name: "ratelimit.period", message: "Ratelimiting: rate limit period in seconds:", default: 60})
questions.push({type: "number", name: "ratelimit.maxReq", message: "Ratelimiting: max requests per period per ip:", default: 10})

const ans = await inquirer.prompt(questions)

fs.writeFileSync(`config/local-${environment}.json`, JSON.stringify(ans, null, 4))
console.log(chalk.green("✔"), `Wrote config to config/local-${environment}.json`)
