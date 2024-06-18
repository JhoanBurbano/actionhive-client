import './Loader.styles.scss'

const Loader = () => {
  return (
    <div className='loader'>
      <figure className='loader__spinner'>
        <span className='loader__spinner-in'>
          <span className='loader__spinner-in-in'></span>
        </span>
      </figure>
      <h1>Loading</h1>
    </div>
  )
}

export default Loader