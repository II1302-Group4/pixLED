import React from "react";
import { useNavigate } from "react-router-dom";

function TeamView(props) {
  const navigate = useNavigate();

  if (!props.groupId) {
    function setGroupName() {
      const name = document.getElementById("groupName").value;
      props.saveGroupName(name);
    }
    return (
      <div className="team-page">
        <button onClick={() => navigate("/")}>Back</button>
        <div id="create-group-form" className="window">
          <div className="title-bar">
            <div className="title-bar-text">|</div>
          </div>
          <h4 className="group-title">Create a team</h4>
          <label>Team name:</label>
          <input id="groupName"></input>
          <button onClick={setGroupName}>Create team</button>
        </div>
      </div>
    );
  }

  function Member(member, index) {
    return (
      <div key={index} className="group-member-team-page" id={member}>
        <div className="member-name">{member.name}</div>
        <div
          className="colour-container"
          style={{ backgroundColor: `${member.color}` }}
        ></div>
        {index === 0 ? <span>Leader</span> : null}
      </div>
    );
  }

  return (
    <div className="team-page">
      <button onClick={() => navigate("/")}>Back</button>
      <h1 id="team-title">Team {props.groupName} </h1>
      <div className="window">
        <div className="title-bar">
          <div className="title-bar-text">Invitation link</div>
        </div>
        <a>http://pixled-17de5.web.app/invitation/{props.groupId}</a>
      </div>
      <div className="window">
        <div className="title-bar">
          <div className="title-bar-text">Team</div>
        </div>
        <div className="group-container">
          {props.groupMembers.map(Member)}
          {!(props.groupMembers[0]?.name == props.user?.name) ? (
            <button onClick={() => props.leaveTeam()}>Leave the team</button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default TeamView;
