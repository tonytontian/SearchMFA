import React, {Component} from "react"


export default class className extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(

            <div className="card">
                <img src={this.props.fetchedFile.image} className="card-img-top"/>
                <div className="card-body">
                    <p>{this.props.fetchedFile.info}</p>
                </div>
            </div>


        )
    }
}