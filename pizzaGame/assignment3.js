/*
 * This program is designed as a game called "find the pizza"
 * there is a picture of pizza that is hidden after the first click
 * when the mouse hovers over the picture it becomes visible
 * 
 * The user must click on the picture while hovering over it to score a point
 * 
 * If the user scrolls past without clicking, the game is over
 * 
 * The eyes of the background image follows the general direction of the pizza (not exactly, but reasonably accuratley)
 * 
 */

window.addEventListener("load", function(){

/*
 * User class: creates a "User" object that contains a name, age, abd color
 */
class User{
        constructor(name, age, color){
            this.name = name;
            this.age = age;
            this.color = color;
        }
    }

/*
 * clickedIt function: Connected to the "submit" button on the form
 * this function takes all of the information that has been input into the form
 * the information is then used to create a "User" with the variable name "player"
 * finally the header is switched to display "Find the pizza (users name) !"
 */
var player; //variable that makes the "player" globally reachable
let gameStart = false;
    function clickedIt() {
        let tempName = document.forms.gameInfo.name.value;
        let age = document.forms.gameInfo.age.value;
        let color = document.forms.gameInfo.color.value;
        player = new User(tempName, age, color);
        if (tempName !== ""){
        document.getElementById("gameForm").style.visibility = "hidden";
        document.getElementById("gameForm").style.zIndex = "-1";
        document.getElementById("container").style.zIndex ="1000";
        document.getElementById("header").textContent = "Find the pizza " + tempName + "!";
        gameStart = true;
    }
    }
    
    

 
    
    
    let pic = document.getElementById("pic"); // the image of pizza that will be "Found"
    let container = document.getElementById("container"); // the container for the pizza that will be randomly moved around
    let score = 0; // The score that will be updated every tiem the pizza is found
    let once = false; // Variable that makes sure the pizza cant be clicked multiple times per instance of being found
    let tempLeft = 0; //The temporary "left" variable for the css of the container object
    let tempTop = 0; // The temporary "top" variable for the css of the container object
    let eyes = document.getElementById("eyeContainer"); // the container for the pupils of the eyes
    let help = document.getElementById("helpMe"); //the helpMe button
    let clickMe = document.getElementById("clickMe"); // the clickMe button
    
    /*
     * when the "clickMe" button is clicked, the "clickedIt" function is called
     */
    clickMe.addEventListener("click", clickedIt);


/*
 * Function that is activated once the mouse goes over the container object
 * sets the "once" variable to false
 * sets the pizza to "visible"
 */
let over = false;
    container.addEventListener("mouseover", function(){
        once = false;
        pic.style.visibility = "visible";
        over = true;
    });
    
    /*
     * Makes the picture change once it is found and clicked
     * Calls the "changePicture" function
     */
    pic.addEventListener("click", changePicture);
    
    /*
     * Mouseout event listener for the picture of pizza
     * resets the picture to normal
     * sets the position of the pizza to a random spot on the page
     * 
     * Makes the eyes of the chef point to the quarter of the screen that the pizza arrives in
     * Sets the pizza to invisible
     * 
     * If statement that indicates that if the mouse leaves the picture without the pizza being clicked, its game over.
     */
    pic.addEventListener("mouseout", function() {
        this.src = "stockpizza.jpeg";
        tempLeft = Math.floor((Math.random() * 1299) +1);
        tempTop = Math.floor((Math.random() * 832) +1);
        container.style.left =  tempLeft + "px";
        container.style.top = tempTop + "px";
        
        //looks left/up
        if((tempLeft <= 670) && (tempTop <= 198)){
            eyes.style.left = "964px";
            eyes.style.top = "275px";
        }
        //looks left/down
        else if ((tempLeft <= 670) && (tempTop > 198)){
            eyes.style.left = "964px";
            eyes.style.top = "288px";
        }
        //looks right/down
        else if ((tempLeft > 670) && (tempTop > 226)){
            eyes.style.left = "975px";
            eyes.style.top = "288px";
        }
        //looks right/up
        else if ((tempLeft > 670) && (tempTop < 86)){
            eyes.style.left = "975px";
            eyes.style.top = "275px";
        }
        //looks straight
        else if(tempLeft >670 && tempLeft<=1020 && tempTop > 86 && tempTop <=226){
            eyes.style.left ="970px";
            eyes.style.top = "280px";
        }
        
        pic.style.visibility = "hidden"; // makes the pizza picture invisible
        
        if (over === true){
            document.getElementById("container").style.zIndex = "-1";
            document.getElementById("header").textContent = "Game over! Your final score is " + score + "!";
            document.getElementById("header").style.backgroundColor = player.color;
            document.getElementById("header").style.height = "100px";
        }
    
});

/*
 * changePicture function: Changes the picture of pizza to "shocked pizza" indicating that it has been clicked
 * updates the score and displays it on the header
 * makes sure the score can only be updated once
 */
function changePicture() {
    
    let node = document.getElementById("pic");
    let scoreText = document.getElementById("score");
    node.src = "shockedpizza.jpg";
        if(once === false){
        score++;
        once = true;
        }
    scoreText.textContent = "Score: " + score;
    over = false;
}

let helpOn= false; // indicates whether or not the "help" button is activated

/*
 * helpMe function: when the "help" button is clicked, this function is activated and the help text is presented
 * when clicked a second time, the help information disappears
 */
function helpMe(){
    let help = document.getElementById("help");
    if(helpOn === false && gameStart === true){
        help.innerHTML = "Find the hidden pizza!<br>Hidden until you hover over it, you must click the pizza to get a point! <br> If you glide over the pizza without giving it a click, its game over. <br> The chefs eyes will give you a hint as to where the pizza might be! <br> Good luck!";
        helpOn = true;
    }
    else if (helpOn === true){
        help.textContent = "";
        helpOn = false;
    }
    
    
}

help.addEventListener("click", helpMe);

    
});