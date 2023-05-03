import React from "react";
import GroupPageView from "../views/groupPageView";

function GroupPage(props) {
  const [groupInformation, setGroupInformation] = React.useState(null);
  React.useEffect(() => {}, []);

  return <GroupPageView />;
}

export default GroupPage;
