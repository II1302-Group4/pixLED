import React from "react";
import JoinGroupPresenter from "../presenters/joinGroupPresenter";

function JoinGroupView(props) {
  if (!props.model.currentUser) {
    return <div>Please login and try again</div>;
  } else {
    return (
      <div>
        <h1>You have been invited to join Group {props.groupName}</h1>
        <button onClick={() => props.acceptInvitation()}>
          Accept invitation
        </button>
        <button>Decline invitation</button>
      </div>
    );
  }
}

export default JoinGroupView;
