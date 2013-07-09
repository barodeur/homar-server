# Homar Server

## Reference API

### Post a message

#### request

    POST /messages

```json
{
  "body": "This is the message content",
  "author": {
    "email": "paul@chobert.fr"
  }
}
```

#### response
    Status: 201 Created
    NO CONTENT

## Subscribe to new messages

_Homar use [socket.io](http://socket.io/) to send message to users._
