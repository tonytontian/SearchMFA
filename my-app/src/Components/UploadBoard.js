import React, {Component} from "react"
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default class className extends Component {
    constructor(props){
        super(props)
        this.state = {
            src: null,
            crop: {
                unit: "%",
                width: 0,
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.onCropComplete = this.onCropComplete.bind(this);
        this.onCropChange = this.onCropChange.bind(this);
        this.makeClientCrop = this.makeClientCrop.bind(this);
        this.getCroppedImg = this.getCroppedImg.bind(this);
        this.onSelectFile = this.onSelectFile.bind(this);
    }
    handleChange(event) {
        console.log(this.props);
        this.props.setUploadedFile(URL.createObjectURL(event.target.files[0]));

    }

    onImageLoaded = image => {
        this.imageRef = image;
    };


    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                this.setState({ src: reader.result })
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };


    onCropComplete = crop => {
        console.log(crop);
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                "newFile.jpeg"
            );
            console.log(croppedImageUrl);
            this.setState({ croppedImageUrl });
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
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, "image/jpeg");
        });

        
    }




    render(){
        const { crop, croppedImageUrl, src } = this.state;
        return(
            <div>
                {/*<div className="card">*/}
                    {/*<img src={this.props.uploadedFile} className="card-img-top"/>*/}
                        {/*<div className="card-body">*/}
                            {/*<input type="file" onChange={this.handleChange}/>*/}
                        {/*</div>*/}
                    {/*<img src={this.props.croppedFile} className="figure-img img-fluid rounded" />*/}
                {/*</div>*/}


                {/*<div>*/}
                    {/*<input type="file" onChange={this.onSelectFile} />*/}
                {/*</div>*/}
                    <div>
                        <input type="file" onChange={this.onSelectFile} />
                    </div>
                    {src && (
                        <ReactCrop
                            src={src}
                            crop={crop}
                            onImageLoaded={this.onImageLoaded}
                            onComplete={this.onCropComplete}
                            onChange={this.onCropChange}
                        />
                    )}

                {
                        croppedImageUrl && (
                        <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
                    )}
                </div>

        )

    }

}