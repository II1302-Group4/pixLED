import React from "react";
import { useParams } from "react-router-dom";
import GroupPagePresenter from "../presenters/groupPagePresenter";

function GroupPageView(props) {
  const { id } = useParams();
  console.log(props.groupName);
  console.log(props.groupMembers);
  return (
    <div>
      <h1>Group </h1>
      <p>Invite link: http://localhost:5173/invitation/{id}</p>
    </div>
  );
}

export default GroupPageView;
