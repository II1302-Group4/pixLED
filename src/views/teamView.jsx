import React from "react";

function TeamView(props) {
  if (!props.groupId) {
    function setGroupName() {
      const name = document.getElementById("groupName").value;
      props.saveGroupName(name);
    }
    return (
      <div>
        <label>Group name:</label>
        <input id="groupName"></input>
        <button onClick={setGroupName}>Submit</button>
      </div>
    );
  }

  function Member(member, index) {
    return (
      <li key={index}>
        {member.name}{" "}
        <button style={{ backgroundColor: `${member.color}` }}>hej</button>
        {index === 0 ? <span>Leader</span> : null}
      </li>
    );
  }

  return (
    <div>
      <h1>Team {props.groupName} </h1>
      <p>Invite link: http://localhost:5173/invitation/{props.groupId}</p>
      <div>
        <ul>{props.groupMembers.map(Member)}</ul>
      </div>
    </div>
  );
}

export default TeamView;
