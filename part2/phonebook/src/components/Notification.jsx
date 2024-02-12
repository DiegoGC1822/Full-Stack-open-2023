const Notification = ({ message }) => {

    if (message === null) {
      return null
    }

    const style = {};

    for (const clave in message) {
      if (clave !== 'content') {
        style[clave] = message[clave];
      }
    }
  
    return (
      <div style={style}>
        {message.content}
      </div>
    )
}

export default Notification