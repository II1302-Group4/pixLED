import React from "react";
import CreateGroupView from "../views/createGroupView.jsx";

function CreateGroup(props) {
  const [error, setError] = React.useState(null);
  function saveGroupName(groupName) {
    props.model.setGroupName(groupName);

    if (props.model.groupNameError) {
      setError(props.model.groupNameError);
    }
  }
  return <CreateGroupView error={error} saveGroupName={saveGroupName} />;
}

export default CreateGroup;
