import React from "react";
import JoinGroupView from "../views/joinGroupView";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function JoinGroup(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [groupName, setGroupName] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(wasCreatedACB, []);

  function observerACB() {
    setCurrentUser(props.model.currentUser);
  }

  function wasCreatedACB() {
    props.model.addObserver(observerACB);
    function isTakenDownACB() {
      props.model.removeObserver(observerACB);
    }
    return isTakenDownACB;
  }

  React.useEffect(() => {
    async function fetchData() {
      setGroupName(await props.model.getGroupNameToShowOnInvitationPage(id));
    }
    fetchData();
  }, [id]);

  function acceptInvitation() {
    props.model.acceptInvitation(id);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  function rejectInvitation() {
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }

  function notLoggedIn() {
    return <div>Please login and try again <button onClick={() =>  navigate("/")}>Okay</button></div>
  }
 
  return (
    <>
     {currentUser && id ? <JoinGroupView
      acceptInvitation={acceptInvitation}
      groupName={groupName}
      currentUser={currentUser}
      rejectInvitation={rejectInvitation}
    />  : notLoggedIn()}
    </>
  );
     }

export default JoinGroup;
