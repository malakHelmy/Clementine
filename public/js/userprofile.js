const userlist =[
    {"name":"Lana Frouk", "id": "#45451", "email":"lana@gmail.com", "age": 34,"number":"01233444", "password":"psw1"},
    { "name":"Ahmed Ayman", "id": "#59402", "email":"ahmed@gmail.com", "age": 22,"number":"01234894","password":"psw2"},
    { "name":"Tala Mostafa", "id": "#49593",  "email":"tala@gmail.com", "age": 42,"number":"0102938","password":"psw3"},
    { "name":"Karem Belal", "id": "#054054", "email":"karem@gmail.com", "age": 39,"number":"01124943","password":"psw4"},
    { "name":"Yara Eissa", "id": "#054054", "email":"yara@gmail.com", "age": 32,"number":"01124943","password":"psw5"},
    { "name":"Marina Nader", "id": "#054054", "email":"marina@gmail.com", "age": 51,"number":"01174743","password":"psw6"},
    { "name":"Rawan Belal", "id": "#054054", "email":"rawa@gmail.com", "age": 38,"number":"01124943","password":"psw7"},
]
const us_name = document.getElementById("user");
const us_email = document.getElementById("usemail");

// window.onload = function(){
//     welcomeUser('user@gmail.com');
//     displayEmail('Lana');

//  }


function welcomeUser(email){
    const customer = userlist.find((val,idx,arr) => {return val.email = email});
    if(customer){
        us_name.innerHTML = customer.name;
    }
}



function displayEmail(name){
    const customer = userlist.find((val,idx,arr) => {return val.name = name});
    if(customer){
        us_email.innerHTML = customer.email;
    }
}

