/**
 * Created by JetBrains PhpStorm.
 * User: Sahadar
 * Date: 16.04.11
 * Time: 12:29
 * To change this template use File | Settings | File Templates.
 */

var Maps = Class.extend({
    game: null,

    maps: {
        testmap: [
            {
                posX: 20,
                posY: 20,
                width: 1,
                height: 1
            },
            {
                posX: 20,
                posY: 19,
                width: 2,
                height: 2
            },
            {
                posX: 20,
                posY: 17.5,
                width: 3,
                height: 3
            },
            {
                posX: 20,
                posY: 15.5,
                width: 4,
                height: 4
            },
            {
                posX: 20,
                posY: 13,
                width: 5,
                height: 5
            },
            {
                posX: 20,
                posY: 8,
                width: 1,
                height: 1
            }
            
        ]

    },

    init: function (game) {
        this.game = game;
    },

    makeMap: function (mapID) {
        var Game = this.game;
        var Maps = this.maps[mapID];
        console.log(Game);
        var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
            b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
            b2Body = Box2D.Dynamics.b2Body;
        
        //create some objects
        Game.bodyDef.type = b2Body.b2_dynamicBody;
        for (var i = 0; i < Maps.length; ++i) {
            var Map = Maps[i];
            Game.fixDef.shape = new b2PolygonShape;
            Game.fixDef.shape.SetAsBox(
                Map.width/2, //half width
                Map.height/2  //half height
            );
             //Rysowanie kółek
//               this.game.fixDef.shape = new b2CircleShape(
//                  Math.random() + 0.1 //radius
//               );
//            }
            Game.bodyDef.position.x = Map.posX;
            Game.bodyDef.position.y = Map.posY-0.7;
            Game.world.CreateBody(Game.bodyDef).CreateFixture(Game.fixDef);
         }
    }
});