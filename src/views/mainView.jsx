import Logo from '../assets/logo.png'

function MainView(props){


    return(
        <div>
            <div className="title"> 
                <img src={Logo} width="100" height="100"/>
            </div>

            {/* placeholder for grid */}
            <div className="grid"></div>

            {/* placeholder for submit*/}
        </div>
            
    )
}
export default MainView;