import React from "react";

function GroupMemberView(props) {
  function Member(member, index) {
    return (
      <li key={index}>
        {member.name}{" "}
        <button style={{ backgroundColor: `${member.color}` }}>hej</button>
      </li>
    );
  }
  // return (
  //   <div>
  //     <ul>{props.members.map(Member)}</ul>
  //   </div>
  // );
}

export default GroupMemberView;
