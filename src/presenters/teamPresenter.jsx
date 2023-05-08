import React from "react";
import TeamView from "../views/teamView";
import { useParams, useNavigate } from "react-router-dom";
import { v4 } from "uuid";

function TeamPage(props) {
  const navigate = useNavigate();

  const { id } = useParams();
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
  }, [id]);

  function saveGroupName(groupName) {
    const uuid = v4();
    props.model.setGroup(groupName, uuid);
    navigate("/groups/" + uuid);
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
