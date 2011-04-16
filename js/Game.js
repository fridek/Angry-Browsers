/**
 * Game.js description here
 *
 * @author fridek
 * @date 16.04.11
 * @version $
 */

var Game = Class.extend({
    world: null,
    init: function () {
         var   b2Vec2 = Box2D.Common.Math.b2Vec2
            ,  b2AABB = Box2D.Collision.b2AABB
         	,	b2BodyDef = Box2D.Dynamics.b2BodyDef
         	,	b2Body = Box2D.Dynamics.b2Body
         	,	b2FixtureDef = Box2D.Dynamics.b2FixtureDef
         	,	b2Fixture = Box2D.Dynamics.b2Fixture
         	,	b2World = Box2D.Dynamics.b2World
         	,	b2MassData = Box2D.Collision.Shapes.b2MassData
         	,	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
         	,	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
         	,	b2DebugDraw = Box2D.Dynamics.b2DebugDraw
            ,  b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef
            ;

         this.world = new b2World(
               new b2Vec2(0, 10)    //gravity
            ,  true                 //allow sleep
         );

         var fixDef = new b2FixtureDef;
         fixDef.density = 1.0;
         fixDef.friction = 0.5;
         fixDef.restitution = 0.2;

         var bodyDef = new b2BodyDef;

         //create ground
         bodyDef.type = b2Body.b2_staticBody;
         fixDef.shape = new b2PolygonShape;
         fixDef.shape.SetAsBox(20, 2);
         bodyDef.position.Set(10, 400 / 30 + 1.8);
         this.world.CreateBody(bodyDef).CreateFixture(fixDef);
         bodyDef.position.Set(10, -1.8);
         this.world.CreateBody(bodyDef).CreateFixture(fixDef);
         fixDef.shape.SetAsBox(2, 14);
         bodyDef.position.Set(-1.8, 13);
         this.world.CreateBody(bodyDef).CreateFixture(fixDef);
         bodyDef.position.Set(21.8, 13);
         this.world.CreateBody(bodyDef).CreateFixture(fixDef);


         //create some objects
         bodyDef.type = b2Body.b2_dynamicBody;
         for(var i = 0; i < 10; ++i) {
            if(Math.random() > 0.5) {
               fixDef.shape = new b2PolygonShape;
               fixDef.shape.SetAsBox(
                     Math.random() + 0.1 //half width
                  ,  Math.random() + 0.1 //half height
               );
            } else {
               fixDef.shape = new b2CircleShape(
                  Math.random() + 0.1 //radius
               );
            }
            bodyDef.position.x = Math.random() * 10;
            bodyDef.position.y = Math.random() * 10;
            this.world.CreateBody(bodyDef).CreateFixture(fixDef);
         }

         //setup debug draw
         var debugDraw = new b2DebugDraw();
			debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
			debugDraw.SetDrawScale(30.0);
			debugDraw.SetFillAlpha(0.5);
			debugDraw.SetLineThickness(1.0);
			debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
			this.world.SetDebugDraw(debugDraw);

         var that = this;
         window.setInterval(function() {that.step.apply(that);}, 1000 / 30);
    },

    step: function () {
        this.world.Step(1 / 30, 10, 10);
        this.world.DrawDebugData();
        this.world.ClearForces();
    },

    loadMap: function (mapId) {
        
    }
});