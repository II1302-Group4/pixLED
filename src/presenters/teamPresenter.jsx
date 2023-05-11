import React from "react";
import TeamView from "../views/teamView";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

function TeamPage(props) {
  const navigate = useNavigate();

  const [groupName, setGroupName] = React.useState(null);
  const [groupMembers, setGroupMembers] = React.useState(null);
  const [groupId, setGroupId] = React.useState(null);
  const [user, setCurrentUser] = React.useState(props.model.currentUser);

  React.useEffect(() => {
    async function fetchData() {
      if (props.model.members.length > 0) {
        setGroupName(await props.model.getGroupName());
        setGroupMembers(props.model.members);
        setGroupId(props.model.currentUser.group);
      }
    }
    fetchData();
    props.model.addObserver(observerACB);
    function isTakenDownACB() {
      props.model.removeObserver(observerACB);
    }
    return isTakenDownACB;
  }, []);

  async function observerACB() {
    setCurrentUser(props.model.currentUser);
    if (props.model.currentUser && props.model.currentUser.group) {
      setGroupName(await props.model.getGroupName());
      setGroupMembers(props.model.members);
      setGroupId(props.model.currentUser.group);
    }
  }

  function saveGroupName(groupName) {
    const uuid = v4();
    props.model.setGroup(groupName, uuid);
    setTimeout(() => {
      window.location.reload();
    }, 800);
  }

  async function leaveTeam() {
    await props.model.leaveTeam();
    navigate("/");
  }

  return (
    <TeamView
      groupName={groupName}
      groupMembers={groupMembers}
      groupId={groupId}
      saveGroupName={saveGroupName}
      leaveTeam={leaveTeam}
      user={user}
    />
  );
}

export default TeamPage;
