var database,canvas;

var ball,position

function setup(){
    canvas = createCanvas(500,500);

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    
    // creating database from firebase object
    database = firebase.database();
    console.log(database);

    // creating a bridge between application and the node in database
    var ballPositionRef = database.ref('Ball/Position');
   
    // start listening for any changes in the values at the node referred
    // readPosition is a function , with no parathesis
      ballPositionRef.on("value", readPosition);
     

   
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('Ball/Position').update({
        x : position.x+x , 
        y : position.y+y   
     })

    
}

function readPosition(data){
     
    // val function retrieves all the data captured from database referred node
     position = data.val();
     ball.x = position.x ;
     ball.y = position.y ;
}
