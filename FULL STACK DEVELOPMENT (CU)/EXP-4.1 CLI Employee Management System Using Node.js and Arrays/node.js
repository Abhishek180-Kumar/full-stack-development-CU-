// employeeManagement.js

const readline = require('readline');

// Create interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Array to store employees
let employees = [];

// Function to display menu
function showMenu() {
    console.log('\n=== Employee Management System ===');
    console.log('1. Add Employee');
    console.log('2. List All Employees');
    console.log('3. Remove Employee by ID');
    console.log('4. Exit');
    rl.question('Choose an option: ', handleMenu);
}

// Handle user menu choice
function handleMenu(option) {
    switch(option) {
        case '1':
            addEmployee();
            break;
        case '2':
            listEmployees();
            break;
        case '3':
            removeEmployee();
            break;
        case '4':
            console.log('Exiting... Goodbye!');
            rl.close();
            break;
        default:
            console.log('Invalid option! Please choose 1-4.');
            showMenu();
    }
}

// Add a new employee
function addEmployee() {
    rl.question('Enter Employee ID: ', (id) => {
        rl.question('Enter Employee Name: ', (name) => {
            employees.push({ id: id.trim(), name: name.trim() });
            console.log(`Employee ${name} added successfully!`);
            showMenu();
        });
    });
}

// List all employees
function listEmployees() {
    console.log('\n--- Employee List ---');
    if(employees.length === 0) {
        console.log('No employees found.');
    } else {
        employees.forEach(emp => {
            console.log(`ID: ${emp.id}, Name: ${emp.name}`);
        });
    }
    showMenu();
}

// Remove employee by ID
function removeEmployee() {
    rl.question('Enter Employee ID to remove: ', (id) => {
        const index = employees.findIndex(emp => emp.id === id.trim());
        if(index !== -1) {
            const removed = employees.splice(index, 1);
            console.log(`Employee ${removed[0].name} removed successfully!`);
        } else {
            console.log('Employee not found!');
        }
        showMenu();
    });
}

// Start the application
showMenu();
