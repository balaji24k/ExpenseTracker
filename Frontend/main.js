window.addEventListener("DOMContentLoaded", () => {
  axios.get("http://localhost:4000/expenses")
    .then((res) => {
    // console.log(res.data, "after refresh");
      res.data.forEach((data) => {
      showOnScreen(data);
    });
  });
});

const submitHandler = (event) => {
  event.preventDefault();
  const id = event.target.id.value;
  const expense = event.target.expense.value;
  const description = event.target.description.value;
  const price = event.target.price.value;

  const data = { expense, description, price };
  console.log(id, "id before condition")
  if (id) {
    console.log("inside put")
    axios.put(`http://localhost:4000/expenses/${id}`, {
      expense : expense,
      description : description,
      price : price
    }).then(res => {
      document.getElementById("id").value = "";
      document.getElementById("expense").value = "";
      document.getElementById("description").value = "";
      document.getElementById("price").value = "";
      console.log(res.data,"after update")
      showOnScreen(res.data);
    })
    return
  }
  console.log("inside post")
  axios.post("http://localhost:4000/expenses", data)
    .then((res) => {
      console.log(res.data, "after post");
      document.getElementById("id").value = "";
      document.getElementById("expense").value = "";
      document.getElementById("description").value = "";
      document.getElementById("price").value = "";
      showOnScreen(res.data);
    });

  // showOnScreen(data);
};

const showOnScreen = (data) => {
  const parent = document.getElementById("list");
  // console.log(data,"showOnScreen")
  const child = `<li id=${data.id}>
      ${data.expense} -- ${data.description} -- ${data.price}
      <button onclick=editHandler('${data.id}','${data.description}','${data.expense}','${data.price}')>Edit</button> 
      <button onclick=deleteHandler('${data.id}')>
        Delete
      </button>
    </li>`;
  parent.innerHTML = parent.innerHTML + child;
};

const editHandler = (id, description, expense, price) => {
  // console.log(description,expense,price, "edit")
  document.getElementById("id").value = id;
  document.getElementById("expense").value = expense;
  document.getElementById("description").value = description;
  document.getElementById("price").value = price;
  removeFromScreen(id);
};

const deleteHandler = (id) => {
  removeFromScreen(id);
  axios.delete(`http://localhost:4000/expenses/${id}`)
    .then((res) => {
      console.log(res.data, "delete req");
    });
};

const removeFromScreen = (id) => {
  const parent = document.getElementById("list");
  const child = document.getElementById(id);
  parent.removeChild(child);
};
