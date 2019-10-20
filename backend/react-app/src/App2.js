import React, {Component} from 'react';
import './App.css';
import axios from 'axios'

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedFile: null,
      image_id: "",
      crop: {
        unit: "%",
        width: 30,
        aspect: 16 / 9,
      }
    }
  }

  onChangeHandler=event=>{
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
    console.log(event.target.files[0])
  }

  onClickHandler = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile)
    axios.post("http://localhost:5000/upload", data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      }).then(res => {
        console.log(res)
        console.log(res.statusText)
        let object_id = res["data"]["object_id"];
        this.setState({
          image_id: `http://localhost:5000/images/${object_id}`
        })
      })
  }

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({selectedSrc: reader.result})
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  onImageLoaded = image => {
    this.imageRef = image;
  }

  render() {
    return (
      <div>
        <div>Hello World</div>
        <div>
          <input type="file" onChange={this.onSelectFile} />
        </div>
        {this.state.selectedSrc && (
          <ReactCrop
            src={this.state.selectedSrc}
            crop={this.state.crop}
            onImageLoaded={this.onImageLoaded}
          />
        )}
        {/* <input type="file" name="file" onChange={this.onChangeHandler}/>
        <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
        <img src={this.state.image_id} alt="NO IMAGE AVAILABLE"/> */}
      </div>
    )
  }
}

export default App;
