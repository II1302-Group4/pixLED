function CreateGroupView(props) {
  function setGroupName() {
    const name = document.getElementById("groupName").value;
    props.saveGroupName(name);
  }

  if (props.error) {
    alert(props.error);
  }
  return (
    <div>
      <label>Team name:</label>
      <input id="groupName"></input>
      <button onClick={setGroupName}>Create team</button>
    </div>
  );
}

export default CreateGroupView;
