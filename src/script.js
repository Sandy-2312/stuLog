//Accessing elements using their IDs for toggle Add Student form
const button = document.getElementById("add-student-button");
const dropDown = document.getElementById("add-student-dropdown");
const addBtn = document.getElementById("addNewBtn");


//Display add form on clicking Add New Student Button
button.addEventListener("click", () => {
  dropDown.classList.toggle("hidden");
});

//Hide add form when clicking outside
window.addEventListener("click", (e) => {
  if (!button.contains(e.target) && !dropDown.contains(e.target)) {
    dropDown.classList.add("hidden");
  }
});

//Hide add form on clicking Add button
addBtn.addEventListener("click", (e) => {
  dropDown.classList.add("hidden");
});



//Accessing table and form elements using their IDs
const tableBody = document.getElementById("tableBody");
const form = document.getElementById('studentForm');

//Accessing elements using their IDs for adding data to Table
const Name = document.getElementById('name');
const Student_ID = document.getElementById('student_id');
const Email = document.getElementById('email');
const Contact = document.getElementById('contact');

//Accessing elements using their IDs for updating student data
const Name2 = document.getElementById('name2');
const Student_ID2 = document.getElementById('student_id2');
const Email2 = document.getElementById('email2');
const Contact2 = document.getElementById('contact2');
const SaveEditBtn = document.getElementById("saveEditBtn");



//Declaring the variables to hold student data
let studentList = [];
let currentStudentEditID = null;



//Creating the table input rows and cells with inputs from studentList variable
const renderTable = () => {
    tableBody.innerHTML = ""; //Removing table data before rendering details
    studentList.map((student) => {
        return tableBody.innerHTML += `<tr id=${student.id} class="border">
            <td class="p-1 border text-center">${student.name}</td>
            <td class="p-1 border text-center">${student.student_id}</td>
            <td class="p-1 border text-center">${student.email}</td>
            <td class="p-1 border text-center">${student.contact}</td>
            <td class="p-1 border text-center">
                <a href="#saveEditBtn">
                <i class="cursor-pointer fa-solid fa-pen-to-square fa-lg pl-5" style="color: #0C4767;" title="Edit student details"></i>
                </a>
                <i class="cursor-pointer fa-solid fa-trash fa-lg mx-5" style="color: #BB4430;" title="Delete student details"></i>
            </td>
        </tr>`;
    });
}


//Adding new Student data and storing form data in local storage to retreive on page load
form.addEventListener("submit", (e) => {
    e.preventDefault(); //Preventing default form submission

    //Collecting student data values from add new student form to be pushed to studentList variable
    const studentData = {
        name: Name.value,
        student_id: Student_ID.value,
        email: Email.value,
        contact: Contact.value,
        id: currentStudentEditID !== null ? currentStudentEditID : studentList.length  //Updating student data id
    };
  
    studentList.push(studentData);                                 //Adding new student data to studentList variable
    renderTable();                                                 //Rendering the table with the new data
    localStorage.setItem("students", JSON.stringify(studentList)); //Storing the data in local storage
    form.reset();                                                  //Resetting the form fields
});

//Retrieving and rendering the data from local storage on page load
window.addEventListener("DOMContentLoaded", () => {
    const storedStudents = JSON.parse(localStorage.getItem("students"));
    if (storedStudents) {
        studentList = storedStudents; // Assigning the stored data from local storage to the studentList variable
        renderTable();                // Rendering the table with the stored data
    }
});


//Adding functionality to edit and delete buttons
tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-pen-to-square")) {
        
        // Edit Button
        const row = e.target.closest("tr");                                              //Finding the nearest element in DOM Tree
        if (!row) return;                                                                //Return, if row does not exist
        currentStudentEditID = row.id;                                                   //Retrieving and storing the ID of the student being edited
        const student = studentList.find(student => student.id == currentStudentEditID); //Finding the student to edit
        //Updating target row data values to update form data
        Name2.value = student.name;
        Student_ID2.value = student.student_id;
        Email2.value = student.email;
        Contact2.value = student.contact;
        
    } else if (e.target.classList.contains("fa-trash")) {

        // Delete Button
        const row = e.target.closest("tr");
        if (!row) return;
        const id = row.id;                                             //Storing target row ID
        studentList = studentList.filter(student => student.id != id); //Filtering out the rows of ID other than target
        localStorage.setItem("students", JSON.stringify(studentList)); //Updating local storage with new filtered list in student list variable
        renderTable();                                                 // Rendering the table with the updated data
    }
});




//Update student data when Save button is clicked in the second form
SaveEditBtn.addEventListener("click", () => {
  if (currentStudentEditID !== null) {
    //Collecting student data values from update student form to be pushed to studentList variable
    const updatedStudent = {
      id: currentStudentEditID,
      name: Name2.value,
      student_id: Student_ID2.value,
      email: Email2.value,
      contact: Contact2.value
    };

    //Replace the existing student list variable with the updated one
    studentList = studentList.map(student =>
      student.id == currentStudentEditID ? updatedStudent : student
    );

    localStorage.setItem("students", JSON.stringify(studentList));       //Save to localStorage
    renderTable();                                                       //Render updated table

    //Scroll to the updated student's row after change is submitted
    const studentRow = document.getElementById(currentStudentEditID);    //Getting element by current id of data being updated
    studentRow.scrollIntoView({ behavior: "smooth", block: "center" });  //Scroll into view of target id, while showing the scrool smoothly and keeping the target id element at center of screen view on reaching
  }

});