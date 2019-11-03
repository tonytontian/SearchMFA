import React, {Component} from 'react';
import './App.css';
import axios from 'axios'

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

// App
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedFile: null,
      image_id: "",
      crop: {
        unit: "%",
      }
    }
    this.init();
  }

  // get urls
  init = () => {
    axios.post("http://localhost:5000/map", "", {
    }).then(res => {
      let data = res["data"];
      console.log(data);
      this.setState({
        map: data,
      })
      this.setMapIndex(0);
    })
  }

  setMapIndex = index => {
    console.log(this.state.map[index]);
    this.setState({
      map_i: index,
      map_img: 'http://localhost:5000/images/' +
               this.state.map[index][0],
    })
  }

  onNextButtonClick = () => {
    this.nextImage();
  }

  nextImage = () => {
    let next_index = this.state.map_i + 1;
    if (next_index < this.state.map.length) {
      this.setMapIndex(next_index);
    } else {
      console.log("No More Images");
    }    
  }

  onXKeyDown = () => {
    let data = new FormData()
    data.append('image',
      this.state.map[this.state.map_i][0]);
    data.append('level1', 
      JSON.stringify(this.state.level1));
    data.append('level2',
      JSON.stringify(this.state.level2));
    data.append('level3',
      JSON.stringify(this.state.level3));
    axios.post("http://localhost:5000/crop", data, {
    }).then(res => {
      console.log('Finish Upload Levels');
    })
  }

  onCropChange = (crop, percentCrop) => {
    this.setState({crop})
  }

  onCropComplete = crop => {
    console.log(crop)
    this.setState({
      finalCrop: crop,
    })
  }

  onCropLevel = level => {
    switch(level) {
      case 1:
        this.setState({
          level1: this.state.crop,
          level1x: this.state.crop['x'],
          level1y: this.state.crop['y']
        })
        break
      case 2:
        this.setState({
          level2: this.state.crop,
          level2x: this.state.crop['x'],
          level2y: this.state.crop['y']
        })
        break
      case 3:
        this.setState({
          level3: this.state.crop,
          level3x: this.state.crop['x'],
          level3y: this.state.crop['y']
        })
        break
      default:
        break
    }
  }

  KEYCODE_A=65;
  KEYCODE_S=83;
  KEYCODE_D=68;
  KEYCODE_C=67;
  KEYCODE_X=88;
  _handleKeyDown = (event) => {
    switch(event.keyCode) {
      case this.KEYCODE_A:
        this.onCropLevel(1);
        break
      case this.KEYCODE_S:
        this.onCropLevel(2);
        break
      case this.KEYCODE_D:
        this.onCropLevel(3);
        break
      case this.KEYCODE_C:
        this.onNextButtonClick();
        break
      case this.KEYCODE_X:
        this.onXKeyDown();
      default:
        break
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this._handleKeyDown)
  }

  render() {
    return (
      <div>
        {this.state.map_img && (
          <ReactCrop
            src={this.state.map_img}
            crop={this.state.crop}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        <div>
          <button onClick={this.onNextButtonClick}>Next</button>
        </div>
        <div>
          <div>"level1:" {this.state.level1x}, {this.state.level1y}</div>
          <div>"level2:" {this.state.level2x}, {this.state.level2y}</div>
          <div>"level3:" {this.state.level3x}, {this.state.level3y}</div>
        </div>
      </div>
    )
  }
}

export default App;
