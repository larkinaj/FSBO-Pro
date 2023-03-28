import { useNavigate } from 'react-router-dom';
import PurchaseAgreeFill from "../purchase-agreement-fill";

const Profile = (props) => {
  console.log('PROFILE PROPS', props)
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/profile/create")
  }
  return (
    <div>
      <h1>WELCOME {props.currentUser}</h1>
      <h3>Your Documents</h3>
      <button onClick={handleClick}>Create New Document</button>
    </div>
  )
};
export default Profile;