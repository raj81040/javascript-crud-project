document.getElementById("dataForm").addEventListener("submit", addData);

function addData(event) {
  event.preventDefault();

  // Collect input values
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;

  const data = { id, name, age, email, address };

  // Get data from localStorage
  let storedData = JSON.parse(localStorage.getItem("data")) || [];

  // Add new data and update localStorage
  storedData.push(data);
  localStorage.setItem("data", JSON.stringify(storedData));
  document.getElementById("dataForm").reset();
  displayData();
}

function displayData() {
  const dataList = document.getElementById("dataList");
  const storedData = JSON.parse(localStorage.getItem("data")) || [];

  dataList.innerHTML = storedData
    .map(
      (item) => `
            <div class="item">
                <span>
                    <strong>ID:</strong> ${item.id} | 
                    <strong>Name:</strong> ${item.name} | 
                    <strong>Age:</strong> ${item.age} | 
                    <strong>Email:</strong> ${item.email} | 
                    <strong>Address:</strong> ${item.address}
                </span>
                <button onclick="deleteData('${item.id}')">Delete</button>
                <button onclick="editData('${item.id}', '${item.name}', '${item.age}', '${item.email}', '${item.address}')">Edit</button>
            </div>
        `
    )
    .join("");
}

function deleteData(id) {
  let storedData = JSON.parse(localStorage.getItem("data")) || [];
  storedData = storedData.filter((item) => item.id != id);
  localStorage.setItem("data", JSON.stringify(storedData));
  displayData();
}

function editData(id, name, age, email, address) {
  document.getElementById("id").value = id;
  document.getElementById("name").value = name;
  document.getElementById("age").value = age;
  document.getElementById("email").value = email;
  document.getElementById("address").value = address;
  deleteData(id); // Remove the old data before updating
}

window.onload = displayData;
