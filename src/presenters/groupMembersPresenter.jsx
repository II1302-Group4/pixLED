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
  return <GroupMemberView members={members} />;
}
export default GroupMembers;
