import React, {Component} from "react"


export default class className extends Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        console.log(this.props);
        this.props.setUploadedFile(URL.createObjectURL(event.target.files[0]));

    }


    render(){
        return(
                <div className="card">
                    <img src={this.props.uploadedFile} className="card-img-top"/>
                        <div className="card-body">
                            <input type="file" onChange={this.handleChange}/>
                        </div>
                </div>
        )

    }

}