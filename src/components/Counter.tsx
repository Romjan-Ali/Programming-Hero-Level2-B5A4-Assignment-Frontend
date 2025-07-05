import { useAppDispatch, useAppSelector } from '../redux/hooks'
import {
  increment,
  decrement,
  incrementByAmount,
} from '../redux/counter/counterSlice'

const Counter = () => {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  return (
    <div>
      <h1>Count: {count}</h1>
      <button
        style={{ margin: 'auto 10px' }}
        onClick={() => dispatch(decrement())}
      >
        -
      </button>
      <button
        style={{ margin: 'auto 10px' }}
        onClick={() => dispatch(increment())}
      >
        +
      </button>
      <button
        style={{ margin: 'auto 10px' }}
        onClick={() => dispatch(incrementByAmount(5))}
      >
        +5
      </button>
    </div>
  )
}

export default Counter
