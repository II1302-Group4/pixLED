import React from "react";
import JoinGroupView from "../views/joinGroupView";
import { useParams } from "react-router-dom";

function JoinGroup(props) {
  const { id } = useParams();
  const [groupName, setGroupName] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      setGroupName(await props.model.getGroupName(id));
    }
    fetchData();
  }, [id]);

  function acceptInvitation() {
    props.model.acceptInvitation(id);
  }
  return (
    <JoinGroupView
      acceptInvitation={acceptInvitation}
      model={props.model}
      isLoggedIn={props.isLoggedIn}
      groupName={groupName}
    />
  );
}

export default JoinGroup;
