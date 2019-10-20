import React, {Component} from 'react';
import './App.css';
import axios from 'axios'

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

var BACKEND_IP = "localhost"
var BACKEND_PORT = "5000"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedFile: null,
      image_id: "",
      crop: {
        unit: "%",
        width: 30,
        // aspect: 16 / 9,
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
    // data.append('file', this.state.selectedFile)
    data.append('file', this.file_blob);
    axios.post(`http://${BACKEND_IP}:${BACKEND_PORT}/upload`, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      }).then(res => {
        console.log(res)
        console.log(res.statusText)
        let object_id = res["data"]["object_id"];
        this.setState({
          image_id: `http://${BACKEND_IP}:${BACKEND_PORT}/images/${object_id}`
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

  onCropComplete = crop => {
    this.makeClientCrop(crop)
  }

  onCropChange = (crop, percentCrop) => {
    this.setState({crop})
  }

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({croppedImageUrl});
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        this.file_blob = blob;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
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
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        {this.state.croppedImageUrl && (
          <img alt="Crop" style={{maxWidth: "100%"}}
               src={this.state.croppedImageUrl} />
        )}
        {/* <input type="file" name="file" onChange={this.onChangeHandler}/> */}
        <button type="button" className="btn btn-success btn-block"
          onClick={this.onClickHandler}>Upload</button>
        <img src={this.state.image_id} alt="NO IMAGE AVAILABLE"/>
      </div>
    )
  }
}

export default App;
