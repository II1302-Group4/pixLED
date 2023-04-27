import MainView from '../views/mainView'

function MainPresenter(props) {
    return (
        <div className="top-bar">
            <MainView model={props.model}/>
        </div>
    )
}
export default MainPresenter;