/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttle = exports.debounce = exports.lvlBlockFactory = exports.getRandomNum = exports.getCanvasEl = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.randomIntFromRange = randomIntFromRange;
exports.randomColor = randomColor;
exports.distance = distance;

var _object = __webpack_require__(1);

// Utility Functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var getCanvasEl = exports.getCanvasEl = function getCanvasEl() {
  var canvas = document.querySelector('canvas');
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  return canvas;
};

var getRandomNum = exports.getRandomNum = function getRandomNum(min, max) {
  return Math.floor(Math.random() * max - min) + min;
};

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

var lvlBlockFactory = exports.lvlBlockFactory = function lvlBlockFactory(blockType, i, j) {
  var colors = ['grey', 'green', 'blue'];
  var size = { w: 50, h: 50 };
  return new _object.LevelBlock({
    color: colors[blockType],
    position: {
      x: size.w * j,
      y: size.h * i
    },
    rect: _extends({}, size)
  });
};

var debounce = exports.debounce = function debounce(f, ms) {
  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var timer = null;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var onComplete = function onComplete() {
      console.log(args);
      f.apply(context, args);
      timer = null;
    };

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(onComplete, ms);
  };
};

var throttle = exports.throttle = function throttle(func, ms, ctx) {

  var isThrottled = false,
      savedArgs,
      savedThis;

  function wrapper() {

    if (isThrottled) {
      // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(ctx, arguments); // (1)

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Enemy = exports.EnemyTank = exports.Tank = exports.Bullet = exports.LevelBlock = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

var _command = __webpack_require__(5);

var _fsm = __webpack_require__(7);

var _victor = __webpack_require__(2);

var _victor2 = _interopRequireDefault(_victor);

var _rbushKnn = __webpack_require__(8);

var _rbushKnn2 = _interopRequireDefault(_rbushKnn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * TODO: Move to utils
 * Проверяет столкнулись ли два прямоугольника
 * @param  {BaseObject} a 
 * @param  {BaseObject} b 
 * @return {Boolean} - результат (столкнулись ли они?)
 */
var checkCollision = function checkCollision(a, b) {
  var res = false;
  if (a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y) {
    res = true;
  }
  return res;
};

var BaseObject = function () {
  _createClass(BaseObject, [{
    key: 'x',
    get: function get() {
      return this.position.x;
    }
  }, {
    key: 'y',
    get: function get() {
      return this.position.y;
    }
  }, {
    key: 'minX',
    get: function get() {
      return this.position.x;
    }
  }, {
    key: 'minY',
    get: function get() {
      return this.position.y;
    }
  }, {
    key: 'maxX',
    get: function get() {
      return this.position.x + this.w;
    }
  }, {
    key: 'maxY',
    get: function get() {
      return this.position.x + this.h;
    }
  }]);

  function BaseObject(options) {
    _classCallCheck(this, BaseObject);

    this.velocity = 300;
    this.life = 100;
    this.display = true;
    this.state = {
      moving: false
    };
    this.direction = {
      up: false,
      down: false,
      left: false,
      right: false
    };
    this.dirVec = new _victor2.default(0, 0);
    var color = options.color,
        position = options.position,
        rect = options.rect,
        remove = options.remove;

    this.color = color;
    if (typeof remove === 'function') {
      this.remove = remove.bind(this);
    }
    this.position = position || new _victor2.default(0, 0);
    if (!rect) {
      rect = this.getDefaultSize();
    }
    this.rect = rect;
    var _rect = rect,
        w = _rect.w,
        h = _rect.h;

    if (w && h) {
      this.w = w;
      this.h = h;
    }
    this.queue = new _command.CommandQueue(this);
  }

  _createClass(BaseObject, [{
    key: 'remove',
    value: function remove() {
      // empty
    }
  }, {
    key: 'getDefaultSize',
    value: function getDefaultSize() {
      return {
        w: 40,
        h: 40
      };
    }
  }, {
    key: 'getRect',
    value: function getRect() {
      return this.rect;
    }
  }, {
    key: 'getPosition',
    value: function getPosition() {
      return this.position;
    }
  }, {
    key: 'setRect',
    value: function setRect(rect) {
      this.rect = rect;
    }
  }, {
    key: 'setPosition',
    value: function setPosition(position) {
      this.position = position;
    }
  }, {
    key: 'setDirection',
    value: function setDirection(dir) {
      this.dirVec.x = dir.x;
      this.dirVec.y = dir.y;
      this.onUpdateDirection();
    }
  }, {
    key: 'onUpdateDirection',
    value: function onUpdateDirection() {}
  }, {
    key: 'update',
    value: function update() {
      if (this.life <= 0) {
        this.remove();
      }
      if (this.queue.length) {
        this.queue.update();
      }
      this.onUpdate();
    }
  }, {
    key: 'onUpdate',
    value: function onUpdate() {}
  }, {
    key: 'onRender',
    value: function onRender() {}
  }, {
    key: 'draw',
    value: function draw() {
      if (!this.display) return false;
      var c = game.getCtx();
      c.beginPath();
      c.rect(this.position.x, this.position.y, this.w, this.h);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
      this.onRender();
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.display = false;
    }
  }, {
    key: 'show',
    value: function show() {
      this.display = true;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.hide();
    }
  }, {
    key: 'moveBy',
    value: function moveBy() {
      var dt = game.getDt();
      var step = this.velocity * dt;
      if (this.direction.up) {
        this.position.y -= step;
      }
      if (this.direction.down) {
        this.position.y += step;
      }
      if (this.direction.left) {
        this.position.x -= step;
      }
      if (this.direction.right) {
        this.position.x += step;
      }
    }
  }, {
    key: 'move',
    value: function move(dir) {
      var dt = game.getDt();
      var stepX = this.velocity * dt * dir.x;
      var stepY = this.velocity * dt * dir.y;
      this.position.x += stepX;
      this.position.y += stepY;
    }
  }, {
    key: 'moveTo',
    value: function moveTo(vec) {
      var dt = game.getDt();
      var x = this.position.x;
      var y = this.position.y;

      /** Init */

      if (!this.state.movement) {
        var startX = x;
        var startY = y;
        var endX = vec.x;
        var endY = vec.y;
        var _distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));

        var directionX = Math.round((endX - startX) / _distance);
        var directionY = Math.round((endY - startY) / _distance);

        var data = {
          endX: endX,
          endY: endY,
          startX: startX,
          startY: startY,
          distance: _distance,
          directionX: directionX,
          directionY: directionY
        };

        this.state.movement = data;
        this.dirVec.x = directionX;
        this.dirVec.y = directionY;
      }

      /** Update */

      if (this.state.movement) {
        var _state$movement = this.state.movement,
            _endX = _state$movement.endX,
            _endY = _state$movement.endY,
            _startX = _state$movement.startX,
            _startY = _state$movement.startY,
            _directionX = _state$movement.directionX,
            _directionY = _state$movement.directionY,
            _distance2 = _state$movement.distance;


        this.position.x += _directionX * this.velocity * dt;
        this.position.y += _directionY * this.velocity * dt;

        var remainDistance = Math.sqrt(Math.pow(x - _startX, 2) + Math.pow(y - _startY, 2));

        if (remainDistance >= _distance2) {
          this.position.x = _endX;
          this.position.y = _endY;
          this.state.movement = false;
        }
      }
    }
  }]);

  return BaseObject;
}();

var LevelBlock = exports.LevelBlock = function (_BaseObject) {
  _inherits(LevelBlock, _BaseObject);

  function LevelBlock(options) {
    _classCallCheck(this, LevelBlock);

    return _possibleConstructorReturn(this, (LevelBlock.__proto__ || Object.getPrototypeOf(LevelBlock)).call(this, options));
  }

  return LevelBlock;
}(BaseObject);

var Bullet = exports.Bullet = function (_BaseObject2) {
  _inherits(Bullet, _BaseObject2);

  function Bullet(options) {
    _classCallCheck(this, Bullet);

    var _this2 = _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this, options));

    _this2.velocity = 500;
    _this2.lifeTime = 5;
    _this2.damage = 25;
    _this2.type = 'single';
    _this2.collided = false;

    _this2.owner = options.owner;
    setTimeout(function () {
      _this2.outdate = true;
    }, _this2.lifeTime * 1000);
    return _this2;
  } // sec


  _createClass(Bullet, [{
    key: 'onHit',
    value: function onHit() {
      // TODO implement
    }
  }, {
    key: 'onMiss',
    value: function onMiss() {
      // TODO implement
    }
  }, {
    key: 'onUpdate',
    value: function onUpdate() {
      var _this3 = this;

      this.move(this.dirVec);
      var results = (0, _rbushKnn2.default)(game.tree, this.position.x, this.position.y, 3);
      results.forEach(function (target, idx) {
        if (_this3 !== target && _this3.owner !== target) {
          if (checkCollision(_this3, target)) {
            if (!_this3.collided) {
              _this3.collided = true;
              if (target && typeof target.damage === 'function') {
                target.damage(_this3.damage, _this3.type);
              }
            }
          }
        }
      });
    }
  }]);

  return Bullet;
}(BaseObject);

var Tank = exports.Tank = function (_BaseObject3) {
  _inherits(Tank, _BaseObject3);

  function Tank(options) {
    _classCallCheck(this, Tank);

    var _this4 = _possibleConstructorReturn(this, (Tank.__proto__ || Object.getPrototypeOf(Tank)).call(this, options));

    _this4.life = 100;
    _this4.bullets = 5;
    _this4.velocity = 35;
    _this4.tower_angle = 180;
    _this4.tower_velocity = 2;
    _this4.bulletbuffer = [];
    _this4.components = [];
    _this4.gunDirection = new _victor2.default(0, 0);
    var color = options.color,
        headColor = options.headColor,
        gunColor = options.gunColor;

    _this4.color = color || '#4691ff';
    _this4.radius = _this4.w * 2;
    _this4.headColor = headColor || 'black';
    _this4.gunColor = gunColor || 'white';
    _this4.restore = false;
    _this4.setGunAngle();
    return _this4;
  }

  _createClass(Tank, [{
    key: 'damage',
    value: function damage(val, type) {
      if (this.life > 0) {
        this.life -= val;
      } else {
        this.life = 0;
      }
    }
  }, {
    key: 'setGunAngle',
    value: function setGunAngle() {
      this.gunAngle = 90;
    }
  }, {
    key: 'setHeadColor',
    value: function setHeadColor(color) {
      this.headColor = color;
    }
  }, {
    key: 'addComponent',
    value: function addComponent(tankComponent) {
      this.components.push(tankComponent);
    }
  }, {
    key: 'removeComponent',
    value: function removeComponent(tankComponent) {
      var idx = this.components.indexOf(tankComponent);
      if (idx > -1) this.components.splice(idx, 1);
    }
  }, {
    key: 'initPlayer',
    value: function initPlayer() {
      this.enableControls();
      this.player = true;
    }
  }, {
    key: 'showReloadText',
    value: function showReloadText() {
      var c = game.getCtx();
      var text = 'Reloading...';
      c.fillStyle = 'black';
      c.font = '14px Helvetica';
      c.fillText(text, innerWidth / 2, innerHeight / 2);
    }
  }, {
    key: 'updateComponents',
    value: function updateComponents() {
      this.components.forEach(function (component) {
        component.update();
      });
    }
  }, {
    key: 'drawHealthBar',
    value: function drawHealthBar(x, y) {
      var hp = 'hp: ' + this.life;
      var c = game.getCtx();
      c.fillStyle = 'black';
      c.font = '18px Helvetica';
      c.fillText(hp, x, y);
    }
  }, {
    key: 'drawBulletCountLabel',
    value: function drawBulletCountLabel(x, y) {
      var count = this.bullets;
      var labelTxt = 'Bullets: ' + count;
      var c = game.getCtx();
      c.fillStyle = 'black';
      c.font = '18px Helvetica';
      c.fillText(labelTxt, x, y);
    }

    // ADD fire MIXIN

  }, {
    key: 'fire',
    value: function fire() {
      var time = Date.now();
      if (this.bullets === 0) {
        this.state.reloading = true;
        return false;
      }

      var directionY = this.dirVec.y > 0 || this.dirVec.y < 0;

      var bullet = new Bullet({
        rect: directionY ? { w: 3, h: 8 } : { w: 8, h: 3 },
        color: 'red',
        owner: this
      });

      bullet.dirVec = _extends({}, this.dirVec);
      bullet.setPosition(new _victor2.default(this.gunDirection.x, this.gunDirection.y));

      bullet.state.moving = true;
      this.bulletbuffer.push(bullet);
      game.tree.insert(bullet);
      this.bullets--;
    }
  }, {
    key: 'moveGun',
    value: function moveGun(keys) {
      // LEFT, RIGHT
      if (keys.right) {
        // TODO USE TRIGONOMETRY
        this.tower_angle += tower_velocity;
      }
      if (keys.left) {
        // TODO USE TRIGONOMETRY
        this.tower_angle -= tower_velocity;
      }
    }
  }, {
    key: 'updateBullets',
    value: function updateBullets() {
      var _this5 = this;

      this.bulletbuffer.forEach(function (bullet, idx) {
        if (bullet.outdate || bullet.collided) {
          game.tree.remove(bullet);
          _this5.bulletbuffer.shift();
        } else {
          bullet.update();
        }
      });
      if (this.bullets <= 0 && !this.state.reloading) {
        this.state.reloading = true;
        setTimeout(function () {
          _this5.bullets += 5;
          _this5.state.reloading = false;
        }, 1500);
      }
    }
  }, {
    key: 'drawGun',
    value: function drawGun(c) {
      var _dirVec = this.dirVec,
          x = _dirVec.x,
          y = _dirVec.y;

      if (x === 0 && y === -1) {
        this.gunAngle = 270;
      } else if (x === 0 && y === 1) {
        this.gunAngle = 90;
      } else if (x === 1 && y === 0) {
        this.gunAngle = 0;
      } else if (x === -1 & y === 0) {
        this.gunAngle = 180;
      }
      var radian = Math.PI / 180 * this.gunAngle;
      this.headHalfWidth = this.headWidth / 2;
      this.headHalfHeight = this.headHeight / 2;
      this.gunPosition = new _victor2.default(this.headX + this.headHalfWidth, this.headY + this.headHalfWidth);
      var length = this.radius / 3;
      var x1 = this.headX + this.headHalfWidth + length * Math.cos(radian);
      var y1 = this.headY + this.headHalfHeight + length * Math.sin(radian);
      this.gunDirection.x = x1;
      this.gunDirection.y = y1;
      c.beginPath();
      c.strokeStyle = this.gunColor;
      c.moveTo(this.gunPosition.x, this.gunPosition.y);
      c.lineTo(x1, y1);
      c.lineWidth = 2;
      c.stroke();
      c.lineWidth = 1;
      c.closePath();
    }
  }, {
    key: 'drawHead',
    value: function drawHead(c) {
      var margin = 30;
      this.headX = this.x + margin / 2;
      this.headY = this.y + margin / 2;
      this.headWidth = this.w - margin;
      this.headHeight = this.h - margin;
      c.beginPath();
      c.fillStyle = this.headColor;
      c.fillRect(this.headX, this.headY, this.headWidth, this.headHeight);
      c.closePath();
    }
  }, {
    key: 'drawBody',
    value: function drawBody(c) {
      c.beginPath();
      c.rect(this.position.x, this.position.y, this.w, this.h);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
    }
  }, {
    key: 'draw',
    value: function draw() {
      if (!this.display) return false;
      var c = game.getCtx();
      this.drawBody(c);
      this.drawHead(c);
      this.drawGun(c);
      this.onRender();
    }
  }, {
    key: 'onRender',
    value: function onRender() {
      if (this.player) {
        var bulletLabelX = innerWidth - 80;
        var bulletLabelY = innerHeight - 10;
        this.drawBulletCountLabel(bulletLabelX, bulletLabelY);
        this.drawHealthBar(5, innerHeight - 10);
      }
      if (this.state.reloading && this.player) {
        this.showReloadText();
      }
      this.bulletbuffer.forEach(function (b) {
        b.draw();
      });
    }
  }, {
    key: 'onUpdate',
    value: function onUpdate() {
      this.moveBy();
      this.updateBullets();
      this.updateComponents();
    }
  }, {
    key: 'onKeyPress',
    value: function onKeyPress(directionName, type) {
      var pressed = type === 'keydown' ? true : false;
      this.direction[directionName] = pressed ? true : false;
    }
  }, {
    key: 'enableControls',
    value: function enableControls() {
      var _this6 = this;

      var events = ['keydown', 'keyup'];
      var listener = function listener(e) {
        var keyCode = e.keyCode,
            type = e.type;

        var directions = {
          38: {
            name: 'up',
            vec: new _victor2.default(0, -1),
            axis: 'y'
          },
          40: {
            name: 'down',
            vec: new _victor2.default(0, 1),
            axis: 'y'
          },
          37: {
            name: 'left',
            vec: new _victor2.default(-1, 0),
            axis: 'x'
          },
          39: {
            name: 'right',
            vec: new _victor2.default(1, 0),
            axis: 'x'
          }
        };
        var direction = directions[keyCode];
        if (direction) {
          var name = direction.name,
              vec = direction.vec,
              axis = direction.axis;

          _this6.dirVec = vec;
          _this6.onKeyPress(name, type);
        }
        if (keyCode === 32 && type === 'keyup') {
          if (!_this6.state.reloading) {
            if (!_this6.lastFireTime) {
              _this6.lastFireTime = game.lastLoopTime;
            }
            if (game.lastLoopTime - _this6.lastFireTime > 1000) {
              _this6.fire();
              _this6.lastFireTime = null;
            }
          }
        }
      };
      events.forEach(function (name) {
        addEventListener(name, listener);
      });
    }
  }]);

  return Tank;
}(BaseObject);

var EnemyTank = exports.EnemyTank = function (_Tank) {
  _inherits(EnemyTank, _Tank);

  // add commands stack
  // if we have command in stack
  // and this command have some state
  // pop stack command and apply state

  function EnemyTank(options) {
    _classCallCheck(this, EnemyTank);

    var _this7 = _possibleConstructorReturn(this, (EnemyTank.__proto__ || Object.getPrototypeOf(EnemyTank)).call(this, options));

    _this7.velocity = 50;
    _this7.scanRange = 600;
    _this7.unit = true;

    _this7.fsm = new _fsm.StackFSM();
    _this7.initCPU();
    _this7.scanner = (0, _utils.throttle)(_this7.scanLine, 1000, _this7);
    return _this7;
  }

  _createClass(EnemyTank, [{
    key: 'initCPU',
    value: function initCPU() {
      var _this8 = this;

      this.cpu = true;
      setTimeout(function () {
        _this8.fsm.pushState(function () {
          return _this8.stateScout();
        });
      }, (0, _utils.getRandomNum)(1, 5) * 1000);
    }
  }, {
    key: 'onUpdate',
    value: function onUpdate() {
      this.updateBullets();
      this.fsm.update();
    }
  }, {
    key: 'scanLine',
    value: function scanLine() {
      console.log(Date.now());
    }
  }, {
    key: 'stateChangeWeapon',
    value: function stateChangeWeapon(type, nextState) {
      // changes weapon type
      // for next attack
    }
  }, {
    key: 'stateMoveTo',
    value: function stateMoveTo(position, nextState) {
      // moveTo position
      // use pathfinding algorythm
      // when got position
      // pushNextState
    }
  }, {
    key: 'stateAvoidAttack',
    value: function stateAvoidAttack() {
      // while beign in stateScout
      // if enemy bullet is detected on line
      // change line
      // if enemy not detected fire in same direction
      // if enemy detected fire at enemy
      // if hp is low runAway
    }
  }, {
    key: 'stateAttack',
    value: function stateAttack() {
      // if enemy detected
      // fire at enemy position
      // then scan for enemy bullet attacks
      // if bullets detected avoid attacks
      // if no bullets change position (UP, TOP, LEFT, RIGHT)
    }
  }, {
    key: 'stateDoGroup',
    value: function stateDoGroup() {
      // find free group of objects
      // join
      // listen to group ai commands

      // group features:

      // positions - few objects can stay in Positions

      // position - triangle
      //  t t
      // t t t
      //  t t

      // position - square
      // t t t t
      // t t t t
      // t t t t

      // group commands
      // objects can order commands

      // regroup - group idx will be resorted
      // after that objects handle moveTo(position)
      // attackAll - all at one direction
      // all objects will attack at one direction

      // attackSquarePosition - each obj attack in one point
      // of squared space

      // holdposition - objects will hold different positions
      // for n times of attacks

      // scanSquare - each objects will scan for enemy
      // if enemy is attack - save direction X OR Y
      // make scanSquare results with array of lines
      // trigger next state of GroupController
      // attackSquarePosition
      //
      // heal(obj) or repair - if obj type can heal
      // it will heal other obj
      // it will push stateRepair(obj)
      //
      // defend(obj)
      // will cover building with some around positions
      //
      //
    }
  }, {
    key: 'stateScout',
    value: function stateScout() {
      var _this9 = this;

      if (!this.queue.length) {
        var num = (0, _utils.getRandomNum)(3, 4) + 1;
        var range = (0, _utils.getRandomNum)(50, 100) + 1;
        this.queue.push('moveTo', -1 * range * num, 1, true);
        this.queue.push('moveTo', 1 * range * num, 1, true);
      }

      // Логика разведки должна быть следующая 
      // 
      // Поведение - 1. Поиск противника
      //
      // 1) Просмотр по текущему направлению объекта вперед на n meters
      // 2) Если объект не найден проехать n meters
      // 3) Просканировать снова
      // 4) Если не найден - сменить направление объекта. (Зациклить данное поведение)
      //
      //
      // Поведение - 2. Противник был замечен n сек назад. Поиск в той-же области
      // плюс атака на угад. 
      //
      // 1) Продвинуться в сторону противника.
      //  
      //  Атаковать на ходу в сторону противника
      //  Если противник ушел с линии найти его
      //   И атаковать.
      //  
      //  2) Стрелять наперед - на несколько пунктов вверх по x, y
      //
      //
      //

      // TODO refactor
      // add timer object
      // use timer object
      if (!this.lastScoutScan) {
        this.lastScoutScan = game.lastLoopTime / 1000;
      }
      // TODO refactor
      // add new variables for elapsed time
      // minutes
      // seconds
      // hours
      if (game.lastLoopTime / 1000 - this.lastScoutScan > 1.5) {
        (0, _rbushKnn2.default)(game.tree, this.x, this.y, 10).map(function (obj) {
          // TODO refactor
          // add method to util isDirectionTheSame
          if (obj.player) {
            var fov = 100;
            var sameDirectionX = obj.x < _this9.x && _this9.dirVec.x == -1 || obj.x > _this9.x && _this9.dirVec.x == -1;
            var sameDirectionY = obj.y < _this9.y && _this9.dirVec.y == 1 || obj.y > _this9.y && _this9.dirVec.y == 1;
            var closerToY = _this9.y - fov < obj.y && _this9.y + fov > obj.y;
            var closerToX = _this9.x - fov < obj.x && _this9.x + fov > obj.y;
            if (sameDirectionX && closerToY || sameDirectionY && closerToX) {
              // TODO add weapon queue
              _this9.fire();
              var newX = _this9.dirVec.x * (obj.x / 10);
              var newY = 0;
              _this9.queue.push('moveTo', newX, newY, true);
            }
          }
        });
        this.lastScoutScan = null;
      }
    }
  }]);

  return EnemyTank;
}(Tank);

var Enemy = exports.Enemy = function Enemy() {
  _classCallCheck(this, Enemy);
};

var Soldier = function (_Enemy) {
  _inherits(Soldier, _Enemy);

  function Soldier() {
    _classCallCheck(this, Soldier);

    return _possibleConstructorReturn(this, (Soldier.__proto__ || Object.getPrototypeOf(Soldier)).apply(this, arguments));
  }

  return Soldier;
}(Enemy);

var Sniper = function (_Soldier) {
  _inherits(Sniper, _Soldier);

  function Sniper() {
    _classCallCheck(this, Sniper);

    return _possibleConstructorReturn(this, (Sniper.__proto__ || Object.getPrototypeOf(Sniper)).apply(this, arguments));
  }

  return Sniper;
}(Soldier);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

exports = module.exports = Victor;

/**
 * # Victor - A JavaScript 2D vector class with methods for common vector operations
 */

/**
 * Constructor. Will also work without the `new` keyword
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = Victor(42, 1337);
 *
 * @param {Number} x Value of the x axis
 * @param {Number} y Value of the y axis
 * @return {Victor}
 * @api public
 */
function Victor (x, y) {
	if (!(this instanceof Victor)) {
		return new Victor(x, y);
	}

	/**
	 * The X axis
	 *
	 * ### Examples:
	 *     var vec = new Victor.fromArray(42, 21);
	 *
	 *     vec.x;
	 *     // => 42
	 *
	 * @api public
	 */
	this.x = x || 0;

	/**
	 * The Y axis
	 *
	 * ### Examples:
	 *     var vec = new Victor.fromArray(42, 21);
	 *
	 *     vec.y;
	 *     // => 21
	 *
	 * @api public
	 */
	this.y = y || 0;
};

/**
 * # Static
 */

/**
 * Creates a new instance from an array
 *
 * ### Examples:
 *     var vec = Victor.fromArray([42, 21]);
 *
 *     vec.toString();
 *     // => x:42, y:21
 *
 * @name Victor.fromArray
 * @param {Array} array Array with the x and y values at index 0 and 1 respectively
 * @return {Victor} The new instance
 * @api public
 */
Victor.fromArray = function (arr) {
	return new Victor(arr[0] || 0, arr[1] || 0);
};

/**
 * Creates a new instance from an object
 *
 * ### Examples:
 *     var vec = Victor.fromObject({ x: 42, y: 21 });
 *
 *     vec.toString();
 *     // => x:42, y:21
 *
 * @name Victor.fromObject
 * @param {Object} obj Object with the values for x and y
 * @return {Victor} The new instance
 * @api public
 */
Victor.fromObject = function (obj) {
	return new Victor(obj.x || 0, obj.y || 0);
};

/**
 * # Manipulation
 *
 * These functions are chainable.
 */

/**
 * Adds another vector's X axis to this one
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.addX(vec2);
 *     vec1.toString();
 *     // => x:30, y:10
 *
 * @param {Victor} vector The other vector you want to add to this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addX = function (vec) {
	this.x += vec.x;
	return this;
};

/**
 * Adds another vector's Y axis to this one
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.addY(vec2);
 *     vec1.toString();
 *     // => x:10, y:40
 *
 * @param {Victor} vector The other vector you want to add to this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addY = function (vec) {
	this.y += vec.y;
	return this;
};

/**
 * Adds another vector to this one
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.add(vec2);
 *     vec1.toString();
 *     // => x:30, y:40
 *
 * @param {Victor} vector The other vector you want to add to this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.add = function (vec) {
	this.x += vec.x;
	this.y += vec.y;
	return this;
};

/**
 * Adds the given scalar to both vector axis
 *
 * ### Examples:
 *     var vec = new Victor(1, 2);
 *
 *     vec.addScalar(2);
 *     vec.toString();
 *     // => x: 3, y: 4
 *
 * @param {Number} scalar The scalar to add
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addScalar = function (scalar) {
	this.x += scalar;
	this.y += scalar;
	return this;
};

/**
 * Adds the given scalar to the X axis
 *
 * ### Examples:
 *     var vec = new Victor(1, 2);
 *
 *     vec.addScalarX(2);
 *     vec.toString();
 *     // => x: 3, y: 2
 *
 * @param {Number} scalar The scalar to add
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addScalarX = function (scalar) {
	this.x += scalar;
	return this;
};

/**
 * Adds the given scalar to the Y axis
 *
 * ### Examples:
 *     var vec = new Victor(1, 2);
 *
 *     vec.addScalarY(2);
 *     vec.toString();
 *     // => x: 1, y: 4
 *
 * @param {Number} scalar The scalar to add
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addScalarY = function (scalar) {
	this.y += scalar;
	return this;
};

/**
 * Subtracts the X axis of another vector from this one
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.subtractX(vec2);
 *     vec1.toString();
 *     // => x:80, y:50
 *
 * @param {Victor} vector The other vector you want subtract from this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractX = function (vec) {
	this.x -= vec.x;
	return this;
};

/**
 * Subtracts the Y axis of another vector from this one
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.subtractY(vec2);
 *     vec1.toString();
 *     // => x:100, y:20
 *
 * @param {Victor} vector The other vector you want subtract from this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractY = function (vec) {
	this.y -= vec.y;
	return this;
};

/**
 * Subtracts another vector from this one
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.subtract(vec2);
 *     vec1.toString();
 *     // => x:80, y:20
 *
 * @param {Victor} vector The other vector you want subtract from this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtract = function (vec) {
	this.x -= vec.x;
	this.y -= vec.y;
	return this;
};

/**
 * Subtracts the given scalar from both axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 200);
 *
 *     vec.subtractScalar(20);
 *     vec.toString();
 *     // => x: 80, y: 180
 *
 * @param {Number} scalar The scalar to subtract
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractScalar = function (scalar) {
	this.x -= scalar;
	this.y -= scalar;
	return this;
};

/**
 * Subtracts the given scalar from the X axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 200);
 *
 *     vec.subtractScalarX(20);
 *     vec.toString();
 *     // => x: 80, y: 200
 *
 * @param {Number} scalar The scalar to subtract
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractScalarX = function (scalar) {
	this.x -= scalar;
	return this;
};

/**
 * Subtracts the given scalar from the Y axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 200);
 *
 *     vec.subtractScalarY(20);
 *     vec.toString();
 *     // => x: 100, y: 180
 *
 * @param {Number} scalar The scalar to subtract
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractScalarY = function (scalar) {
	this.y -= scalar;
	return this;
};

/**
 * Divides the X axis by the x component of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(2, 0);
 *
 *     vec.divideX(vec2);
 *     vec.toString();
 *     // => x:50, y:50
 *
 * @param {Victor} vector The other vector you want divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideX = function (vector) {
	this.x /= vector.x;
	return this;
};

/**
 * Divides the Y axis by the y component of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(0, 2);
 *
 *     vec.divideY(vec2);
 *     vec.toString();
 *     // => x:100, y:25
 *
 * @param {Victor} vector The other vector you want divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideY = function (vector) {
	this.y /= vector.y;
	return this;
};

/**
 * Divides both vector axis by a axis values of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(2, 2);
 *
 *     vec.divide(vec2);
 *     vec.toString();
 *     // => x:50, y:25
 *
 * @param {Victor} vector The vector to divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divide = function (vector) {
	this.x /= vector.x;
	this.y /= vector.y;
	return this;
};

/**
 * Divides both vector axis by the given scalar value
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.divideScalar(2);
 *     vec.toString();
 *     // => x:50, y:25
 *
 * @param {Number} The scalar to divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideScalar = function (scalar) {
	if (scalar !== 0) {
		this.x /= scalar;
		this.y /= scalar;
	} else {
		this.x = 0;
		this.y = 0;
	}

	return this;
};

/**
 * Divides the X axis by the given scalar value
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.divideScalarX(2);
 *     vec.toString();
 *     // => x:50, y:50
 *
 * @param {Number} The scalar to divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideScalarX = function (scalar) {
	if (scalar !== 0) {
		this.x /= scalar;
	} else {
		this.x = 0;
	}
	return this;
};

/**
 * Divides the Y axis by the given scalar value
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.divideScalarY(2);
 *     vec.toString();
 *     // => x:100, y:25
 *
 * @param {Number} The scalar to divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideScalarY = function (scalar) {
	if (scalar !== 0) {
		this.y /= scalar;
	} else {
		this.y = 0;
	}
	return this;
};

/**
 * Inverts the X axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.invertX();
 *     vec.toString();
 *     // => x:-100, y:50
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.invertX = function () {
	this.x *= -1;
	return this;
};

/**
 * Inverts the Y axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.invertY();
 *     vec.toString();
 *     // => x:100, y:-50
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.invertY = function () {
	this.y *= -1;
	return this;
};

/**
 * Inverts both axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.invert();
 *     vec.toString();
 *     // => x:-100, y:-50
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.invert = function () {
	this.invertX();
	this.invertY();
	return this;
};

/**
 * Multiplies the X axis by X component of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(2, 0);
 *
 *     vec.multiplyX(vec2);
 *     vec.toString();
 *     // => x:200, y:50
 *
 * @param {Victor} vector The vector to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyX = function (vector) {
	this.x *= vector.x;
	return this;
};

/**
 * Multiplies the Y axis by Y component of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(0, 2);
 *
 *     vec.multiplyX(vec2);
 *     vec.toString();
 *     // => x:100, y:100
 *
 * @param {Victor} vector The vector to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyY = function (vector) {
	this.y *= vector.y;
	return this;
};

/**
 * Multiplies both vector axis by values from a given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(2, 2);
 *
 *     vec.multiply(vec2);
 *     vec.toString();
 *     // => x:200, y:100
 *
 * @param {Victor} vector The vector to multiply by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiply = function (vector) {
	this.x *= vector.x;
	this.y *= vector.y;
	return this;
};

/**
 * Multiplies both vector axis by the given scalar value
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.multiplyScalar(2);
 *     vec.toString();
 *     // => x:200, y:100
 *
 * @param {Number} The scalar to multiply by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyScalar = function (scalar) {
	this.x *= scalar;
	this.y *= scalar;
	return this;
};

/**
 * Multiplies the X axis by the given scalar
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.multiplyScalarX(2);
 *     vec.toString();
 *     // => x:200, y:50
 *
 * @param {Number} The scalar to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyScalarX = function (scalar) {
	this.x *= scalar;
	return this;
};

/**
 * Multiplies the Y axis by the given scalar
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.multiplyScalarY(2);
 *     vec.toString();
 *     // => x:100, y:100
 *
 * @param {Number} The scalar to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyScalarY = function (scalar) {
	this.y *= scalar;
	return this;
};

/**
 * Normalize
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.normalize = function () {
	var length = this.length();

	if (length === 0) {
		this.x = 1;
		this.y = 0;
	} else {
		this.divide(Victor(length, length));
	}
	return this;
};

Victor.prototype.norm = Victor.prototype.normalize;

/**
 * If the absolute vector axis is greater than `max`, multiplies the axis by `factor`
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.limit(80, 0.9);
 *     vec.toString();
 *     // => x:90, y:50
 *
 * @param {Number} max The maximum value for both x and y axis
 * @param {Number} factor Factor by which the axis are to be multiplied with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.limit = function (max, factor) {
	if (Math.abs(this.x) > max){ this.x *= factor; }
	if (Math.abs(this.y) > max){ this.y *= factor; }
	return this;
};

/**
 * Randomizes both vector axis with a value between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomize(new Victor(50, 60), new Victor(70, 80`));
 *     vec.toString();
 *     // => x:67, y:73
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.randomize = function (topLeft, bottomRight) {
	this.randomizeX(topLeft, bottomRight);
	this.randomizeY(topLeft, bottomRight);

	return this;
};

/**
 * Randomizes the y axis with a value between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomizeX(new Victor(50, 60), new Victor(70, 80`));
 *     vec.toString();
 *     // => x:55, y:50
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.randomizeX = function (topLeft, bottomRight) {
	var min = Math.min(topLeft.x, bottomRight.x);
	var max = Math.max(topLeft.x, bottomRight.x);
	this.x = random(min, max);
	return this;
};

/**
 * Randomizes the y axis with a value between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomizeY(new Victor(50, 60), new Victor(70, 80`));
 *     vec.toString();
 *     // => x:100, y:66
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.randomizeY = function (topLeft, bottomRight) {
	var min = Math.min(topLeft.y, bottomRight.y);
	var max = Math.max(topLeft.y, bottomRight.y);
	this.y = random(min, max);
	return this;
};

/**
 * Randomly randomizes either axis between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomizeAny(new Victor(50, 60), new Victor(70, 80));
 *     vec.toString();
 *     // => x:100, y:77
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.randomizeAny = function (topLeft, bottomRight) {
	if (!! Math.round(Math.random())) {
		this.randomizeX(topLeft, bottomRight);
	} else {
		this.randomizeY(topLeft, bottomRight);
	}
	return this;
};

/**
 * Rounds both axis to an integer value
 *
 * ### Examples:
 *     var vec = new Victor(100.2, 50.9);
 *
 *     vec.unfloat();
 *     vec.toString();
 *     // => x:100, y:51
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.unfloat = function () {
	this.x = Math.round(this.x);
	this.y = Math.round(this.y);
	return this;
};

/**
 * Rounds both axis to a certain precision
 *
 * ### Examples:
 *     var vec = new Victor(100.2, 50.9);
 *
 *     vec.unfloat();
 *     vec.toString();
 *     // => x:100, y:51
 *
 * @param {Number} Precision (default: 8)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.toFixed = function (precision) {
	if (typeof precision === 'undefined') { precision = 8; }
	this.x = this.x.toFixed(precision);
	this.y = this.y.toFixed(precision);
	return this;
};

/**
 * Performs a linear blend / interpolation of the X axis towards another vector
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 100);
 *     var vec2 = new Victor(200, 200);
 *
 *     vec1.mixX(vec2, 0.5);
 *     vec.toString();
 *     // => x:150, y:100
 *
 * @param {Victor} vector The other vector
 * @param {Number} amount The blend amount (optional, default: 0.5)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.mixX = function (vec, amount) {
	if (typeof amount === 'undefined') {
		amount = 0.5;
	}

	this.x = (1 - amount) * this.x + amount * vec.x;
	return this;
};

/**
 * Performs a linear blend / interpolation of the Y axis towards another vector
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 100);
 *     var vec2 = new Victor(200, 200);
 *
 *     vec1.mixY(vec2, 0.5);
 *     vec.toString();
 *     // => x:100, y:150
 *
 * @param {Victor} vector The other vector
 * @param {Number} amount The blend amount (optional, default: 0.5)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.mixY = function (vec, amount) {
	if (typeof amount === 'undefined') {
		amount = 0.5;
	}

	this.y = (1 - amount) * this.y + amount * vec.y;
	return this;
};

/**
 * Performs a linear blend / interpolation towards another vector
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 100);
 *     var vec2 = new Victor(200, 200);
 *
 *     vec1.mix(vec2, 0.5);
 *     vec.toString();
 *     // => x:150, y:150
 *
 * @param {Victor} vector The other vector
 * @param {Number} amount The blend amount (optional, default: 0.5)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.mix = function (vec, amount) {
	this.mixX(vec, amount);
	this.mixY(vec, amount);
	return this;
};

/**
 * # Products
 */

/**
 * Creates a clone of this vector
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = vec1.clone();
 *
 *     vec2.toString();
 *     // => x:10, y:10
 *
 * @return {Victor} A clone of the vector
 * @api public
 */
Victor.prototype.clone = function () {
	return new Victor(this.x, this.y);
};

/**
 * Copies another vector's X component in to its own
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 20);
 *     var vec2 = vec1.copyX(vec1);
 *
 *     vec2.toString();
 *     // => x:20, y:10
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.copyX = function (vec) {
	this.x = vec.x;
	return this;
};

/**
 * Copies another vector's Y component in to its own
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 20);
 *     var vec2 = vec1.copyY(vec1);
 *
 *     vec2.toString();
 *     // => x:10, y:20
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.copyY = function (vec) {
	this.y = vec.y;
	return this;
};

/**
 * Copies another vector's X and Y components in to its own
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 20);
 *     var vec2 = vec1.copy(vec1);
 *
 *     vec2.toString();
 *     // => x:20, y:20
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.copy = function (vec) {
	this.copyX(vec);
	this.copyY(vec);
	return this;
};

/**
 * Sets the vector to zero (0,0)
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *		 var1.zero();
 *     vec1.toString();
 *     // => x:0, y:0
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.zero = function () {
	this.x = this.y = 0;
	return this;
};

/**
 * Calculates the dot product of this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.dot(vec2);
 *     // => 23000
 *
 * @param {Victor} vector The second vector
 * @return {Number} Dot product
 * @api public
 */
Victor.prototype.dot = function (vec2) {
	return this.x * vec2.x + this.y * vec2.y;
};

Victor.prototype.cross = function (vec2) {
	return (this.x * vec2.y ) - (this.y * vec2.x );
};

/**
 * Projects a vector onto another vector, setting itself to the result.
 *
 * ### Examples:
 *     var vec = new Victor(100, 0);
 *     var vec2 = new Victor(100, 100);
 *
 *     vec.projectOnto(vec2);
 *     vec.toString();
 *     // => x:50, y:50
 *
 * @param {Victor} vector The other vector you want to project this vector onto
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.projectOnto = function (vec2) {
    var coeff = ( (this.x * vec2.x)+(this.y * vec2.y) ) / ((vec2.x*vec2.x)+(vec2.y*vec2.y));
    this.x = coeff * vec2.x;
    this.y = coeff * vec2.y;
    return this;
};


Victor.prototype.horizontalAngle = function () {
	return Math.atan2(this.y, this.x);
};

Victor.prototype.horizontalAngleDeg = function () {
	return radian2degrees(this.horizontalAngle());
};

Victor.prototype.verticalAngle = function () {
	return Math.atan2(this.x, this.y);
};

Victor.prototype.verticalAngleDeg = function () {
	return radian2degrees(this.verticalAngle());
};

Victor.prototype.angle = Victor.prototype.horizontalAngle;
Victor.prototype.angleDeg = Victor.prototype.horizontalAngleDeg;
Victor.prototype.direction = Victor.prototype.horizontalAngle;

Victor.prototype.rotate = function (angle) {
	var nx = (this.x * Math.cos(angle)) - (this.y * Math.sin(angle));
	var ny = (this.x * Math.sin(angle)) + (this.y * Math.cos(angle));

	this.x = nx;
	this.y = ny;

	return this;
};

Victor.prototype.rotateDeg = function (angle) {
	angle = degrees2radian(angle);
	return this.rotate(angle);
};

Victor.prototype.rotateTo = function(rotation) {
	return this.rotate(rotation-this.angle());
};

Victor.prototype.rotateToDeg = function(rotation) {
	rotation = degrees2radian(rotation);
	return this.rotateTo(rotation);
};

Victor.prototype.rotateBy = function (rotation) {
	var angle = this.angle() + rotation;

	return this.rotate(angle);
};

Victor.prototype.rotateByDeg = function (rotation) {
	rotation = degrees2radian(rotation);
	return this.rotateBy(rotation);
};

/**
 * Calculates the distance of the X axis between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceX(vec2);
 *     // => -100
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */
Victor.prototype.distanceX = function (vec) {
	return this.x - vec.x;
};

/**
 * Same as `distanceX()` but always returns an absolute number
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.absDistanceX(vec2);
 *     // => 100
 *
 * @param {Victor} vector The second vector
 * @return {Number} Absolute distance
 * @api public
 */
Victor.prototype.absDistanceX = function (vec) {
	return Math.abs(this.distanceX(vec));
};

/**
 * Calculates the distance of the Y axis between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceY(vec2);
 *     // => -10
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */
Victor.prototype.distanceY = function (vec) {
	return this.y - vec.y;
};

/**
 * Same as `distanceY()` but always returns an absolute number
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceY(vec2);
 *     // => 10
 *
 * @param {Victor} vector The second vector
 * @return {Number} Absolute distance
 * @api public
 */
Victor.prototype.absDistanceY = function (vec) {
	return Math.abs(this.distanceY(vec));
};

/**
 * Calculates the euclidean distance between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distance(vec2);
 *     // => 100.4987562112089
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */
Victor.prototype.distance = function (vec) {
	return Math.sqrt(this.distanceSq(vec));
};

/**
 * Calculates the squared euclidean distance between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceSq(vec2);
 *     // => 10100
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */
Victor.prototype.distanceSq = function (vec) {
	var dx = this.distanceX(vec),
		dy = this.distanceY(vec);

	return dx * dx + dy * dy;
};

/**
 * Calculates the length or magnitude of the vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.length();
 *     // => 111.80339887498948
 *
 * @return {Number} Length / Magnitude
 * @api public
 */
Victor.prototype.length = function () {
	return Math.sqrt(this.lengthSq());
};

/**
 * Squared length / magnitude
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.lengthSq();
 *     // => 12500
 *
 * @return {Number} Length / Magnitude
 * @api public
 */
Victor.prototype.lengthSq = function () {
	return this.x * this.x + this.y * this.y;
};

Victor.prototype.magnitude = Victor.prototype.length;

/**
 * Returns a true if vector is (0, 0)
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     vec.zero();
 *
 *     // => true
 *
 * @return {Boolean}
 * @api public
 */
Victor.prototype.isZero = function() {
	return this.x === 0 && this.y === 0;
};

/**
 * Returns a true if this vector is the same as another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(100, 50);
 *     vec1.isEqualTo(vec2);
 *
 *     // => true
 *
 * @return {Boolean}
 * @api public
 */
Victor.prototype.isEqualTo = function(vec2) {
	return this.x === vec2.x && this.y === vec2.y;
};

/**
 * # Utility Methods
 */

/**
 * Returns an string representation of the vector
 *
 * ### Examples:
 *     var vec = new Victor(10, 20);
 *
 *     vec.toString();
 *     // => x:10, y:20
 *
 * @return {String}
 * @api public
 */
Victor.prototype.toString = function () {
	return 'x:' + this.x + ', y:' + this.y;
};

/**
 * Returns an array representation of the vector
 *
 * ### Examples:
 *     var vec = new Victor(10, 20);
 *
 *     vec.toArray();
 *     // => [10, 20]
 *
 * @return {Array}
 * @api public
 */
Victor.prototype.toArray = function () {
	return [ this.x, this.y ];
};

/**
 * Returns an object representation of the vector
 *
 * ### Examples:
 *     var vec = new Victor(10, 20);
 *
 *     vec.toObject();
 *     // => { x: 10, y: 20 }
 *
 * @return {Object}
 * @api public
 */
Victor.prototype.toObject = function () {
	return { x: this.x, y: this.y };
};


var degrees = 180 / Math.PI;

function random (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function radian2degrees (rad) {
	return rad * degrees;
}

function degrees2radian (deg) {
	return deg / degrees;
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _level = __webpack_require__(4);

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO MOVE TO UTILS
var drawFPS = function drawFPS(ctx, value, x, y, color) {
  ctx.fillStyle = color || 'black';
  ctx.font = '20px Helvetica';
  ctx.fillText(Math.round(value), x + 20, y - 5);
};

// TODO MOVE TO core/game.js

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.maxFps = 100;
    this.listeners = [];
    this.state = {
      paused: false
    };
    this.time = {
      seconds: 0,
      minutes: 0,
      hours: 0
    };

    this.frameDuration = 1 / this.maxFps;
  }

  _createClass(Game, [{
    key: 'pause',
    value: function pause() {
      this.state.paused = true;
      this.lastPausedTime = Date.now();
    }
  }, {
    key: 'play',
    value: function play() {
      this.state.paused = false;
      this.loop();
    }
  }, {
    key: 'onResize',
    value: function onResize() {
      // IMPLEMENT
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove() {
      // IMPLEMENT
    }
  }, {
    key: 'setCanvasEl',
    value: function setCanvasEl(canvas) {
      if (!canvas) {
        this.canvasEl = (0, _utils.getCanvasEl)();
      } else if (canvasEl) {
        this.canvasEl = canvasEl;
      }
    }
  }, {
    key: 'getDt',
    value: function getDt() {
      return this.dt;
    }
  }, {
    key: 'getCtx',
    value: function getCtx() {
      this.ctx = this.canvasEl.getContext('2d');
      return this.ctx;
    }
  }, {
    key: 'setContext',
    value: function setContext() {
      this.ctx = this.getCanvasCtx();
    }
  }, {
    key: 'addListeners',
    value: function addListeners() {
      var _this = this;

      // Event Listeners
      addEventListener('mousemove', function (event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
      });

      addEventListener('resize', function () {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        _this.start();
      });
    }
  }, {
    key: 'loop',
    value: function loop() {
      var _this2 = this;

      this.reqId = requestAnimationFrame(function () {
        return _this2.loop();
      });
      var now = performance.now();
      if (!this.lastLoopTime) {
        this.lastLoopTime = now;
        return false;
      }
      this.dt = (now - this.lastLoopTime) / 1000;
      if (this.dt > this.frameDuration) {
        this.fps = 1 / this.dt;
        this.update();
        this.render();
        this.lastLoopTime = now - this.dt % this.frameDuration;
        this.time.seconds = (this.lastLoopTime / 1000).toFixed(2);
      }
    }
  }, {
    key: 'update',
    value: function update() {
      if (!this.paused) {
        this.currentLevel.update(this);
      }
    }
  }, {
    key: 'loadLevel',
    value: function loadLevel(fn) {
      this.currentLevel = fn(this);
    }
  }, {
    key: 'render',
    value: function render() {
      var c = this.getCtx();
      c.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);

      this.currentLevel.render(this);
      drawFPS(this.getCtx(), this.fps, innerWidth - 50, 25);
    }
  }, {
    key: 'start',
    value: function start() {
      if (!this.state.paused) this.play();
    }
  }]);

  return Game;
}();

// TODO rename file to index.js

var initTestEnvirotment = function initTestEnvirotment() {
  var game = window.game = new Game();
  game.setCanvasEl();
  game.loadLevel(_level.testLevel1, 'test-1');
  game.start();
};

document.addEventListener('DOMContentLoaded', function () {
  initTestEnvirotment();
});

// TODO READ PERFOMANCE TIPS
// https://www.html5rocks.com/en/tutorials/canvas/performance/

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testLevel1 = undefined;

var _object = __webpack_require__(1);

var _ui = __webpack_require__(10);

var _rbush = __webpack_require__(11);

var _rbush2 = _interopRequireDefault(_rbush);

var _victor = __webpack_require__(2);

var _victor2 = _interopRequireDefault(_victor);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testLevel1Map = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

var testLevel1 = exports.testLevel1 = function testLevel1(game) {
  var obj = void 0;

  var level = Object.create({
    map: testLevel1,
    objects: [],
    game: game
  });

  // TODO add to utils
  var removeFromList = function removeFromList(obj, list) {
    var idx = list.indexOf(obj);
    if (idx > -1) {
      list.splice(idx, 1);
    }
  };

  var removeObj = function removeObj() {
    removeFromList(this, game.objects);
    removeFromList(this, level.objects);
    game.tree.remove(this);
  };

  level.update = function () {
    this.objects.forEach(function (obj) {
      obj.update();
    });
  };

  level.render = function () {
    this.objects.forEach(function (obj) {
      obj.draw();
    });
  };

  level.testMap = testLevel1Map;
  var rows = level.testMap.length - 1;
  level.rows = rows;
  var tank = void 0;
  for (var i = 0; i <= rows; i++) {
    var cells = level.testMap[i].length - 1;
    level.cells = cells;
    for (var j = 0; j <= cells; j++) {
      var blockType = level.testMap[i][j];
      if (blockType === 2) {
        blockType = 1;
        tank = new _object.Tank({
          remove: removeObj,
          color: '#03a9f4',
          position: new _victor2.default(51 * j, 51 * i)
        });
      }
      obj = (0, _utils.lvlBlockFactory)(blockType, i, j);
      level.objects.push(obj);
    }
  }

  var enemyTank = new _object.EnemyTank({
    remove: removeObj,
    color: 'green',
    position: new _victor2.default(innerWidth - 100, innerHeight / 2)
  });
  var enemyTank2 = new _object.EnemyTank({
    remove: removeObj,
    color: 'red',
    position: new _victor2.default(innerWidth - 100, innerHeight / 2 - 50)
  });
  var enemyTank3 = new _object.EnemyTank({
    remove: removeObj,
    color: 'black',
    headColor: '#03a9f4',
    position: new _victor2.default(innerWidth - 100, innerHeight / 2 - 100)
  });
  var enemyTank4 = new _object.EnemyTank({
    remove: removeObj,
    color: 'silver',
    headColor: 'black',
    position: new _victor2.default(innerWidth - 100, innerHeight / 2 - 150)
  });
  var enemyTank5 = new _object.EnemyTank({
    remove: removeObj,
    color: 'aqua',
    headColor: 'blue',
    position: new _victor2.default(innerWidth - 100, innerHeight / 2 + 150)
  });
  var enemyTank6 = new _object.EnemyTank({
    remove: removeObj,
    color: 'orange',
    headColor: 'black',
    position: new _victor2.default(innerWidth - 100, innerHeight / 2 + 50)
  });
  var enemyTank7 = new _object.EnemyTank({
    remove: removeObj,
    color: 'brown',
    headColor: 'black',
    position: new _victor2.default(innerWidth - 100, innerHeight / 2 + 100)
  });

  window.enemyTank = enemyTank;

  tank.initPlayer();
  game.objects = [tank, enemyTank, enemyTank2, enemyTank3, enemyTank4, enemyTank5, enemyTank6, enemyTank7];
  game.tree = (0, _rbush2.default)().load(game.objects);
  level.objects = level.objects.concat(game.objects);
  return level;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Command = exports.CommandQueue = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _commands = __webpack_require__(6);

var _commands2 = _interopRequireDefault(_commands);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CommandQueue = exports.CommandQueue = function () {
  function CommandQueue(target) {
    _classCallCheck(this, CommandQueue);

    this.queue = [];
    this.target = target || null;
  }

  _createClass(CommandQueue, [{
    key: 'getFirst',
    value: function getFirst() {
      return this.queue[0];
    }
  }, {
    key: 'pop',
    value: function pop() {
      var result = this.queue.shift();
      if (this.queue.length > 0) {
        var current = this.getFirst();
        if (current.getStatus() === 'idle') {
          current.run.apply(current, current.args);
        }
      }
      return result;
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.queue.length > 0) {
        this.getFirst().update();
      }
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.queue = [];
    }
  }, {
    key: 'log',
    value: function log() {
      console.log(this.queue);
    }
  }, {
    key: 'push',
    value: function push(name) {
      var command = new Command(this.target, name);
      var args = Array.prototype.slice.call(arguments, 1);
      if (this.length === 0) {
        command.run.apply(command, args);
      } else {
        command.args = args;
      }
      this.queue.push(command);
      return command;
    }
  }, {
    key: 'length',
    get: function get() {
      return this.queue.length;
    }
  }]);

  return CommandQueue;
}();

var Command = exports.Command = function () {
  function Command(target, name) {
    _classCallCheck(this, Command);

    if (!name) {
      throw new Error('name field is required by Command constructor');
    }
    this.statuses = {
      0: 'idle',
      1: 'is-running',
      2: 'paused',
      3: 'completed',
      4: 'aborted',
      5: 'waiting'
    };
    this.target = target;
    this.currentStatus = 0;
    this.name = name;
    this.state = {};
  }

  // method is used?


  _createClass(Command, [{
    key: 'getName',
    value: function getName() {
      return this.name;
    }
  }, {
    key: 'run',
    value: function run() {
      var text = 'Cant find command with name: ' + this.name;
      var job = _commands2.default[this.name];
      if (!job) {
        throw new Error(text);
      }
      this.job = job;
      this.currentStatus = 1;
      this.job.init.apply(this, arguments);
    }

    // method not used

  }, {
    key: 'stop',
    value: function stop() {
      this.currentStatus = 2;
    }

    // method not used

  }, {
    key: 'end',
    value: function end() {
      this.currentStatus = 4;
    }
  }, {
    key: 'getStatus',
    value: function getStatus() {
      return this.statuses[this.currentStatus];
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.job && this.job.update) {
        this.job.update.call(this);
      }
    }
  }, {
    key: 'complete',
    value: function complete() {
      this.currentStatus = 3;
      this.target.queue.pop();
    }
  }]);

  return Command;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  'moveTo': {
    init: function init(x, y, relative) {
      if (typeof x !== 'number' || typeof y !== 'number') {
        return new Error('x, y is requried');
      }
      var state = this.state;
      var target = this.target;
      if (relative) {
        state.position = {
          x: target.x + x,
          y: target.y + y
        };
      } else {
        state.position = { x: x, y: y };
      }
    },
    update: function update() {
      var state = this.state;
      var target = this.target;
      state.endX = target.position.x === state.position.x;
      state.endY = target.position.y === state.position.y;

      if (state.endX && state.endY) {
        this.complete();
      } else {
        target.moveTo(state.position);
      }
    }
  },

  fire: {
    init: function init(x, y) {
      if (x < -1 || x > 1) {
        throw new Error('x has not normalized value');
      }
      if (y < -1 || y > 1) {
        throw new Error('y has not normalized value');
      }
      if (x !== undefined && y !== undefined) {
        this.target.dirVec.x = x;
        this.target.dirVec.y = y;
      }
    },
    update: function update() {
      this.target.fire();
      this.complete();
    }
  }

};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StackFSM = exports.StackFSM = function () {
  function StackFSM() {
    _classCallCheck(this, StackFSM);

    this.stack = [];
  }

  _createClass(StackFSM, [{
    key: "popState",
    value: function popState() {
      return this.stack.pop();
    }
  }, {
    key: "pushState",
    value: function pushState(state) {
      if (this.getCurrentState() !== state) {
        this.stack.push(state);
      }
    }
  }, {
    key: "getCurrentState",
    value: function getCurrentState() {
      return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
    }
  }, {
    key: "update",
    value: function update() {
      var state = this.getCurrentState();
      if (state !== null) {
        state();
      }
    }
  }]);

  return StackFSM;
}();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Queue = __webpack_require__(9);

module.exports = knn;

function knn(tree, x, y, n, predicate) {
    var node = tree.data,
        result = [],
        toBBox = tree.toBBox,
        i, child;

    var queue = new Queue(null, compareDist);

    while (node) {
        for (i = 0; i < node.children.length; i++) {
            child = node.children[i];
            queue.push({
                node: child,
                isItem: node.leaf,
                dist: boxDist(x, y, node.leaf ? toBBox(child) : child)
            });
        }

        while (queue.length && queue.peek().isItem) {
            var candidate = queue.pop().node;
            if (!predicate || predicate(candidate))
                result.push(candidate);
            if (n && result.length === n) return result;
        }

        node = queue.pop();
        if (node) node = node.node;
    }

    return result;
}

function compareDist(a, b) {
    return a.dist - b.dist;
}

function boxDist(x, y, box) {
    var dx = axisDist(x, box.minX, box.maxX),
        dy = axisDist(y, box.minY, box.maxY);
    return dx * dx + dy * dy;
}

function axisDist(k, min, max) {
    return k < min ? min - k :
           k <= max ? 0 :
           k - max;
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = TinyQueue;
module.exports.default = TinyQueue;

function TinyQueue(data, compare) {
    if (!(this instanceof TinyQueue)) return new TinyQueue(data, compare);

    this.data = data || [];
    this.length = this.data.length;
    this.compare = compare || defaultCompare;

    if (this.length > 0) {
        for (var i = (this.length >> 1) - 1; i >= 0; i--) this._down(i);
    }
}

function defaultCompare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}

TinyQueue.prototype = {

    push: function (item) {
        this.data.push(item);
        this.length++;
        this._up(this.length - 1);
    },

    pop: function () {
        if (this.length === 0) return undefined;

        var top = this.data[0];
        this.length--;

        if (this.length > 0) {
            this.data[0] = this.data[this.length];
            this._down(0);
        }
        this.data.pop();

        return top;
    },

    peek: function () {
        return this.data[0];
    },

    _up: function (pos) {
        var data = this.data;
        var compare = this.compare;
        var item = data[pos];

        while (pos > 0) {
            var parent = (pos - 1) >> 1;
            var current = data[parent];
            if (compare(item, current) >= 0) break;
            data[pos] = current;
            pos = parent;
        }

        data[pos] = item;
    },

    _down: function (pos) {
        var data = this.data;
        var compare = this.compare;
        var halfLength = this.length >> 1;
        var item = data[pos];

        while (pos < halfLength) {
            var left = (pos << 1) + 1;
            var right = left + 1;
            var best = data[left];

            if (right < this.length && compare(data[right], best) < 0) {
                left = right;
                best = data[right];
            }
            if (compare(best, item) >= 0) break;

            data[pos] = best;
            pos = left;
        }

        data[pos] = item;
    }
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Panel = function () {
  function Panel() {
    _classCallCheck(this, Panel);
  }

  _createClass(Panel, [{
    key: 'constuctor',
    value: function constuctor(el, options) {
      var x = options.x,
          y = options.y,
          width = options.width,
          height = options.height,
          title = options.title,
          children = options.children;

      this.tpl = options.tpl;
      this.x = x;
      this.y = y;
      this.model = options.model;
      this.width = width;
      this.height = height;
      this.title = title;
      this.model.listen('update', this.render());
    }
  }, {
    key: 'setModel',
    value: function setModel(model) {
      this.model = model;
    }
  }, {
    key: 'getModel',
    value: function getModel() {
      return this.model;
    }
  }, {
    key: 'render',
    value: function render() {
      this.el.insertAdjacentHTML('beforeBegin', this.tpl(this.model.getAttrs()));
    }
  }]);

  return Panel;
}();

exports.default = {
  Views: {
    Panel: Panel
  }
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = rbush;
module.exports.default = rbush;

var quickselect = __webpack_require__(12);

function rbush(maxEntries, format) {
    if (!(this instanceof rbush)) return new rbush(maxEntries, format);

    // max entries in a node is 9 by default; min node fill is 40% for best performance
    this._maxEntries = Math.max(4, maxEntries || 9);
    this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4));

    if (format) {
        this._initFormat(format);
    }

    this.clear();
}

rbush.prototype = {

    all: function () {
        return this._all(this.data, []);
    },

    search: function (bbox) {

        var node = this.data,
            result = [],
            toBBox = this.toBBox;

        if (!intersects(bbox, node)) return result;

        var nodesToSearch = [],
            i, len, child, childBBox;

        while (node) {
            for (i = 0, len = node.children.length; i < len; i++) {

                child = node.children[i];
                childBBox = node.leaf ? toBBox(child) : child;

                if (intersects(bbox, childBBox)) {
                    if (node.leaf) result.push(child);
                    else if (contains(bbox, childBBox)) this._all(child, result);
                    else nodesToSearch.push(child);
                }
            }
            node = nodesToSearch.pop();
        }

        return result;
    },

    collides: function (bbox) {

        var node = this.data,
            toBBox = this.toBBox;

        if (!intersects(bbox, node)) return false;

        var nodesToSearch = [],
            i, len, child, childBBox;

        while (node) {
            for (i = 0, len = node.children.length; i < len; i++) {

                child = node.children[i];
                childBBox = node.leaf ? toBBox(child) : child;

                if (intersects(bbox, childBBox)) {
                    if (node.leaf || contains(bbox, childBBox)) return true;
                    nodesToSearch.push(child);
                }
            }
            node = nodesToSearch.pop();
        }

        return false;
    },

    load: function (data) {
        if (!(data && data.length)) return this;

        if (data.length < this._minEntries) {
            for (var i = 0, len = data.length; i < len; i++) {
                this.insert(data[i]);
            }
            return this;
        }

        // recursively build the tree with the given data from scratch using OMT algorithm
        var node = this._build(data.slice(), 0, data.length - 1, 0);

        if (!this.data.children.length) {
            // save as is if tree is empty
            this.data = node;

        } else if (this.data.height === node.height) {
            // split root if trees have the same height
            this._splitRoot(this.data, node);

        } else {
            if (this.data.height < node.height) {
                // swap trees if inserted one is bigger
                var tmpNode = this.data;
                this.data = node;
                node = tmpNode;
            }

            // insert the small tree into the large tree at appropriate level
            this._insert(node, this.data.height - node.height - 1, true);
        }

        return this;
    },

    insert: function (item) {
        if (item) this._insert(item, this.data.height - 1);
        return this;
    },

    clear: function () {
        this.data = createNode([]);
        return this;
    },

    remove: function (item, equalsFn) {
        if (!item) return this;

        var node = this.data,
            bbox = this.toBBox(item),
            path = [],
            indexes = [],
            i, parent, index, goingUp;

        // depth-first iterative tree traversal
        while (node || path.length) {

            if (!node) { // go up
                node = path.pop();
                parent = path[path.length - 1];
                i = indexes.pop();
                goingUp = true;
            }

            if (node.leaf) { // check current node
                index = findItem(item, node.children, equalsFn);

                if (index !== -1) {
                    // item found, remove the item and condense tree upwards
                    node.children.splice(index, 1);
                    path.push(node);
                    this._condense(path);
                    return this;
                }
            }

            if (!goingUp && !node.leaf && contains(node, bbox)) { // go down
                path.push(node);
                indexes.push(i);
                i = 0;
                parent = node;
                node = node.children[0];

            } else if (parent) { // go right
                i++;
                node = parent.children[i];
                goingUp = false;

            } else node = null; // nothing found
        }

        return this;
    },

    toBBox: function (item) { return item; },

    compareMinX: compareNodeMinX,
    compareMinY: compareNodeMinY,

    toJSON: function () { return this.data; },

    fromJSON: function (data) {
        this.data = data;
        return this;
    },

    _all: function (node, result) {
        var nodesToSearch = [];
        while (node) {
            if (node.leaf) result.push.apply(result, node.children);
            else nodesToSearch.push.apply(nodesToSearch, node.children);

            node = nodesToSearch.pop();
        }
        return result;
    },

    _build: function (items, left, right, height) {

        var N = right - left + 1,
            M = this._maxEntries,
            node;

        if (N <= M) {
            // reached leaf level; return leaf
            node = createNode(items.slice(left, right + 1));
            calcBBox(node, this.toBBox);
            return node;
        }

        if (!height) {
            // target height of the bulk-loaded tree
            height = Math.ceil(Math.log(N) / Math.log(M));

            // target number of root entries to maximize storage utilization
            M = Math.ceil(N / Math.pow(M, height - 1));
        }

        node = createNode([]);
        node.leaf = false;
        node.height = height;

        // split the items into M mostly square tiles

        var N2 = Math.ceil(N / M),
            N1 = N2 * Math.ceil(Math.sqrt(M)),
            i, j, right2, right3;

        multiSelect(items, left, right, N1, this.compareMinX);

        for (i = left; i <= right; i += N1) {

            right2 = Math.min(i + N1 - 1, right);

            multiSelect(items, i, right2, N2, this.compareMinY);

            for (j = i; j <= right2; j += N2) {

                right3 = Math.min(j + N2 - 1, right2);

                // pack each entry recursively
                node.children.push(this._build(items, j, right3, height - 1));
            }
        }

        calcBBox(node, this.toBBox);

        return node;
    },

    _chooseSubtree: function (bbox, node, level, path) {

        var i, len, child, targetNode, area, enlargement, minArea, minEnlargement;

        while (true) {
            path.push(node);

            if (node.leaf || path.length - 1 === level) break;

            minArea = minEnlargement = Infinity;

            for (i = 0, len = node.children.length; i < len; i++) {
                child = node.children[i];
                area = bboxArea(child);
                enlargement = enlargedArea(bbox, child) - area;

                // choose entry with the least area enlargement
                if (enlargement < minEnlargement) {
                    minEnlargement = enlargement;
                    minArea = area < minArea ? area : minArea;
                    targetNode = child;

                } else if (enlargement === minEnlargement) {
                    // otherwise choose one with the smallest area
                    if (area < minArea) {
                        minArea = area;
                        targetNode = child;
                    }
                }
            }

            node = targetNode || node.children[0];
        }

        return node;
    },

    _insert: function (item, level, isNode) {

        var toBBox = this.toBBox,
            bbox = isNode ? item : toBBox(item),
            insertPath = [];

        // find the best node for accommodating the item, saving all nodes along the path too
        var node = this._chooseSubtree(bbox, this.data, level, insertPath);

        // put the item into the node
        node.children.push(item);
        extend(node, bbox);

        // split on node overflow; propagate upwards if necessary
        while (level >= 0) {
            if (insertPath[level].children.length > this._maxEntries) {
                this._split(insertPath, level);
                level--;
            } else break;
        }

        // adjust bboxes along the insertion path
        this._adjustParentBBoxes(bbox, insertPath, level);
    },

    // split overflowed node into two
    _split: function (insertPath, level) {

        var node = insertPath[level],
            M = node.children.length,
            m = this._minEntries;

        this._chooseSplitAxis(node, m, M);

        var splitIndex = this._chooseSplitIndex(node, m, M);

        var newNode = createNode(node.children.splice(splitIndex, node.children.length - splitIndex));
        newNode.height = node.height;
        newNode.leaf = node.leaf;

        calcBBox(node, this.toBBox);
        calcBBox(newNode, this.toBBox);

        if (level) insertPath[level - 1].children.push(newNode);
        else this._splitRoot(node, newNode);
    },

    _splitRoot: function (node, newNode) {
        // split root node
        this.data = createNode([node, newNode]);
        this.data.height = node.height + 1;
        this.data.leaf = false;
        calcBBox(this.data, this.toBBox);
    },

    _chooseSplitIndex: function (node, m, M) {

        var i, bbox1, bbox2, overlap, area, minOverlap, minArea, index;

        minOverlap = minArea = Infinity;

        for (i = m; i <= M - m; i++) {
            bbox1 = distBBox(node, 0, i, this.toBBox);
            bbox2 = distBBox(node, i, M, this.toBBox);

            overlap = intersectionArea(bbox1, bbox2);
            area = bboxArea(bbox1) + bboxArea(bbox2);

            // choose distribution with minimum overlap
            if (overlap < minOverlap) {
                minOverlap = overlap;
                index = i;

                minArea = area < minArea ? area : minArea;

            } else if (overlap === minOverlap) {
                // otherwise choose distribution with minimum area
                if (area < minArea) {
                    minArea = area;
                    index = i;
                }
            }
        }

        return index;
    },

    // sorts node children by the best axis for split
    _chooseSplitAxis: function (node, m, M) {

        var compareMinX = node.leaf ? this.compareMinX : compareNodeMinX,
            compareMinY = node.leaf ? this.compareMinY : compareNodeMinY,
            xMargin = this._allDistMargin(node, m, M, compareMinX),
            yMargin = this._allDistMargin(node, m, M, compareMinY);

        // if total distributions margin value is minimal for x, sort by minX,
        // otherwise it's already sorted by minY
        if (xMargin < yMargin) node.children.sort(compareMinX);
    },

    // total margin of all possible split distributions where each node is at least m full
    _allDistMargin: function (node, m, M, compare) {

        node.children.sort(compare);

        var toBBox = this.toBBox,
            leftBBox = distBBox(node, 0, m, toBBox),
            rightBBox = distBBox(node, M - m, M, toBBox),
            margin = bboxMargin(leftBBox) + bboxMargin(rightBBox),
            i, child;

        for (i = m; i < M - m; i++) {
            child = node.children[i];
            extend(leftBBox, node.leaf ? toBBox(child) : child);
            margin += bboxMargin(leftBBox);
        }

        for (i = M - m - 1; i >= m; i--) {
            child = node.children[i];
            extend(rightBBox, node.leaf ? toBBox(child) : child);
            margin += bboxMargin(rightBBox);
        }

        return margin;
    },

    _adjustParentBBoxes: function (bbox, path, level) {
        // adjust bboxes along the given tree path
        for (var i = level; i >= 0; i--) {
            extend(path[i], bbox);
        }
    },

    _condense: function (path) {
        // go through the path, removing empty nodes and updating bboxes
        for (var i = path.length - 1, siblings; i >= 0; i--) {
            if (path[i].children.length === 0) {
                if (i > 0) {
                    siblings = path[i - 1].children;
                    siblings.splice(siblings.indexOf(path[i]), 1);

                } else this.clear();

            } else calcBBox(path[i], this.toBBox);
        }
    },

    _initFormat: function (format) {
        // data format (minX, minY, maxX, maxY accessors)

        // uses eval-type function compilation instead of just accepting a toBBox function
        // because the algorithms are very sensitive to sorting functions performance,
        // so they should be dead simple and without inner calls

        var compareArr = ['return a', ' - b', ';'];

        this.compareMinX = new Function('a', 'b', compareArr.join(format[0]));
        this.compareMinY = new Function('a', 'b', compareArr.join(format[1]));

        this.toBBox = new Function('a',
            'return {minX: a' + format[0] +
            ', minY: a' + format[1] +
            ', maxX: a' + format[2] +
            ', maxY: a' + format[3] + '};');
    }
};

function findItem(item, items, equalsFn) {
    if (!equalsFn) return items.indexOf(item);

    for (var i = 0; i < items.length; i++) {
        if (equalsFn(item, items[i])) return i;
    }
    return -1;
}

// calculate node's bbox from bboxes of its children
function calcBBox(node, toBBox) {
    distBBox(node, 0, node.children.length, toBBox, node);
}

// min bounding rectangle of node children from k to p-1
function distBBox(node, k, p, toBBox, destNode) {
    if (!destNode) destNode = createNode(null);
    destNode.minX = Infinity;
    destNode.minY = Infinity;
    destNode.maxX = -Infinity;
    destNode.maxY = -Infinity;

    for (var i = k, child; i < p; i++) {
        child = node.children[i];
        extend(destNode, node.leaf ? toBBox(child) : child);
    }

    return destNode;
}

function extend(a, b) {
    a.minX = Math.min(a.minX, b.minX);
    a.minY = Math.min(a.minY, b.minY);
    a.maxX = Math.max(a.maxX, b.maxX);
    a.maxY = Math.max(a.maxY, b.maxY);
    return a;
}

function compareNodeMinX(a, b) { return a.minX - b.minX; }
function compareNodeMinY(a, b) { return a.minY - b.minY; }

function bboxArea(a)   { return (a.maxX - a.minX) * (a.maxY - a.minY); }
function bboxMargin(a) { return (a.maxX - a.minX) + (a.maxY - a.minY); }

function enlargedArea(a, b) {
    return (Math.max(b.maxX, a.maxX) - Math.min(b.minX, a.minX)) *
           (Math.max(b.maxY, a.maxY) - Math.min(b.minY, a.minY));
}

function intersectionArea(a, b) {
    var minX = Math.max(a.minX, b.minX),
        minY = Math.max(a.minY, b.minY),
        maxX = Math.min(a.maxX, b.maxX),
        maxY = Math.min(a.maxY, b.maxY);

    return Math.max(0, maxX - minX) *
           Math.max(0, maxY - minY);
}

function contains(a, b) {
    return a.minX <= b.minX &&
           a.minY <= b.minY &&
           b.maxX <= a.maxX &&
           b.maxY <= a.maxY;
}

function intersects(a, b) {
    return b.minX <= a.maxX &&
           b.minY <= a.maxY &&
           b.maxX >= a.minX &&
           b.maxY >= a.minY;
}

function createNode(children) {
    return {
        children: children,
        height: 1,
        leaf: true,
        minX: Infinity,
        minY: Infinity,
        maxX: -Infinity,
        maxY: -Infinity
    };
}

// sort an array so that items come in groups of n unsorted items, with groups sorted between each other;
// combines selection algorithm with binary divide & conquer approach

function multiSelect(arr, left, right, n, compare) {
    var stack = [left, right],
        mid;

    while (stack.length) {
        right = stack.pop();
        left = stack.pop();

        if (right - left <= n) continue;

        mid = left + Math.ceil((right - left) / n / 2) * n;
        quickselect(arr, mid, left, right, compare);

        stack.push(left, mid, mid, right);
    }
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = quickselect;
module.exports.default = quickselect;

function quickselect(arr, k, left, right, compare) {
    quickselectStep(arr, k, left || 0, right || (arr.length - 1), compare || defaultCompare);
};

function quickselectStep(arr, k, left, right, compare) {

    while (right > left) {
        if (right - left > 600) {
            var n = right - left + 1;
            var m = k - left + 1;
            var z = Math.log(n);
            var s = 0.5 * Math.exp(2 * z / 3);
            var sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
            var newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
            var newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
            quickselectStep(arr, k, newLeft, newRight, compare);
        }

        var t = arr[k];
        var i = left;
        var j = right;

        swap(arr, left, k);
        if (compare(arr[right], t) > 0) swap(arr, left, right);

        while (i < j) {
            swap(arr, i, j);
            i++;
            j--;
            while (compare(arr[i], t) < 0) i++;
            while (compare(arr[j], t) > 0) j--;
        }

        if (compare(arr[left], t) === 0) swap(arr, left, j);
        else {
            j++;
            swap(arr, j, right);
        }

        if (j <= k) left = j + 1;
        if (k <= j) right = j - 1;
    }
}

function swap(arr, i, j) {
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

function defaultCompare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map