import React from "react";
import { useParams } from "react-router-dom";

function GroupPageView(props) {
  const { id } = useParams();
  return (
    <div>
      <h1>Group </h1>
      <p>Invite link: http://localhost:5173/invitation/{id}</p>
    </div>
  );
}

export default GroupPageView;
