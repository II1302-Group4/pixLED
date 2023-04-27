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
      <label>Group name:</label>
      <input id="groupName"></input>
      <button onClick={setGroupName}>Submit</button>
    </div>
  );
}

export default CreateGroupView;
