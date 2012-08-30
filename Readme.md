
# Notification

  Notification component with a clean slate to build off of,
  style and position them however you like.

  ![js growl component](http://f.cl.ly/items/143P3r3X1E1m0Y0a2E2l/Screen%20Shot%202012-07-26%20at%203.16.11%20PM.png)

  These don't _have_ to look like growl style notifications, use
  your trusty friend CSS.

## Installation

```
$ npm install notification-component
```

## Features

  - events for composition
  - structural CSS letting you decide on style
  - transient notifications
  - transient closable notifications
  - sticky (implicitly closable) notifications
  - notification classes (info, warn, error)
  - fluent API

## Events

  - `close` the notification is closed via the X
  - `click` the notification is clicked

## API

### notify(msg)

  Notify with the given `msg` and no title. The
  notification will hide after 4 seconds by default.

### notify(title, msg)

  Notify with the given `msg` and `title`. The
  notification will hide after 4 seconds by default.

### notify.info(title, [msg])

  Same as `notify()`

### notify.warn(title, [msg])

  Same as `notify()` with a `warn` class for styling.

### notify.error(title, [msg])

  Same as `notify()` with a `error` class for styling.

### Notification#sticky()

  Make the notification sticky, aka it will not close
  automatically, and it will automatically be `.closable()`.

### Notification#show()

  Show the notification.

### Notification#hide()

  Show the notification.

### Notification#closable()

  Mark the notification as closable, adding an "X" so the user
  may explicitly close it.

### Notification#effect(name)

  One of the following effects, or define your own with class `name`:

  - `slide`
  - `fade`
  - `scale`

## License

  MIT
