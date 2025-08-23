import './ShowMessage.css'

const ShowMessage = ({message}) => {
  return (
    <div className='site-message'>
      <h1>{message}</h1>
    </div>
  )
}

export default ShowMessage
