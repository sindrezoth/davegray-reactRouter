import {Link} from 'react-router-dom';

const Missing = () => {
  return (
    <main className='missing'>
      <h2>Page Not Found</h2>
      <p>Maybe we will fix it later..</p>

      <p>
        <Link to='/'>Back to Home</Link>
      </p>
    </main>
  )
}

export default Missing