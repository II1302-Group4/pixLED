import React from "react";
import JoinGroupView from "../views/joinGroupView";
import { useParams } from "react-router-dom";

function JoinGroup(props) {
  const { id } = useParams();
  const [groupName, setGroupName] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(props.model.currentUser);

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
      setGroupName(await props.model.getGroupName(id));
    }
    fetchData();
  }, [id]);

  function acceptInvitation() {
    props.model.acceptInvitation(id);
    setTimeout(() => {
      navigate("/team");
    }, 1500);
  }

  function rejectInvitation() {
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }
  return (
    <JoinGroupView
      acceptInvitation={acceptInvitation}
      groupName={groupName}
      currentUser={currentUser}
      rejectInvitation={rejectInvitation}
    />
  );
}

export default JoinGroup;
