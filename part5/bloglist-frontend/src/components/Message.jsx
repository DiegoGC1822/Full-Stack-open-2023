const Message = ({ message }) => {

  const style = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if(message.error){
    style.color = 'red'
  } else {
    style.color = 'green'
  }

  return (
    <div style={style}>
      {message.content}
    </div>
  )
}

export default Message