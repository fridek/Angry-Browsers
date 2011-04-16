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

    cannon: null,

    width: null,
    height: null,

    scale: 30,

    angryTypeWall: 0,
    angryTypeBrick: 1,
    angryTypeBullet: 2,
    angryTypeIE: 3,


    _removeList: [],

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
                b2DebugDraw = Box2D.Dynamics.b2DebugDraw;



         this.world = new b2World(
            new b2Vec2(0, 10),    //gravity
            true                 //allow sleep
         );

         this.fixDef = new b2FixtureDef;
         this.fixDef.density = 1.0;
         this.fixDef.friction = 0.5;
         this.fixDef.restitution = 0.2;

         this.bodyDef = new b2BodyDef;
         this.bodyDef.angryType = this.angryTypeWall;
         this.bodyDef.angryHealth = 100;

         //create ground
         this.bodyDef.type = b2Body.b2_staticBody;
         this.fixDef.shape = new b2PolygonShape;
         this.fixDef.shape.SetAsBox(this.width / this.scale, 2);
         // bottom
         this.bodyDef.position.Set(10, this.height/this.scale + 1.8);
         this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);
         // top
         this.bodyDef.position.Set(10, -1.8);
         this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);

         this.fixDef.shape.SetAsBox(2, this.height/this.scale);
         // left
         this.bodyDef.position.Set(-1.8, 13);
         this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);
         // right
         this.bodyDef.position.Set(this.width/this.scale + 1.8, 13);
         this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);

        // drawing stuff

         this.cannon = new Cannon(this);

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

        var contactListener = new Box2D.Dynamics.b2ContactListener;
        contactListener.BeginContact = function(contact, manifold) {
           //console.log(contact.m_fixtureA.m_body.m_angryType, contact.m_fixtureB.m_body.m_angryType);

           if(contact.m_fixtureA.m_body.m_angryType == that.angryTypeBrick &&
              contact.m_fixtureB.m_body.m_angryType == that.angryTypeBullet){
               that._removeList.push(contact.m_fixtureA.m_body);
           }
           if(contact.m_fixtureB.m_body.m_angryType == that.angryTypeBrick &&
              contact.m_fixtureA.m_body.m_angryType == that.angryTypeBullet){
               that._removeList.push(contact.m_fixtureB.m_body);
           }
        };
        this.world.SetContactListener(contactListener);
    },

    step: function () {
        this.world.Step(1 / 30, 10, 10);
        this.world.DrawDebugData();
        this.world.ClearForces();

        var len = this._removeList?this._removeList.length:0;
        if(len > 0)
        {
            for(var i = 0; i < len; i++) {
                this.world.DestroyBody(this._removeList[i]);
            }
        }

        
    }
});