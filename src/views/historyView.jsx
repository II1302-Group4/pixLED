import { useNavigate } from "react-router-dom";

function HistoryView(props) {
  const navigate = useNavigate();
  function Post({ groupName, photoURL, date }, index) {
    const newDate = new Date(date);
    return (
      <div key={index} class="card">
        <div class="card-body">
          <h4 class="card-title">{groupName}</h4>
          <h6 class="card-subtitle mb-2 text-muted">{`${newDate.toLocaleDateString()} ${newDate.toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
          )}`}</h6>
          <a href={photoURL}>
            <img src={photoURL} height={250} width={250} />
          </a>
        </div>
      </div>
    );
  }

  return <div className="history-page">{props.posts.map(Post)}</div>;
}

export default HistoryView;
