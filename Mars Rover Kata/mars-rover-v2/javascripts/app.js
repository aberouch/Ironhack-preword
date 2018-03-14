// Rover Object Goes Here
// ======================
var rover01 = {
  direction: "N",
  x: 0,
  y: 0 ,
  travelLog : [[0,0]],
  name: 'Alpha1'
}

// Second Rover Object Goes Here
// ======================
var rover02 = {
  direction: "W",
  x: 9,
  y: 9 ,
  travelLog : [[9,9]],
  name: 'Bravo2'
}


// Generate 10x10 field
// ======================
var grid = new Array(10);
for (var i = 0; i < 10; i++) {
  grid[i] = new Array(10);
  for (var j = 0; j <10; j++) {
    grid[i][j] = null;
  }
}
grid[rover01.y][rover01.x] = rover01.name;
grid[rover02.y][rover02.x] = rover02.name;

// ======================

function moveRover(rover,commands){
  
  if (sanitizeInput(commands) === 0){
    for (var i = 0; i < commands.length; i++){
      switch (commands[i]){
      
      case "f":
      grid[rover.y][rover.x] = null;
      moveForward(rover);
      grid[rover.y][rover.x] = rover.name;
      break;

      case "b":
      grid[rover.y][rover.x] = null;
      moveBackwards(rover);
      grid[rover.y][rover.x] = rover.name;
      break;

      case "l":
      turnLeft(rover);
      break;

      case "r":
      turnRight(rover);
      break;
    }
  }
  
  console.log("\n\n* * * *    T R A V E L  L O G    * * * *\n\nCommands: " + commands + "\nThe rover has visited " + (rover.travelLog.length) + " square(s)");
  printPositions(rover);

  }
}
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
}
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
}
function moveForward(rover){
  switch (rover.direction){
    case "N": 
      if (rover.y > 0 && checkImpact(rover) === false){
        rover.y = rover.y - 1;
        (rover.travelLog).push([rover.x,rover.y]);

      }
      else if (rover.y == 0){
        console.log("Avoided going out of bounds (North)");
      }
      break;

    case "S":
      if (rover.y < 9 && checkImpact(rover) === false){ 
        rover.y = rover.y + 1;
        (rover.travelLog).push([rover.x,rover.y]);

      }
      else if (rover.y == 9){
        console.log("Avoided going out of bounds (South)");
      }
      break;

    case "E": 
      if (rover.x < 9 && checkImpact(rover) === false){
       rover.x = rover.x + 1;
       (rover.travelLog).push([rover.x,rover.y]);

      }
      else if (rover.x == 9){
       console.log("Avoided going out of bounds (East)");
     }
      break;

    case "W": 
    if (rover.x > 0 && checkImpact(rover) === false){
      rover.x = rover.x - 1;
      (rover.travelLog).push([rover.x,rover.y]);
      }
      
      else if (rover.x == 0){
        console.log("Avoided going out of bounds (West)");
      }
      break;
  }

}

function moveBackwards(rover){
  switch (rover.direction){
    case "N": 
      if (rover.y > 9 && checkImpactBack(rover) === false){
        rover.y = rover.y + 1;
        (rover.travelLog).push([rover.x,rover.y]);

      }
      else if (rover.y == 9){
        console.log("Avoided going out of bounds (North)");
      }
      break;

    case "S":
      if (rover.y > 1 && checkImpactBack(rover) === false){ 
        rover.y = rover.y - 1;
        (rover.travelLog).push([rover.x,rover.y]);

      }
      else if (rover.y == 0){
        console.log("Avoided going out of bounds (South)");
      }
      break;

    case "E": 
      if (rover.x > 0 && checkImpactBack(rover) === false){
       rover.x = rover.x - 1;
       (rover.travelLog).push([rover.x,rover.y]);

      }
      else if (rover.x == 0){
       console.log("Avoided going out of bounds (East)");
     }
      break;

    case "W": 
    if (rover.x < 9 && checkImpactBack(rover) === false){
      rover.x = rover.x + 1;
      (rover.travelLog).push([rover.x,rover.y]);
      }
      
      else if (rover.x == 9){
        console.log("Avoided going out of bounds (West)");
      }
      break;
  }

}

function sanitizeInput(commands){
  for (var i = 0; i<commands.length; i++){
    switch (commands[i]){
       case "f": case "b": case "r": case "l":
       break;
       
       default:
        console.log('>>>> Input error: Command sequence aborted!\nYou can only use (f)ront, (b)ack, (l)eft or (r)ight.')
       return 1;
    }
  }
  return 0;

}
function createObstacle(number){
  for (var i = 0; i < number; i++){
    var randA = Math.floor(Math.random() * 10);
    var randB = Math.floor(Math.random() * 10);
    grid[randA][randB] = '--';
  }
}
function printPositions(rover){
  console.log('This is the travel log for rover ' + rover.name + ':\n');
  rover.travelLog.forEach(function(entry){
   console.log('---> ' + entry);
 });
 console.log('\n\n*  E N D    O F    T R A V E L  L O G   *\n\n')
}

function checkImpact(rover){
 
  switch(rover.direction){
    case "N":
    if ((grid[rover.y - 1][rover.x]) === null){
      return false;
    }
    else {
      console.log("Avoided collision! (North)");
      return true;
    }
    break;
    
    case "S":
    if ((grid[rover.y + 1][rover.x]) === null){
      return false;
    }
    else {
      console.log("Avoided collision! (South)");
      return true;
    }
    break;

    case "E":
    if (grid[rover.y][rover.x + 1] === null){
      return false;
    }
    else {
      console.log("Avoided collision! (East)");
      return true;
    }
    break;
    
    case "W":
    if (grid[rover.y][rover.x - 1] === null){
      return false;
    }
    else {
      console.log("Avoided collision! (West)");
      return true;
    }
    break;
  }

}

function checkImpactBack(rover){
 
  switch(rover.direction){
    case "N":
    if ((grid[rover.y + 1][rover.x]) === null){
      return false;
    }
    else {
      console.log("Avoided collision! (South)");
      return true;
    }
    break;
    
    case "S":
    if ((grid[rover.y - 1][rover.x]) === null){
      return false;
    }
    else {
      console.log("Avoided collision! (North)");
      return true;
    }
    break;

    case "E":
    if (grid[rover.y][rover.x -1] === null){
      return false;
    }
    else {
      console.log("Avoided collision! (West)");
      return true;
    }
    break;
    
    case "W":
    if (grid[rover.y][rover.x + 1] === null){
      return false;
    }
    else {
      console.log("Avoided collision! (East)");
      return true;
    }
    break;
  }

}