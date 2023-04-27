import Logo from '../assets/logo.png'
import LoginPresenter from '../presenters/loginPresenter'

function topBarView(props){
    return(
        <div>
            <div className="logo"> 
                <img src={Logo} width="100vh" height="100vh"/>
            </div>

            <LoginPresenter />
            
        </div>  
    )
}

export default topBarView;