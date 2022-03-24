import {useDispatch} from 'react-redux'
import {deleteGoal} from '../features/goals/goalSlice'

function GoalItem(props) {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="goal">
        <p>Goal Created at: {props.goal.createdAt}</p>
        <p>Goal Created at: {props.goal.text}</p>
        <button className="close" onClick={() => dispatch(deleteGoal(props.goal._id))}>x</button>
      </div>
    </div>
  );
}

export default GoalItem;