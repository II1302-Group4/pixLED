import TopBarView from '../views/topBarView'

function topBarPresenter(props) {
    return (
        <div>
            <TopBarView isLoggedIn={props.isLoggedIn}/>
        </div>
    )
}

export default topBarPresenter;