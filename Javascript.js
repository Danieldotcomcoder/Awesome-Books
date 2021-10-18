const bookarray = [];
function Add() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;

  const booksinformation = { title, author };

  const newbook = Object.create(booksinformation);
  newbook.title = title;
  newbook.author = author;

  bookarray.push(newbook);
  const arraystringfy = JSON.stringify(bookarray);
  localStorage.setItem("bookarray", arraystringfy);
  const list = document.querySelector(".book-list");
  const row = document.createElement("li");

  row.innerHTML = ` 
 <h2>${newbook.title}</h2>
 <h2>${newbook.author}</h2>
 <button type="button" class="remove-btn" >Remove</button>`;

  list.appendChild(row);
}

function Display() {
  const storedarray = JSON.parse(localStorage.getItem("bookarray"));
  const list = document.querySelector(".book-list");

  for (let i in storedarray) {
    const row = document.createElement("li");
    row.innerHTML = ` 
   <h2>${storedarray[i].title}</h2>
   <h2>${storedarray[i].author}</h2>
   <button type="button" class="remove-btn">Remove</button>`;

    list.appendChild(row);
  }
  
}

Display();


function Remove() {
  const list = document.querySelector(".book-list");
  const lists = list.querySelectorAll("li");
  const removebtn = list.querySelectorAll("button");

  removebtn.forEach(  function (_button,i) { 
    
    removebtn[i].addEventListener("click", (e) =>  {
         list.removeChild(lists[i]),
         console.log("hello")
    })});
}


Remove();




