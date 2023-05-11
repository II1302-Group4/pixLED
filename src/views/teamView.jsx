import React from "react";
import { useNavigate } from "react-router-dom";

function TeamView(props) {
  const navigate = useNavigate();


  console.log(props)
  
  if (!props.groupId) {
    function setGroupName() {
      const name = document.getElementById("groupName").value;
      props.saveGroupName(name);
    }
    return (
      <div className="team-page">
        <button onClick={() => navigate("/")}>Back</button>
      <div id="create-group-form"className="window">
         <div className="title-bar">
          <div className="title-bar-text">|</div>
        </div>
        <h4 className="group-title">Create a group</h4>
        <label>Group name:</label>
        <input id="groupName"></input>
        <button onClick={setGroupName}>Create group</button>
      </div>
      </div>
    );
  }

  function Member(member, index) {
    return (
      <div key={index} className="group-member-team-page" id={member}>
        <div className="member-name">{member.name}</div>
        <div className="colour-container" style={{ backgroundColor: `${member.color}` }}></div>
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
      <a>http://localhost:5173/invitation/{props.groupId}</a>
      </div>
      <div className="window">
        <div className="title-bar">
        <div className="title-bar-text">Group</div>
        </div>
        <div className="group-container">
        {props.groupMembers.map(Member)}
        <button>Leave group</button>
        </div>
      </div>
    </div>
  );
}

export default TeamView;
