import React from "react";
import CreateGroupView from "../views/createGroupView.jsx";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

function CreateGroup(props) {
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);

  function saveGroupName(groupName) {
    const uuid = v4();
    props.model.setGroup(groupName, uuid);
  }
  return <CreateGroupView error={error} saveGroupName={saveGroupName} />;
}

export default CreateGroup;
