import React, {Component} from "react"
import UploadBoard from "./UploadBoard";
import InfoBoard from "./InfoBoard";
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../CSS/Board.css'
import Logo from '../searchMFALogo.png'
import Service from "../Services/Service"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class className extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadedFile:Logo,
            src : 'http://localhost:5000/images/1',
            detail : "Founded in 1870, the Museum of Fine Arts, Boston, stands on the historic homelands of the Massachusett people, a site which has long served as a place of meeting and exchange among different nations. The MFA opened its doors to the public on July 4, 1876, the nation's centennial. Built in Copley Square, the MFA was then home to 5,600 works of art. Over the next several years, the collection and number of visitors grew exponentially, and in 1909 the Museum moved to its current home on Huntington Avenue.\n" +
                    "\n" +
                    "Today the MFA is one of the most comprehensive art museums in the world; the collection encompasses nearly 500,000 works of art. We welcome more than one million visitors each year to experience art from ancient Egyptian to contemporary, special exhibitions, and innovative educational programs.\n" +
                    "\n" +
                    "The Museum has undergone significant expansion and change in recent years; 2010 marked the opening of the Art of the Americas Wing, with four levels of American art from ancient to modern. In 2011, the west wing of the Museum was transformed into the Linde Family Wing for Contemporary Art, with new galleries for contemporary art and social and learning spaces. Improved and new galleries for the MFA collections are always opening.",

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

    setFetchedFile(id, detail ){
        this.setState({
            src: `http://localhost:5000/images/${id}`,
            detail:detail
        })
    }

    reset(){
        this.setState({
            fetchedFile : null,
            uploadFile : Logo
        })
    }



    render(){
        return(
            <Container>
                <Row>
                    <Col sm>
                        <UploadBoard
                            uploadedFile = {this.state.uploadedFile}
                            croppedFile = {this.state.croppedFile}
                            setUploadedFile = {this.setUploadedFile}
                            setFetchedFile = {this.setFetchedFile}/>
                    </Col>
                    <Col sm>
                        <InfoBoard  src = {this.state.src}
                            detail = {this.state.detail}
                            setFetchedFile = {this.setFetchedFile}/>
                    </Col>
                </Row>
            </Container>
        )

    }

}