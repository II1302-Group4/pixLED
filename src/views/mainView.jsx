import MatrixGridPresenter from "../presenters/matrixGridPresenter";
import ColorPalettePresenter from "../presenters/colorPalettePresenter";

function MainView(props){
    return(
        <div>
            <div className="grid">
                <MatrixGridPresenter model={props.model} isLoggedIn={props.isLoggedIn}/>
                
            </div>

            <div className="colorPalette">
                <ColorPalettePresenter model={props.model}/>
            </div>

        </div>  
    )
}

export default MainView;