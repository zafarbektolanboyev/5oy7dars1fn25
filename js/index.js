const form = document.getElementById('userForm');
const name = document.getElementById('name');
const surname = document.getElementById('surname');
const age = document.getElementById('age');
const btn = document.getElementById('btn');
const wrapper = document.getElementById('wrapper');

function validate(){
    if(name.value.length < 3){
        name.style.outlineColor = 'red';
        name.focus()
        return false;
    }
    if(surname.value.length < 3){
        surname.style.outlineColor = 'red';
        surname.focus()
        return false;
    }
    if(age.value.length < 0){
        age.style.outlineColor = 'red';
        age.focus()
        return false;
    }

    return true;
}

function getUsers(){
    let users = [];
    if(localStorage.getItem('users')){
        users = JSON.parse(localStorage.getItem('users'))
    }
    return users;
}

btn && btn.addEventListener('click', function(event){
    event.preventDefault();
    
    const isValid = validate();
    if(!isValid){
        return;
    }
    let users = getUsers();
    let user = {
        name:name.value,
        surname:surname.value,
        age: age.value,
        id:Date.now()
    }
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    form.reset();
    let card = creatCard(element);
    wrapper.innerHTML += card;
})

function creatCard(user){
    return `
        <div class="card">
            <h3>Ismi ${user.name}</h3>
            <h3>Familyasi ${user.surname}</h3>
            <h3>Yoshi ${user.age}</h3>
            <button data-id = "${user.id}" class="delete">Del</button>
        </div> 
    `
}
document.addEventListener('DOMContentLoaded', function(){
    let users = getUsers();
    users.length > 0 && users.forEach(element =>{
        let card = creatCard(element);
        wrapper.innerHTML += card;
    });
    const deleteBtn = document.querySelector('.delete');
    
    deleteBtn.length > 0 && deleteBtn.forEach(function(element){
        element.addEventListener('click', function(event){
            event.preventDefault();
            let id =this.getAtribute('data-id');
            let isDelete = confirm('Rostdanam o`chirasanmi');
            if(isDelete && id){
                let copiedUsers = JSON.parse(JSON.stringify(users));
                copiedUsers = copiedUsers.filter(function(el){
                    return el.id != id
                })
                localStorage.setItem('users', JSON.stringify(copiedUsers));
                window.location.reload();
            }
        })
    })
})
