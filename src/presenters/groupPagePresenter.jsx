import React from "react";
import GroupPageView from "../views/groupPageView";
import { useParams } from "react-router-dom";

function GroupPage(props) {
  const { id } = useParams();
  const [groupName, setGroupName] = React.useState(null);
  const [groupMembers, setGroupMembers] = React.useState(null);
  //const [groupInformation, setGroupInformation] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      setGroupName(await props.model.getGroupName(id));
      setGroupMembers(await props.model.getGroupMembers(id));
    }
    fetchData();
  }, [id]);

  return <GroupPageView groupName={groupName} groupMembers={groupMembers} />;
}

export default GroupPage;
