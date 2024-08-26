import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {

  const dispatch = useDispatch()

  return (
    <div style={{ marginBottom: 10 }}>
      filter <input onChange={({ target }) => dispatch(filterChange(target.value.toLowerCase()))} />
    </div>
  )
}

export default Filter