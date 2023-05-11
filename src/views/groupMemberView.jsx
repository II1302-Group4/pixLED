import React from "react";

function GroupMemberView(props) {
  function Member(member, index) {
    return (
      <div key={index} className="group-member" id={member}>
        <div className="member-name">{member.name}</div>
        <div className="colour-container" style={{ backgroundColor: `${member.color}` }}></div>
      </div>
    );
  }
  return (
    <div>
        <h4 className="group-title">Team</h4>
      {props.members.map(Member)}
      
    </div>
  );
}

export default GroupMemberView;
