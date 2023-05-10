import GroupMemberView from "../views/groupMemberView";
import React from "react";

function GroupMembers(props) {
  const [members, setMembers] = React.useState(props.model.members);


  React.useEffect(wasCreatedACB, []);

  function observerACB() {
    setMembers(props.model.members);
  }

  function wasCreatedACB() {
    props.model.addObserver(observerACB);
    function isTakenDownACB() {
      props.model.removeObserver(observerACB);
    }
    return isTakenDownACB;
  }

  return (
    <>
      {members.length == 0? null: 
      <div className="right-sidebar">
        <GroupMemberView members={members} />
      </div>}
    </>
  );
}
export default GroupMembers;
