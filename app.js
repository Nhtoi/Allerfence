let signupBtn = document.getElementById("signup-btn")
let loginBtn = document.getElementById("login-btn")
let settingBtn = document.getElementById("settings-btn")

signupBtn.addEventListener("click", function SignUp(){
    window.location.href = "create_acc.html";
})

loginBtn.addEventListener("click", function LogIn(){
    window.location.href = "login.html";
})


settingBtn.addEventListener("click", function Settings(){
    console.log("clicked settings")
})