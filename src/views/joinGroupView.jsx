import React from "react";
import { useNavigate } from "react-router-dom";

function JoinGroupView(props) {
  const navigate = useNavigate();
  

  function rejectInvitation() {
    props.rejectInvitation()
  }

  function acceptInvitation() {
    props.acceptInvitation()
  }

  console.log(props.groupName)

  if (props.currentUser.group) {
    setTimeout(() => {
      navigate("/team");
    }, 1500);
  } else {
    return (
      <div className="invite-page">
      <div className="window">
        <div className="title-bar">
          <div className="title-bar-text">|</div>
        </div>
        <h3>You have been invited to join <br/>Group {props.groupName}</h3>
        <button onClick={acceptInvitation}>
          Accept invitation
        </button>
        <button onClick={rejectInvitation}>
          Decline invitation
        </button>
      </div>
      </div>
    );
  }
}

export default JoinGroupView;
