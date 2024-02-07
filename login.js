let logIn = document.getElementById("login-btn")


logIn.addEventListener("click", function HandleLogIn(event){
    //prevent page from refreshing when button is clicked 
    //I have this added for the time being later on we have to remove it
    //ideally when button is clicked it will redirect to another page anyways
    event.preventDefault()
    console.log("Handle Log In")
})