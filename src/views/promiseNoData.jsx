import loading_window from "../assets/loading.gif"

function promiseNoData(promise) {
  if (!promise.promise) {
    return <div>No data</div>;
  }
  if (!promise.data && !promise.error) {
    return (
      <img id="loading" src={loading_window} />
    );
  }
  if (!promise.data && promise.error) {
    return <div>{promise.error.toString()}</div>;
  }
  if (!promise.error) {
    return false;
  }
}
export default promiseNoData;
