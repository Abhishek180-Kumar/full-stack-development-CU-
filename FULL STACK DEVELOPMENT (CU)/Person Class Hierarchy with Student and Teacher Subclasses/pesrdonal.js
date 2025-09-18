// Base class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  displayInfo() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

// Student subclass
class Student extends Person {
  constructor(name, age, course) {
    super(name, age); // call Person constructor
    this.course = course;
  }

  // Overriding displayInfo method
  displayInfo() {
    return `${super.displayInfo()}, Course: ${this.course}`;
  }
}

// Teacher subclass
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age); // call Person constructor
    this.subject = subject;
  }

  // Overriding displayInfo method
  displayInfo() {
    return `${super.displayInfo()}, Subject: ${this.subject}`;
  }
}

// Create instances
const student1 = new Student("Abhishek", 20, "Computer Science");
const teacher1 = new Teacher("Dr. Sharma", 45, "Software Engineering");

// Demonstrating method calls
console.log(student1.displayInfo()); 
// Output: Name: Abhishek, Age: 20, Course: Computer Science

console.log(teacher1.displayInfo()); 
// Output: Name: Dr. Sharma, Age: 45, Subject: Software Engineering
