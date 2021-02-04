class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playercountref=await database.ref("playerCount").once("value");
      if(playercountref.exists()){
        playerCount=playercountref.val();
        player.getCount();
      }
      
      form = new Form()
      form.display();
    }
  }
  play(){
    form.hide();
    textSize(30);
    text("game started",120,100);
    Player.getplayerinfo();
    if(allplayers!=undefined){
      var dp=130;
      for(var p in allplayers){
        if(p=="player"+player.index){
          fill("red");
        }
        else{
          fill("black");
        }
        dp+=20;
        textSize(15);
        text(allplayers[p].name+": "+ allplayers[p].distance,120,dp)
      }
      
    }
    if(keyIsDown(UP_ARROW) && player.index!=null){
      player.distance+=50;
      player.update;
    }
  }

}
