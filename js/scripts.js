/*
╔═╦═╗░░░░╔╗░░░░░╔══╗░░░░░░░░░░░░╔══╦══╦══╗
║║║║╠═╦═╦╣╠╦═╦╦╗║╔═╬═╗╔══╦═╗╔══╗╚║║╩╗╔╩║║╝
║║║║║╬║║║║═╣╩╣║║║╚╗║╬╚╣║║║╩╣╚══╝╔║║╗║║╔║║╗
╚╩═╩╩═╩╩═╩╩╩═╬╗║╚══╩══╩╩╩╩═╝░░░░╚══╝╚╝╚══╝
░░░░░░░░░░░░░╚═╝░░░░░░░░░░░░░░░░░░░░░░░░░░

*/
var score = -1;
//Audio Elems
var GameIntro = document.getElementById("GameIntro");
var GameTheme = document.getElementById("GameTheme");
var GameShot = document.getElementById("GameShot");
var GameBombRed = document.getElementById("GameBombRed");
var GameGolden = document.getElementById("GameGolden");
var GameScore = document.getElementById("GameScore");
var GameOver = document.getElementById("GameOver");
//Game Screen
var GameScreen = document.getElementById("full_game");
///////////////// Full Screen Mode /////////////////////////       

function openFullscreen() {
    if (GameScreen.requestFullscreen) {
        GameScreen.requestFullscreen();
    } else if (GameScreen.mozRequestFullScreen) { /* Firefox */
        GameScreen.mozRequestFullScreen();
    } else if (GameScreen.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        GameScreen.webkitRequestFullscreen();
    } else if (GameScreen.msRequestFullscreen) { /* IE/Edge */
        GameScreen.msRequestFullscreen();
    }
}
/////////////////// checking winning //////////////////////////////
function checkWin() {
    clearInterval(RowCreateID);
    for (iwin in boxesMap) {
        if ($("#Monkey_land").objectHitTest({ "object": $("#" + iwin) }) == false) {
            GameOver.play();
            $(".gameover").show();
        } else {
            $("#win_Name").text(namePlayer);
            $("#win_Score").text(score);
            $(".winner").show();
        }
    }
}
/////////////////// Checking Collison to Monkey land //////////////
function checkLandHit() {

    for (i in boxesMap) {
        if ($("#Monkey_land").objectHitTest({ "object": $("#" + i) }) == true) {
            $(".game").hide();
            GameOver.play();
            $(".gameover").show();
        }
    }

}
$(document).ready(function () {
    //debugger;
    
    //Solving Chrome issue to Start sound when user interact
    $(".form-control").on("click",function(){GameIntro.play();});
    //on click Start Game
    $("#Start_BTN").on("click", function () {
        openFullscreen();
        RowCreateID = setInterval(function () { CreateBoxes(9); checkLandHit(); }, 10000);
        namePlayer = document.getElementsByName("player-name")[0].value;
        levelOfGame = document.getElementsByName("choose")[0].value;
        if (namePlayer == "") {
            alert("Please Enter Name");
            document.getElementsByName("player-name").foucs();
        }
        GameIntro.pause();
        GameTheme.play();

        switch (levelOfGame) {
            case "easy":
                $(".login").hide();
                $(".game").show();
                gamemode(levelOfGame);
                //set score = 0
                setscore();
                break;
            case "normal":
                $(".login").hide();
                $(".game").show();
                gamemode(levelOfGame);
                //set score = 0
                setscore();
                break;
            default:
                alert("Please Choose Level");
                break;
        }
    });
});

/////////////////////////// Scoring /////////////////////////
/* function to set score*/
/*
    score = 0
*/
function setscore(score_point) {
    //GameScore.play();
    if (score_point == "Gold") {
        score = score + 3;

    } else if (score_point == "Bomb") {
        score = score + 9;

    } else {
        score = score + 1;
    }
    Update_Score();
}
function Update_Score() {
    $("#score").text(score);
}
/////////////////////////////////////////////////////////////
/* function to set timer by Game Level*/
/*
    level game == easy
    other == normal
*/
function gamemode(levelgame) {
    if (levelgame == "easy")
        counter(5);
    else
        counter(1);
}
///////////////////////////////////////////////////////////////////////////////////////////////////
/* function counter by game level*/
/*
    easy = number = 5 minuts
    normal = number = 1 minuts
*/
///////////////////////////////////////////////////////////////////////////////////////////////////
function counter(number) {
    $("#timer").text(number + " minuts");
    secondSpan = document.getElementById("second");
    minutspan = document.getElementById("minuts");
    counterSec = 0;
    counterMin = 0;
    ID = setInterval(function () {
        counterSec++;
        if (counterSec == 60) {
            counterSec = 0;
            counterMin++;
            //// when time is up ////  
            if (counterMin == number) {
                clearInterval(ID);
                $(".game").hide();
                
                checkWin();
      

            } else {
                if (counterMin < 10) {
                    minutspan.innerText = "0" + counterMin;
                } else {
                    minutspan.innerText = counterMin;
                }
            }
        }
        if (counterSec < 10) {
            secondSpan.innerText = "0" + counterSec;
        } else {
            secondSpan.innerText = counterSec;
        }
    }, 1000);
    $("#username").text(namePlayer);
    $("#gamelevel").text(levelOfGame);
}
///////////////////////////////////////////////////////////////////////////////////////////////////
//Game over Redirect To login Page
function gameover() {
    $(".gameover").hide();
    $(".game").hide();
    //$(".login").show();
    //call initial function
    initial();
}
// calling when  click  on button 
$(".gameover input").on("click", gameover);
//////////////////////////////////////////////////////////////////////////////
//boxfire
//$( "#draggable" ).draggable();
function createball() {
    var ball = document.createElement("div");
    ball.id = "ball";
    $(".boxOfGame").append(ball);
    $(ball).css("left", $("#main").css("left"))

}
leftmove = $(".boxOfGame").width();
rightmove = 600;
document.onkeyup = function (event) {
    console.log(event, leftmove, rightmove);
    switch (event.keyCode) {
        case 32:
         //check if ball exit
         if ($("#ball").length) {
            break;
        } else {
            createball();
            GameShot.play();
            $("#ball").animate({
                top: "0"
            }, {
                    duration: 400,
                    step: function () {
                        //************************** Checking Collison *************************
                        for (Game_box in boxesMap) {
                            if ($('#ball').objectHitTest({ "object": $("#" + Game_box) }) == true) {
                                //score 
                                if ($("#" + Game_box).hasClass("Red_Box")) {
                                    //Next and Prev Boxes ** Center Box **
                                    nextBox = $("#" + Game_box).next().css("visibility", "hidden");
                                    prevBox = $("#" + Game_box).prev().css("visibility", "hidden");
                                    //Delete from Map
                                    delete boxesMap[nextBox.attr('id')];
                                    delete boxesMap[prevBox.attr('id')];
                                    //Indexes to Move
                                    CenterParent = nextBox.parent();
                                    RightIndex = nextBox.index();
                                    LeftIndex = prevBox.index();
                                    CenterIndex = nextBox.index() - 1;

                                    // Getting the upper boxes
                                    UpperParent = CenterParent.prev();
                                    U_CenterBox = UpperParent.children().eq(CenterIndex).css("visibility", "hidden");
                                    U_RightBox = UpperParent.children().eq(RightIndex).css("visibility", "hidden");
                                    U_LeftBox = UpperParent.children().eq(LeftIndex).css("visibility", "hidden");
                                    //Delete from Map
                                    delete boxesMap[U_CenterBox.attr('id')];
                                    delete boxesMap[U_RightBox.attr('id')];
                                    delete boxesMap[U_LeftBox.attr('id')];
                                    //Getting the Lower Boxes
                                    LowerParent = CenterParent.next();
                                    L_CenterBox = LowerParent.children().eq(CenterIndex).css("visibility", "hidden");
                                    L_RightBox = LowerParent.children().eq(RightIndex).css("visibility", "hidden");
                                    L_LeftBox = LowerParent.children().eq(LeftIndex).css("visibility", "hidden");
                                    //Delete from Map
                                    delete boxesMap[L_CenterBox.attr('id')];
                                    delete boxesMap[L_RightBox.attr('id')];
                                    delete boxesMap[L_LeftBox.attr('id')];
                                    //Play Sound Effet
                                    GameBombRed.play();

                                    setscore("Bomb");
                                } else if ($("#" + Game_box).hasClass("Golden_Box")) {
                                    setscore("Gold");
                                    //Play Sound Effet
                                    GameGolden.play();
                                } else {
                                    setscore("Regular");
                                }

                                $("#" + Game_box).css("visibility", "hidden");
                                $('#ball').hide();
                                delete boxesMap[Game_box];
                            }
                        }
                    }
                    , complete: function () {
                        $(this).remove();
                    }
                })};
            break;
        case 37:
            if (leftmove > 108) {
                rightmove = leftmove;
                $("#main , #ball").animate({
                    left: "-=75px"
                }, {
                        duration: 100,
                        step: function (currentLeft) {
                            Left = currentLeft;
                            leftmove = Left;
                        }
                    });
            }
            break;
        case 39:
            if (rightmove < 680) {
                leftmove = rightmove;
                $("#main, #ball").animate({
                    left: "+=75px"
                }, {
                        duration: 100,
                        step: function (currentRight) {
                            rightmove = currentRight;
                        }
                    });
            }
            break;
    }
};
