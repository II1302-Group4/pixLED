import React from "react";
import { useNavigate } from "react-router-dom";

function JoinGroupView(props) {
  const navigate = useNavigate();
  if (!props.currentUser) {
    setTimeout(() => {
      navigate("/");
    }, 1500);
    return <div>Please login and try again</div>;
  }

  if (props.currentUser.group) {
    setTimeout(() => {
      navigate("/team");
    }, 1500);
    return <div>You are already a member of a group</div>;
  } else {
    return (
      <div>
        <h1>You have been invited to join Group {props.groupName}</h1>
        <button onClick={() => props.acceptInvitation()}>
          Accept invitation
        </button>
        <button onClick={() => props.rejectInvitation}>
          Decline invitation
        </button>
      </div>
    );
  }
}

export default JoinGroupView;
