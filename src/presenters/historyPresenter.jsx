import React from "react";
import HistoryView from "../views/historyView";

function History(props) {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      setPosts(await props.model.getPosts());
    }
    fetchData();
  }, []);

  return <HistoryView posts={posts} />;
}
export default History;
