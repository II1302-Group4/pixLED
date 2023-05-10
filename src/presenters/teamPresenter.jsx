import React from "react";
import TeamView from "../views/teamView";
import { useParams, useNavigate } from "react-router-dom";
import { v4 } from "uuid";

function TeamPage(props) {
  const navigate = useNavigate();

  const [groupName, setGroupName] = React.useState(null);
  const [groupMembers, setGroupMembers] = React.useState(null);
  const [groupId, setGroupId] = React.useState(null);

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
    setGroupName(await props.model.getGroupName());
    setGroupMembers(props.model.members);
    setGroupId(props.model.currentUser.group);  
  }

  

  function saveGroupName(groupName) {
    const uuid = v4();
    props.model.setGroup(groupName, uuid);
    window.location.reload()
  }

  return (
    <TeamView
      groupName={groupName}
      groupMembers={groupMembers}
      groupId={groupId}
      saveGroupName={saveGroupName}
    />
  );
}

export default TeamPage;
