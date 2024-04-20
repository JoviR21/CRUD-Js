var selectedRow = null;

// Show Alert
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Clear All Fields 
function clearFields(){
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#studentAddress").value = "";
    document.querySelector("#rollNo").value = "";
}

// Add Data
document.querySelector("#student-form").addEventListener("submit", (e) =>{
    e.preventDefault();

    // Get Form Values 
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const studentAddress = document.querySelector("#studentAddress").value;
    const rollNo = document.querySelector("#rollNo").value;

    // Validate 
    if(firstName == "" || lastName == "" || studentAddress == "" || rollNo == "" ){
        showAlert("Please fill in all fields", "danger");
    }
    else{
        if(selectedRow == null){
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${studentAddress}</td>
            <td>${rollNo}</td>
            <td class="d-sm-flex d-grid gap-3 gap-sm-2">
                <a href="#" class="btn btn-sm btn-warning edit">Edit</a>
                <a href="#" class="btn btn-sm btn-danger delete">Delete</a>
            `;
            list.appendChild(row);
            selectedRow("Student Added", "success")
        }
        else{
            selectedRow.children[0].textContent =  firstName;
            selectedRow.children[1].textContent =  lastName;
            selectedRow.children[2].textContent =  studentAddress;
            selectedRow.children[3].textContent =  rollNo;
            selectedRow = null;
            showAlert("Student Info Edited", "info");
        }
    }
});

// Edit Data 
document.querySelector("#student-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#studentAddress").value = selectedRow.children[2].textContent;
        document.querySelector("#firstName").value = selectedRow.children[3].textContent;
    }
});

// Delete Data
document.querySelector("#student-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");
    }
});