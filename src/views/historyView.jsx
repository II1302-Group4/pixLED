import { useNavigate } from "react-router-dom";

function HistoryView(props) {
  const navigate = useNavigate();
  function Post({ groupName, photoURL, date }, index) {
    const newDate = new Date(date);
    return (
      <div key={index} className="post window">
        <div className="title-bar">
        <div className="title-bar-text">{`${newDate.toLocaleDateString()} ${newDate.toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
          )}`}</div>
        </div>
        <div class="card-body">
          <h4 class="card-title">{groupName}</h4>
          <a href={photoURL}>
            <img src={photoURL} height={250} width={250} />
          </a>
        </div>
      </div>
    );
  }

  return <div className="history-page"> <button onClick={() => navigate("/")}>Back</button><div className="posts-container">{props.posts.map(Post)}</div> </div>;
}

export default HistoryView;
