/**
 * Cannon.js
 *
 * @author ktoso
 * @date 16.04.11
 * @version 1
 */

var Cannon = Class.extend({

    force: null,

    browserSize: 0.7,


    x: 5,
    y: 15,

    browser: null,
    browsers: [

    ],

    game: null,
    fixDef: null,

    can: null,

    init: function(game) {

        //todo clean me
        var b2Vec2 = Box2D.Common.Math.b2Vec2,
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
                b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;

        this.game = game;

        this.browser = new b2FixtureDef;
        this.browser.density = 1.0;
        this.browser.mass = 1.0;
        this.browser.friction = 0.5;
        this.browser.restitution = 0.2;

        this.force = b2Vec2(1000, 1000);

        this.nextBrowser();
        this.initEventHandlers();
    },

    nextBrowser: function() {
        var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
            b2Body = Box2D.Dynamics.b2Body;

        this.game.bodyDef.type = b2Body.b2_dynamicBody;
        this.browser.shape = new b2CircleShape(this.browserSize);

        this.game.bodyDef.position.Set(this.x, this.y);

//        this.game.world.CreateBody(this.game.bodyDef).CreateFixture(this.browser);
        this.browserBrowser = this.game.world.CreateBody(this.game.bodyDef);
        this.browserFixture = this.browserBrowser.CreateFixture(this.browser);

        var aabb = new Box2D.Collision.b2AABB(), that = this;
        aabb.lowerBound.Set(this.x - 0.001, this.y - 0.001);
        aabb.upperBound.Set(this.x + 0.001, this.y + 0.001);
        this.game.world.QueryAABB(function (fixture) {
            if(fixture.GetBody().GetType() != b2Body.b2_staticBody) {
               if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), new Box2D.Common.Math.b2Vec2(that.x,that.y))) {
                  that.can = fixture.GetBody();
                  return false;
               }
            }
            return true;
         }, aabb);
    },

    initEventHandlers: function() {
        var self = this;
        this.game.canvas.addEventListener("click", function(event) {
            self.fire.apply(self);
//            self.fire(); // does the same
            console.log('fire!');
        }, false);
    },

    fire: function() {
          this.can.ApplyImpulse({x:1000,y:1000}, this.can.position);
    }
});