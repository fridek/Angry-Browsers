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
        random: function() {
            var Game = this;
            var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
                b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
                b2Body = Box2D.Dynamics.b2Body;
            
            Game.bodyDef.type = b2Body.b2_dynamicBody;
//            Game.bodyDef.type = b2Body.b2_dynamicBody;
//            Game.bodyDef.type = b2Body.b2_staticBody;
//            Game.bodyDef.type = b2Body.b2_kinematicBody;
            
            for(var i = 0; i < 100; ++i) {
                if(Math.random() > 0.5) {
                    Game.fixDef.shape = new b2PolygonShape;
                    Game.fixDef.shape.SetAsBox(
                        Math.random() + 0.1 //half width
                        , Math.random() + 0.1 //half height
                    );
                } else {
                    Game.fixDef.shape = new b2CircleShape(
                        Math.random() + 0.1 //radius
                    );
                }
                Game.bodyDef.position.x = Math.random() * 20 + 15;
                Game.bodyDef.position.y = Math.random() * 20;
                Game.world.CreateBody(Game.bodyDef).CreateFixture(Game.fixDef);
            }
        },
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
                height: 1,
                angryType: Game.angryTypeBullet
            }
            
        ]

    },

    init: function (game) {
        this.game = game;
    },

    makeMap: function (mapID) {
        if(typeof mapID === 'undefined') {
            mapID = 'random';
        }
        var Game = this.game;
        var Map = this.maps[mapID];
        var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
            b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
            b2Body = Box2D.Dynamics.b2Body;
        
        //create some objects
        Game.bodyDef.type = b2Body.b2_dynamicBody;
        if((Map instanceof Function)) {
            Map.apply(Game);
            return;
        } else {
            for (var i = 0; i < Map.length; ++i) {
                var elementObject = Map[i];
                Game.fixDef.shape = new b2PolygonShape;
                Game.fixDef.shape.SetAsBox(
                    elementObject.width/2, //half width
                    elementObject.height/2  //half height
                );
             //Rysowanie kółek
    //               this.game.fixDef.shape = new b2CircleShape(
    //                  Math.random() + 0.1 //radius
    //               );
    //            }
                if(elementObject.angryType) {
                    Game.bodyDef.angryType = elementObject.angryType;
                } else {
                    Game.bodyDef.angryType = Game.angryTypeBrick;
                }

                Game.bodyDef.position.x = elementObject.posX;
                Game.bodyDef.position.y = elementObject.posY-0.7;
                Game.world.CreateBody(Game.bodyDef).CreateFixture(Game.fixDef);
            }
        }
    }
});