import React, {Component} from "react"


export default class className extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(

            <div className="card">
                <img src={this.props.src} className="card-img-top"/>
                <div className="card-body">
                    <div dangerouslySetInnerHTML = {{__html: this.props.detail}}/>
                </div>
            </div>


        )
    }
}