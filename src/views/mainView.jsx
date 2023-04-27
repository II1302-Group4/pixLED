import Logo from '../assets/logo.png'

function MainView(props){


    return(
        <div>
            <div className="logo"> 
                <img src={Logo} width="100vh" height="100vh"/>
            </div>

            {/* placeholder for grid */}
            <div className="grid"></div>

            {/* placeholder for submit*/}
        </div>
            
    )
}
export default MainView;