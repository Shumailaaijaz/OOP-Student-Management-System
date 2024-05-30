// object orinted porject
import inquirer from 'inquirer';
// define the student class
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; //initialize the courses
        this.balance = 1000;
    }
    // method to enroll a student in a course
    enroll_course(course) {
        this.courses.push(course);
    }
    // method to view a student balance
    view_balance() {
        console.log(`Balacne for ${this.name} :$${this.balance}`);
    }
    // method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} Fees paid successfully for ${this.name}`);
        console.log(`Remaining balance: $${this.balance}`);
    }
    // method to display student status
    show_status() {
        console.log(`ID:${this.id}`);
        console.log(`Name:${this.name}`);
        console.log(`course:${this.courses}`);
        console.log(`Balance:${this.balance}`);
    }
}
// defining a student_manager class to manage students.
class Student_manager {
    students;
    constructor() {
        this.students = []; //save all students dateadded
    }
    // method to add a new student
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`student : ${name} added successfully.student ID: ${student.id}`);
    }
    // Method to enroll a student in a course
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name}, enrolled in ${course} successfully.`);
        }
    }
    // method to view a student's balance  
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("student not found. Please enter a correct student ID");
        }
    }
    // method to pay student fees
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("student not found. Please enter a correct student ID");
        }
    }
    // method to display student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    // method to find a student by student_id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
// main function to run the program
async function main() {
    console.log("welcome to 'Shumaila's' - Student Management System");
    console.log("-".repeat(60));
    let student_manager = new Student_manager();
    // while loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
        // using switch case to handle user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter Student Name",
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student iD",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a course name",
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay"
                    }
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
                break;
        }
    }
}
// calling a main function
main();
