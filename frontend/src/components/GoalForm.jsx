import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createGoal} from '../features/goals/goalSlice'

function GoalForm() {
  const [text, setText] = useState('')

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createGoal({text}))
    setText('')
  }

  const handleChange = e => {
    setText(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">Goal</label>
        <input type="text" name='text' value={text} onChange={handleChange} />
        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
}

export default GoalForm;