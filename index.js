
/**
 * Module dependencies.
 */

var Emitter = require('emitter')
  , domify = require('domify')
  , classes = require('classes');

/**
 * Notification list.
 */

var list;

/**
 * Expose `notify`.
 */

exports = module.exports = notify;

// list
document.addEventListener('DOMContentLoaded', function () {
  list = domify('<ul id="notifications"></ul>');
  document.querySelector('body').appendChild(list);
}, false);


/**
 * Return a new `Notification` with the given 
 * (optional) `title` and `msg`.
 *
 * @param {String} title or msg
 * @param {String} msg
 * @return {Dialog}
 * @api public
 */

function notify(title, msg){
  switch (arguments.length) {
    case 2:
      return new Notification({ title: title, message: msg })
        .show()
        .hide(4000);
    case 1:
      return new Notification({ message: title })
        .show()
        .hide(4000);
  }
}

/**
 * Construct a notification function for `type`.
 *
 * @param {String} type
 * @return {Function}
 * @api private
 */

function type(type) {
  return function(title, msg){
    return notify.apply(this, arguments)
      .type(type);
  }
}

/**
 * Notification methods.
 */

exports.info = notify;
exports.warn = type('warn');
exports.error = type('error');

/**
 * Expose constructor.
 */

exports.Notification = Notification;

/**
 * Initialize a new `Notification`.
 *
 * Options:
 *
 *    - `title` dialog title
 *    - `message` a message to display
 *
 * @param {Object} options
 * @api public
 */

function Notification(options) {
  Emitter.call(this);
  options = options || {};
  this.el = domify(require('./template'));
  this.classes = classes(this.el);
  this.render(options);
  if (options.classname) this.classes.add(options.classname);
  if (Notification.effect) this.effect(Notification.effect);
};

/**
 * Inherit from `Emitter.prototype`.
 */

Notification.prototype = new Emitter;

/**
 * Render with the given `options`.
 *
 * @param {Object} options
 * @api public
 */

Notification.prototype.render = function(options){
  var el = this.el
    , title = options.title
    , msg = options.message
    , self = this
    , titleElement = el.querySelector('.title')
    , contentElement = el.querySelector('p');

  el.querySelector('.close').addEventListener('click', function(){
    self.emit('close');
    self.hide();
    return false;
  }, false);

  el.addEventListener('click', function(e){
    e.preventDefault();
    self.emit('click', e);
  }, false);

  titleElement.textContent = title;
  if (!title) titleElement.parentNode.removeChild(titleElement);

  // message
  if ('string' == typeof msg) {
    contentElement.textContent = msg;
  } else if (msg) {
    contentElement.parentNode.replaceChild(msg.el || msg, contentElement);
  }

  setTimeout(function(){
    self.classes.remove('hide');
  }, 0);
};

/**
 * Enable the dialog close link.
 *
 * @return {Notification} for chaining
 * @api public
 */

Notification.prototype.closable = function(){
  this.classes.add('closable');
  return this;
};

/**
 * Set the effect to `type`.
 *
 * @param {String} type
 * @return {Notification} for chaining
 * @api public
 */

Notification.prototype.effect = function(type){
  this._effect = type;
  this.classes.add(type);
  return this;
};

/**
 * Show the notification.
 *
 * @return {Notification} for chaining
 * @api public
 */

Notification.prototype.show = function(){
  list.appendChild(this.el);
  return this;
};

/**
 * Set the notification `type`.
 *
 * @param {String} type
 * @return {Notification} for chaining
 * @api public
 */

Notification.prototype.type = function(type){
  this._type = type;
  this.classes.add(type);
  return this;
};

/**
 * Make it stick (clear hide timer), and make it closable.
 *
 * @return {Notification} for chaining
 * @api public
 */

Notification.prototype.sticky = function(){
  return this.hide(0).closable();
};

/**
 * Hide the dialog with optional delay of `ms`,
 * otherwise the notification is removed immediately.
 *
 * @return {Number} ms
 * @return {Notification} for chaining
 * @api public
 */

Notification.prototype.hide = function(ms){
  var self = this;

  // duration
  if ('number' == typeof ms) {
    clearTimeout(this.timer);
    if (!ms) return this;
    this.timer = setTimeout(function(){
      self.hide();
    }, ms);
    return this;
  }

  // hide / remove
  this.classes.add('hide');
  if (this._effect) {
    setTimeout(function(self){
      self.remove();
    }, 500, this);
  } else {
    self.remove();
  }

  return this;
};

/**
 * Hide the notification without potential animation.
 *
 * @return {Dialog} for chaining
 * @api public
 */

Notification.prototype.remove = function(){
  list.removeChild(this.el);
  return this;
};
