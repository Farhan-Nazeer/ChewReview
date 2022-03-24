import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import {getGoals, reset} from "../features/goals/goalSlice"

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals);

  useEffect(() => {
    if(isError){
      console.log(message)
    }

    if(!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    } 
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <p>Loading...</p>
  }
  
  return (
    <>
      <section>
        <h1>Welcome {user && user.name}!</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />
      {goals.length > 0 ? (
        <div className="goalsContainer">
          {goals.map(goal => <GoalItem key={goal._id} goal={goal}/>)}
        </div>
      ) : (<h3>You do not have any goals</h3>)}
    </>
  );
}

export default Dashboard;