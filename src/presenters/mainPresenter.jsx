import MainView from "../views/mainView";

function MainPresenter(props) {
  return (
    <div>
      <MainView model={props.model} />
    </div>
  );
}
export default MainPresenter;
