function HistoryView(props) {
  function Post({ groupName, photoURL, date }, index) {
    return (
      <div key={index} class="card">
        <div class="card-body">
          <h4 class="card-title">{groupName}</h4>
          <h6 class="card-subtitle mb-2 text-muted">{date}</h6>
          <img src={photoURL} />
        </div>
      </div>
    );
  }

  return <div>{props.posts.map(Post)}</div>;
}

export default HistoryView;
