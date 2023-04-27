import MainView from '../views/mainView'

function MainPresenter(props) {
    return (
        <div>
            <MainView model={props.model} isLoggedIn={props.isLoggedIn}/>
        </div>
    )
}
export default MainPresenter;