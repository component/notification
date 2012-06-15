
# Notification

  Notification component.

## Installation

```
$ npm install notification-component
```

## Events

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