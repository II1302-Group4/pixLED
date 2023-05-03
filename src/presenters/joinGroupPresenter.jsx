import React from "react";
import JoinGroupView from "../views/joinGroupView";
import { useParams } from "react-router-dom";

function JoinGroup(props) {
  const { id } = useParams();

  console.log(id);

  return <JoinGroupView />;
}

export default JoinGroup;
