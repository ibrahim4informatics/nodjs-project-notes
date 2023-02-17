const addBtn = document.getElementById('addNote');
const deleteFormBtn = document.getElementById('deleteForm');
const formAdd = document.getElementById('formAdd');

addBtn.addEventListener('click', (e)=>{
    formAdd.classList.add("show");
    formAdd.classList.remove("hide");
});

deleteFormBtn.addEventListener("click", (e)=>{
    formAdd.classList.add("hide")
    formAdd.classList.remove("show")
})