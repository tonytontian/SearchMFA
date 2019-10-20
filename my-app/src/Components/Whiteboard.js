import React, {Component} from "react"
import UploadBoard from "./UploadBoard";
import InfoBoard from "./InfoBoard";
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../CSS/Board.css'
import Logo from '../searchMFALogo.png'
import cover from '../MFACover.png'
import Service from "../Services/Service"

export default class className extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadedFile:Logo,
            fetchedFile:{
                image : cover,
                info : "Founded in 1870, the Museum of Fine Arts, Boston, stands on the historic homelands of the Massachusett people, a site which has long served as a place of meeting and exchange among different nations. The MFA opened its doors to the public on July 4, 1876, the nation's centennial. Built in Copley Square, the MFA was then home to 5,600 works of art. Over the next several years, the collection and number of visitors grew exponentially, and in 1909 the Museum moved to its current home on Huntington Avenue.\n" +
                    "\n" +
                    "Today the MFA is one of the most comprehensive art museums in the world; the collection encompasses nearly 500,000 works of art. We welcome more than one million visitors each year to experience art from ancient Egyptian to contemporary, special exhibitions, and innovative educational programs.\n" +
                    "\n" +
                    "The Museum has undergone significant expansion and change in recent years; 2010 marked the opening of the Art of the Americas Wing, with four levels of American art from ancient to modern. In 2011, the west wing of the Museum was transformed into the Linde Family Wing for Contemporary Art, with new galleries for contemporary art and social and learning spaces. Improved and new galleries for the MFA collections are always opening."
            },
            croppedFile:null
        }

        this.setUploadedFile = this.setUploadedFile.bind(this);
        this.setFetchedFile = this.setFetchedFile.bind(this);
        this.reset = this.reset.bind(this);
    }



    setUploadedFile(file){
        Service.getImage(file).then(
            this.setState(
            {
                uploadedFile: file
            }))
    }

    setFetchedFile(file){
        this.setState({
            fetchedFile : file
        });
    }

    reset(){
        this.setState({
            fetchedFile : null,
            uploadFile : Logo
        })
    }



    render(){
        return(
            <div className="container content-container">
                <div>"this is a test"</div>
                <div className="row">
                    <div className="board left-half">
                        <UploadBoard  uploadedFile = {this.state.uploadedFile} croppedFile = {this.state.croppedFile} setUploadedFile = {this.setUploadedFile} />
                    </div>
                    <div className="board right-half">
                    <InfoBoard  fetchedFile = {this.state.fetchedFile} setFetchedFile = {this.setFetchedFile}/>
                    </div>

                </div>
            </div>


        )

    }

}