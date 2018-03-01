// Rover Object Goes Here
// ======================
var rover = {
  direction: "N",
  x: 0,
  y: 0 ,
  travelLog : [[0,0]]
}
// ======================
function turnLeft(rover){
  switch (rover.direction){
    case "N": 
      rover.direction = "W";
      break;
    case "S": 
      rover.direction = "E";
      break;
    case "E": 
      rover.direction = "N";
      break;
    case "W": 
      rover.direction = "S";
      break;
  }
  console.log("<== Turned left");}

function turnRight(rover){
  switch (rover.direction){
    case "N": 
      rover.direction = "E";
      break;
    case "S": 
      rover.direction = "W";
      break;
    case "E": 
      rover.direction = "S";
      break;
    case "W": 
      rover.direction = "N";
      break;
  }
  console.log("Turning right ==>");
}
function moveForward(rover){
  switch (rover.direction){
    case "N": 
      rover.y = rover.y - 1;
      break;
    case "S": 
      rover.y = rover.y + 1;
      break;
    case "E": 
      rover.x = rover.x + 1;
      break;
    case "W": 
      rover.x = rover.x - 1;
      break;
  }
  console.log("Moving forward...");

}

function moveBackwards(rover){
  switch (rover.direction){
    case "N": 
      rover.y = rover.y + 1;
      break;
    case "S": 
      rover.y = rover.y - 1;
      break;
    case "E": 
      rover.x = rover.x - 1;
      break;
    case "W": 
      rover.x = rover.x + 1;
      break;
  }
  console.log("Moving backwards...");

}


function moveRover(commands){
   
  for (var i = 0; i < commands.length; i++){
    switch (commands[i]){
      case "f":
      moveForward(rover);
      (rover.travelLog).push([rover.x,rover.y]);
      break;

      case "b":
      moveBackwards(rover);
      (rover.travelLog).push([rover.x,rover.y]);
      break;

      case "l":
      turnLeft(rover);
      break;

      case "r":
      turnRight(rover);
      break;
    }

  }

  console.log("The rover has visited " + (rover.travelLog.length) + " squares:");
  printPositions();
  
}

function printPositions(){
  for (var x in rover){
    console.log(rover.x + " | " + rover.y);
  }
}