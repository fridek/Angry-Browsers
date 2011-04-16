/**
 * Cannon.js
 *
 * @author ktoso
 * @date 16.04.11
 * @version 1
 */

var Cannon = Class.extend({

    force: null,

    x: 30,
    y: 30,

    currentBrowser: null,

    browsers: [

    ],

    game: null,
    fixDef: null,

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

        this.fixDef = new b2FixtureDef;
        this.fixDef.density = 1.0;
        this.fixDef.friction = 0.5;
        this.fixDef.restitution = 0.2;

        this.force = b2Vec2(10, 10);

        this.initEventHandlers();
    },

    initEventHandlers: function() {
        game.canvas.addEventListener("click", function(event) {

        }, false);
    },

    fire: function() {
        mousePVec = new b2Vec2(this.x, this.y);
        var aabb = new b2AABB();

//        aabb.lowerBound.Set(this.y - 0.001, this.y - 0.001);
//        aabb.upperBound.Set(this.y + 0.001, this.y + 0.001);
        aabb.ApplyImpulse(this.force, ballBodyDef.position);

        // Query the world for overlapping shapes.

        selectedBody = null;
        world.QueryAABB(getBodyCB, aabb);
    }
});