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
        testmap: {
            
        }

    },

    init: function (game) {
        this.game = game;
    },

    makeMap: function (mapID) {
        var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
            b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
            b2Body = Box2D.Dynamics.b2Body;

        //create some objects
        this.game.bodyDef.type = b2Body.b2_dynamicBody;
        for(var i = 0; i < 10; ++i) {
            this.game.fixDef.shape = new b2PolygonShape;
            console.log()
            this.game.fixDef.shape.SetAsBox(
                Math.random() + 0.1, //half width
                Math.random() + 0.1 //half height
            );
             //Rysowanie kółek
//               this.game.fixDef.shape = new b2CircleShape(
//                  Math.random() + 0.1 //radius
//               );
//            }
            this.game.bodyDef.position.x = Math.random() * 10;
            this.game.bodyDef.position.y = Math.random() * 10;
            this.game.world.CreateBody(this.game.bodyDef).CreateFixture(this.game.fixDef);
         }
    }
});