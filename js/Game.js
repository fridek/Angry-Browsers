/**
 * Game.js description here
 *
 * @author fridek
 * @date 16.04.11
 * @version $
 */

var Game = Class.extend({
    world: null,

    currentMap: null,
    fixDef: null,
    bodyDef: null,
    canvas: null,

    width: null,
    height: null,

    init: function (canvas) {
        this.canvas = document.getElementById("canvas");
        this.height = this.canvas.offsetHeight;
        this.width = this.canvas.offsetWidth;

         var    b2Vec2 = Box2D.Common.Math.b2Vec2,
                b2AABB = Box2D.Collision.b2AABB,
                b2BodyDef = Box2D.Dynamics.b2BodyDef,
                b2Body = Box2D.Dynamics.b2Body,
                b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
                b2Fixture = Box2D.Dynamics.b2Fixture,
                b2World = Box2D.Dynamics.b2World,
                b2MassData = Box2D.Collision.Shapes.b2MassData,
                b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
                b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
                b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
                b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef;

         this.world = new b2World(
            new b2Vec2(0, 10),    //gravity
            true                 //allow sleep
         );

         this.fixDef = new b2FixtureDef;
         this.fixDef.density = 1.0;
         this.fixDef.friction = 0.5;
         this.fixDef.restitution = 0.2;

         this.bodyDef = new b2BodyDef;

         //create ground
         this.bodyDef.type = b2Body.b2_staticBody;
         this.fixDef.shape = new b2PolygonShape;
         this.fixDef.shape.SetAsBox(this.width / 30, 2);
         // bottom
         this.bodyDef.position.Set(10, this.height / 30 + 1.8);
         this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);
         // top
         this.bodyDef.position.Set(10, -1.8);
         this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);

         this.fixDef.shape.SetAsBox(2, this.height / 30);
         // left
         this.bodyDef.position.Set(-1.8, 13);
         this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);
         // right
         this.bodyDef.position.Set(this.width / 30 + 1.8, 13);
         this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);

         this.maps = new Maps(this);
         this.maps.makeMap('testmap');

         //setup debug draw
         var debugDraw = new b2DebugDraw();
			debugDraw.SetSprite(this.canvas.getContext("2d"));
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
    }
});