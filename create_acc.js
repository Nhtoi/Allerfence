let signupBtn = document.getElementById("signup-btn")

signupBtn.addEventListener("click", function HandleSignUp(event){
    //prevent page from refreshing when button is clicked 
    //I have this added for the time being later on we have to remove it
    //ideally when button is clicked it will redirect to another page anyways
    event.preventDefault()
    console.log("Handle Sign-Up")
})