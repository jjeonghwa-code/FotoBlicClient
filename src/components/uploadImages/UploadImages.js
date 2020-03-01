import React, { Component } from "react";
import "../../globalStyle.css";
import "./uploadImagesStyle.css";
import axios from "axios";

import ArrowDownloadImg from "../../assets/images/downloadArrow.png";
import InstaImg from "../../assets/images/insta.png";
import FacebookImg from "../../assets/images/facebook.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop } from "@fortawesome/free-solid-svg-icons";

import InstagramPhotoPicker from "react-instagram-photo-picker";
import FacebookUploader from "facebook-image-selector";

import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import ImageSelect from "../ImageSelect/ImageSelect";

import { connect } from "react-redux";

//import {thumbnail} from "easyimage";
//var imageThumbnail = require('image-thumbnail');

//var sharp = require('sharp');

import imageCompression from "browser-image-compression";

let accessToken;
let fbUserID;
let shouldDisplayLoader;
let uploadedImagesLength;
let uploadedImagesLengthRender;
let uploadedImagesCounter;
// let uploadedImagesProgress;
let formDataNiz = [];
let uploadedImages = [];

class UploadImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      instagramImages: [],
      facebookAlbums: [],
      facebookImages: [],
      imagesFromDevice: [],
      isUploading: false,
      pickedImage: [],
      showLoader: false,
      toggleCheckAll: true, //not used
      selectedFBAlbum: "",
      photosToSend: [],
      displayLoader: false,
      imageBase64: [],
      base64img: "",
      uploadedImagesProgress: 1,
      uploadProgress: 0,
      visiblePopUp: false,
      visiblePopUpForDevice: false,
      vaznoPopup: false
    };
    this.onPick = this.onPick.bind(this);
  }

  checkAll = () => {
    // let toggleCheckAll = this.state.toggleCheckAll;
    // this.setState({
    //   toggleCheckAll: !toggleCheckAll
    // });
    // let allPhotots = document.querySelectorAll(".responsive .thumbnail");
    // allPhotots.forEach(function(el, i) {
    //   if (!el.classList.contains("selected"))
    //     setTimeout(() => {
    //       el.click();
    //     }, 100);
    // });

    let toggleCheckAll = this.state.toggleCheckAll;
    this.setState({
      toggleCheckAll: !toggleCheckAll
    });
    let allPhotots = document.querySelectorAll(".image_select_container > div");
    allPhotots.forEach(function(el, i) {
      if (!el.classList.contains("selected_image"))
        el.className += " selected_image";
      // setTimeout(() => {
      //   el.click();
      // }, 100);
    });

    let photoMerge = [];

    // console.log(this.state.imagesFromDevice);
    // console.log(this.state.instagramImages);
    // console.log(this.state.facebookImages);

    let igImages = this.state.instagramImages.map((el, i) => {
      return el.biggest;
    });

    let fbImages = this.state.facebookImages.map((el, i) => {
      return el.biggest;
    });

    photoMerge = photoMerge.concat(
      this.state.imagesFromDevice,
      igImages,
      fbImages
    );

    this.setState({
      pickedImage: photoMerge
    });

    setTimeout(() => {
      this.props.updatePhotos(this.state.pickedImage);
    }, 100);

    this.props.isPicked(true);
  };

  unCheckAll = () => {
    // let toggleCheckAll = this.state.toggleCheckAll;
    // this.setState({
    //   toggleCheckAll: !toggleCheckAll
    // });
    // let allPhotots = document.querySelectorAll(".responsive .thumbnail");
    // allPhotots.forEach(function(el, i) {
    //   if (!el.classList.contains(""))
    //     setTimeout(() => {
    //       el.click();
    //     }, 100);
    // });

    let toggleCheckAll = this.state.toggleCheckAll;
    this.setState({
      toggleCheckAll: !toggleCheckAll
    });
    let allPhotots = document.querySelectorAll(".image_select_container > div");
    allPhotots.forEach(function(el, i) {
      if (!el.classList.contains("")) el.className = "";
      // setTimeout(() => {
      //   el.click();
      // }, 100);
    });

    this.setState({
      pickedImage: []
    });

    setTimeout(() => {
      this.props.updatePhotos(this.state.pickedImage);
    }, 100);
  };

  componentDidMount() {
    let fbPhotos = [];
    let igPhotos = [];
    let devicePhotos = [];

    if (this.props.sendFileProps) {
      console.log("slike koje se vracaju", this.props.sendFileProps);
      // this.setState({ displayLoader: true });
      let sendFileProps = this.props.sendFileProps.map((item, index) => {
        if (typeof item === "object") {
          if (item.fullUrl.includes("cms.fotoblicurosevic"))
            devicePhotos.push(item);
        } else {
          if (item.includes("scontent.xx.fbcdn.net"))
            fbPhotos.push({ biggest: item });
          else igPhotos.push({ biggest: item });
        }

        // if (item.includes("cms.fotoblicurosevic")) devicePhotos.push(item);
        // if (item.includes("scontent.xx.fbcdn.net")) fbPhotos.push(item);
        // if (item.includes("scontent.cdninstagram.com")) igPhotos.push(item);

        // this.setState({ displayLoader: true });
        // return item;
      });

      this.setState({
        // imagesFromDevice: this.props.sendFileProps,
        imagesFromDevice: devicePhotos,
        facebookImages: fbPhotos,
        instagramImages: igPhotos,
        displayLoader: true
      });
    }

    window.fbAsyncInit = function() {
      window.FB.init({
        appId: "2091465567832741",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v3.3"
      });

      // Now that we've initialized the JavaScript SDK, we call
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.
      // window.FB.getLoginStatus(
      //   function(response) {
      //     this.statusChangeCallback(response);
      //   }.bind(this)
      // );
    };

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  testAPI() {
    console.log("Welcome!  Fetching your information.... ");
    window.FB.api("/me", function(response) {
      console.log("Successful login for: " + response.name);
    });
    window.FB.api(
      "/me?fields=albums.limit(20){name,count,cover_photo{picture}}",
      response => {
        console.log(response);
        let fbAlbums = [];

        response.albums.data.forEach(function(album, index) {
          let fbAlbum = {
            id: album.id,
            count: album.count,
            cover_photo: album.cover_photo.picture,
            name: album.name
          };

          fbAlbums.push(fbAlbum);
        });

        this.setState({
          facebookAlbums: fbAlbums,
          visiblePopUp: true
        });

        console.log("STATE", this.state.facebookAlbums);

        // paging

        // window.FB.api(response.albums.paging.next, response => {
        //   console.log("paging", response);
        // });
      }
    );
    // window.FB.api("/me/albums?limit=100", response => {
    //   console.log("/me/albums?limit=100", response);
    // });

    // let access_Token =
    //   "EAAduLUY7CqUBAIz8wtXZAJVRRtZBnjMTnHMoP3M2y2ZAFkEIUdO5JhEw9HvdcCZCXror8pV4XJigtqNw6f1chaZBIxSRYxKybxfjXacvj5M5mcjTeIkGCXRJWAsNHTABK0IJJuvGJJZCCkArC3oxpVoc3b3of3NjWZAXshJHlEb1EVYz1JBHHL8bofjP1f5ZBKdVV9EJUm1VJwZDZD";
    let fb_user_id = "649732538512619";

    window.FB.api(
      "/" +
        fbUserID +
        "/?fields=photos.limit(500){picture,images}&access_token=" +
        accessToken,
      function(response) {
        console.log("/me/albums?limit=100", response);
      }
    );
  }

  _handleOnAlbumClick = (e, id) => {
    e.preventDefault();

    let fbImages = [];

    window.FB.api(
      "/" +
        id +
        "/?fields=photos.limit(500){picture,images}&access_token=" +
        accessToken,
      function(response) {
        console.log("albumClick", response);

        response.photos.data.forEach(function(photo, index) {
          let fbImg = {
            picture: photo.picture,
            biggest: photo.images[0].source,
            smallest: photo.images[photo.images.length - 1].source
          };

          fbImages.push(fbImg);
        });
      }
    );

    this.setState({
      facebookImages: fbImages
    });

    setTimeout(e => {
      this.handleClick(e);
    }, 500);

    this.setState({
      selectedFBAlbum: id,
      displayLoader: true
    });

    // this.setState({ displayLoader: true });

    console.log(this.state.pickedImage);
  };

  _handleOnFacebookImageClick = e => {};

  // This is called with the results from from FB.getLoginStatus().
  statusChangeCallback(response) {
    console.log(response);

    accessToken = response.authResponse.accessToken;
    fbUserID = response.authResponse.userID;

    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === "connected") {
      // Logged into your app and Facebook.
      this.testAPI();
    } else if (response.status === "not_authorized") {
      // The person is logged into Facebook, but not your app.
      console.log("Please log " + "into this app.");
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      console.log("Please log " + "into Facebook.");
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  checkLoginState() {
    window.FB.getLoginStatus(
      function(response) {
        this.statusChangeCallback(response);
      }.bind(this)
    );
  }

  handleClick = e => {
    window.FB.login(this.checkLoginState());
  };

  resetStateFile = () => {
    this.setState({
      file: []
    });
  };

  readFileAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  }

  _instagramPhotosPicked = photos => {
    this.setState({ instagramImages: photos });
    console.log("slike", photos);

    this.props.updatePhotos(photos);

    // if (document.querySelector(".chooseBox > a") != null) {
    //   document.querySelector(".chooseBox > a").click();
    // }

    // if (document.querySelector(".btnForNext > a") != null) {
    //   document.querySelector(".btnForNext > a").click();
    // }

    let fbImages = [];
    photos.forEach(function(photo, index) {
      let fbImg = {
        picture: photo,
        biggest: photo,
        smallest: photo
      };

      fbImages.push(fbImg);
    });

    this.setState({
      instagramImages: fbImages,
      displayLoader: true
    });
  };

  async _handleImageChange(e) {
    var targetEl = e.target;

    e.preventDefault();

    if (this.state.displayLoader)
      this.setState({
        showLoader: true,
        displayLoader: false,
        uploadedImagesProgress: 1
      });
    else
      this.setState({
        showLoader: true
      });

    let j;
    // let fileTest = [];
    let fileTest =
      this.state.imagesFromDevice.length > 0 ? this.state.imagesFromDevice : [];

    // let index;
    // console.log("sendFileProps", this.props.sendFileProps);
    // if (this.props.sendFileProps) {
    //   for (let index = 0; index < this.props.sendFileProps.length; index++) {
    //     fileTest.push(this.props.sendFileProps[index]);
    //   }
    // }
    let startingLength = fileTest.length;

    uploadedImagesCounter = 0;
    shouldDisplayLoader = true;
    // uploadedImagesLength = targetEl.files.length;
    uploadedImagesLength = fileTest.length + targetEl.files.length;
    uploadedImagesLengthRender = targetEl.files.length;

    // if (this.props.sendFileProps) {
    //   uploadedImagesLength += this.props.sendFileProps.length;
    // }

    let imageBase64 = [];

    for (j = 0; j < targetEl.files.length; j++) {
      let reader = new FileReader();
      let file = targetEl.files[j];

      let formData = new FormData();

      formData.append("name", file.name);
      // formData.append("number", j);
      formData.append("file", file);

      // formDataNiz.push(formData.get("name"));
      // console.log("llllllllllll", formDataNiz);

      var options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 400,
        useWebWorker: true
      };

      try {
        let compressedFile = await imageCompression(file, options);

        let imgUrl = URL.createObjectURL(compressedFile);

        fileTest.push({ url: imgUrl, fullUrl: null });
      } catch (error) {
        console.log(error);
      }

      await axios
        .post(
          "https://cms.fotoblicurosevic.rs/api/uploadPhoto",
          // "http://fotoblic.boo/api/uploadPhoto",
          formData,
          // {
          //   onUploadProgress: progressEvent => {
          //     console.log("progressEvent", progressEvent);
          //     this.setState({
          //       uploadProgress: Math.round(
          //         (progressEvent.loaded / progressEvent.total) * 100
          //       )
          //     });
          //   }
          // },
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(res => {
          console.log("odgovor", res);
          console.log("prvibroj", uploadedImagesCounter++);
          imageBase64.push(res.data);

          fileTest[j + startingLength].fullUrl = res.data;
          // this.setState({
          //   imageBase64: imageBase64
          // });
        })
        .catch(err => {
          console.log(err);
        });

      if (uploadedImagesLength === fileTest.length) {
        this.props.updatePhotos(fileTest); // Prosledjivanje slika u Parent komponentu
        this.setState({
          // file: fileTest,
          imagesFromDevice: fileTest
        });
      }

      let uploadedImagesProgress =
        (100 * uploadedImagesCounter) / targetEl.files.length;

      this.setState({
        uploadedImagesProgress
      });

      if (uploadedImagesCounter == targetEl.files.length) {
        shouldDisplayLoader = false;
      }

      if (uploadedImagesLength === fileTest.length) {
        if (!shouldDisplayLoader) {
          this.setState({
            displayLoader: true
            // imageBase64: imageBase64
          });

          // this.props.sendPhotos(this.state.imageBase64);
        }
      }
    }

    this.setState({
      showLoader: false,
      visiblePopUpForDevice: true,
      imageBase64: imageBase64
    });
  }

  _handleFacebookImageUpload = photos => {
    console.log(photos);
  };

  componentWillUnmount() {
    this.props.sendPhotos(this.state.imageBase64);
  }

  openDialog = () => {
    this.instaDialog.showDialog();

    // but.addEventListener('click',function(){

    // })
    // but.onclick=()=>{

    // }
  };

  handleClose = () => {
    this.setState({
      visiblePopUp: false
    });
  };

  handleCloseForDevice = () => {
    this.setState({
      visiblePopUpForDevice: false
    });
  };

  openVaznoPopup = () => {
    this.setState({
      vaznoPopup: true
    });
  };

  closeVaznoPopup = () => {
    this.setState({
      vaznoPopup: false
    });
  };

  //ne koristi se
  onPick(pickedImage) {
    this.setState({
      pickedImage: {
        ...this.state.pickedImage,
        [this.state.selectedFBAlbum]: pickedImage
      }
    });

    let pickedSrc;

    setTimeout(() => {
      if (this.state.selectedFBAlbum.length > 0) {
        pickedSrc = this.state.pickedImage[this.state.selectedFBAlbum].map(
          (item, index) => {
            return item.src;
          }
        );
      } else {
        pickedSrc = this.state.pickedImage.map((item, index) => {
          return item.src;
        });
      }
      this.props.updatePhotos(pickedSrc);

      // this.setState({ pickedImage: pickedSrc });

      console.log("pickedImage", this.state.pickedImage);
    }, 50);
  }

  handleImagePick = img => {
    // check if there is already that image for select / unselect purpose
    console.log("pickedImage", img);
    let newState = this.state.pickedImage;

    //   let indexOfNewImg = newState.indexOf(img);
    let indexOfNewImg = -1;

    newState.forEach((el, index) => {
      // if (el.src == img) indexOfNewImg = index;
      if (el == img) indexOfNewImg = index;
    });

    indexOfNewImg === -1
      ? // ? newState.push({ src: img })
        newState.push(img)
      : newState.splice(indexOfNewImg, 1);

    this.setState({
      pickedImage: newState
    });

    this.props.updatePhotos(this.state.pickedImage);
  };

  isPickedPhotos = data => {
    this.props.isPicked(data);
  };

  showPopUp = () => {
    this.setState({
      visiblePopUp: true
    });
  };

  render() {
    console.log("stateeee", this.state);

    let imagePicker;
    // console.log('state', this.state.imagesFromDevice)

    if (document.getElementById("#cancelButton") != null) {
      document.getElementById("#cancelButton").onclick = function() {
        alert("Hello world");
      };

      document.getElementById("#cancelButton").addEventListener(
        "click",
        function() {
          window.location.href = "...";
        },
        false
      );
    }

    if (this.state.showLoader) {
      imagePicker = (
        <div className="image_upload_loader">
          <FontAwesomeIcon
            icon={faSpinner}
            size="3x"
            color="#79c640"
            className="loader_anim"
          />
        </div>
      );
    } else {
      imagePicker = (
        <>
          {/* <ImagePicker
                        images={this.state.facebookImages.map((item, i) => ({
                            src: item.picture,
                            value: i
                        }))}
                        onPick={this.onPick}
                        multiple
                    />

                    <ImagePicker
                        images={this.state.imagesFromDevice.map((item, i) => ({
                            src: item,
                            value: i
                        }))}
                        onPick={this.onPick}
                        multiple
                    /> */}
          <div className="wrapperImageSelect">
            {" "}
            <ImageSelect
              images={this.state.facebookImages}
              fb={true}
              handleImagePick={this.handleImagePick}
              selectedImages={this.state.pickedImage}
              isPicked={data => this.isPickedPhotos(data)}
            />
            <ImageSelect
              images={this.state.instagramImages}
              insta={true}
              handleImagePick={this.handleImagePick}
              selectedImages={this.state.pickedImage}
              isPicked={data => this.isPickedPhotos(data)}
            />
            <ImageSelect
              images={this.state.imagesFromDevice}
              handleImagePick={this.handleImagePick}
              isPicked={data => this.isPickedPhotos(data)}
            />
          </div>
        </>
      );
    }
    // console.log('sta se salje', this.state.imagesFromDevice)
    return (
      <div className="uploadImages_component">
        <div className="container">
          <div className="uploadImages_holder">
            <h2>
              <img src={ArrowDownloadImg} alt="download arrow" /> Otpremite
              fotografije sa:
            </h2>
            <p className="vazno">
              <span onClick={this.openVaznoPopup}>VAŽNO</span>
            </p>
            {this.state.vaznoPopup ? (
              <div className="vaznoPopup_holder">
                <div className="myCustomPopUp">
                  <p>
                    Kako biste uspesno poslali porudzbinu,potrebno je da imate
                    jaku i stabilnu internet konekciju.
                  </p>
                  <button onClick={this.closeVaznoPopup}>OK</button>
                </div>
              </div>
            ) : null}
            <div className="uploadMethod_buttons">
              <div className="uploadBtn">
                <span>
                  <FontAwesomeIcon icon={faLaptop} color="#fff" size="2x" />
                </span>
                <div className="uredjaj">
                  <p>UREDJAJA</p>
                  <input
                    id="uploadImages"
                    type="file"
                    className="inputFile"
                    onChange={e => this._handleImageChange(e)}
                    multiple
                  />
                </div>
              </div>
              <div className="uploadBtn" onClick={e => this.handleClick(e)}>
                <span>
                  <img
                    src={FacebookImg}
                    className="instagramImg"
                    alt="Facebook Foto Urosević"
                    // onClick={e => this.handleClick(e)}
                  />
                </span>
                {/* {FaceBookUpload} */}
                <a href="#">Facebook-a</a>
                {/* <FaceBookUploader
                  appId="2091465567832741"
                  clickText="Some Text"
                  onSelection={this.handle}
                /> */}
              </div>
              <div className="uploadBtn">
                <span>
                  <img
                    src={InstaImg}
                    className="instagramImg"
                    alt="Instagram Foto Urosević"
                  />
                </span>
                {/* <Link to="/"> Instagram-a</Link> */}
                <a href="#insta" onClick={() => this.instaDialog.showDialog()}>
                  Instagram
                </a>
                <InstagramPhotoPicker
                  onPhotosPicked={photos => this._instagramPhotosPicked(photos)}
                  ref={ref => (this.instaDialog = ref)}
                  clientId={"a1540e99b31649b59b0ba391f895f3af"}
                />
              </div>
            </div>
            {this.state.file.length > 0 ||
            this.state.imagesFromDevice.length > 0 ||
            this.state.instagramImages.length > 0 ||
            this.state.facebookAlbums.length > 0 ||
            this.state.facebookImages.length > 0 ? (
              <div className="uploadMyCheck">
                <p>
                  <FontAwesomeIcon icon={faCheck} />
                  Čekirajte slike za štampu:
                </p>
                {this.state.toggleCheckAll ? (
                  <button onClick={this.checkAll}>Čekirajte sve</button>
                ) : (
                  <button className="btnRed" onClick={this.unCheckAll}>
                    Odčekirajte sve
                  </button>
                )}
              </div>
            ) : null}
            <div className="carousel_component">
              {this.state.facebookAlbums.map((item, index) => (
                <div onClick={e => this._handleOnAlbumClick(e, item.id)}>
                  <img
                    src={item.cover_photo}
                    key={index}
                    className="carousel_img_holder"
                    alt="yourPic"
                  />
                  <p>
                    {item.name} <b>({item.count})</b>
                  </p>
                </div>
              ))}

              {/* {this.state.facebookImages.map((item, index) => (
                <div onClick={e => this._handleOnFacebookImageClick(e)}>
                  <img
                    src={item.picture}
                    key={index}
                    className="carousel_img_holder"
                  />
                </div>
              ))} */}
            </div>
            {this.state.displayLoader
              ? imagePicker
              : shouldDisplayLoader && (
                  <div className="my_custom_loader_for_upload_images">
                    <FontAwesomeIcon
                      icon={faSpinner}
                      size="3x"
                      color="#79c640"
                      className="loader_anim"
                    />{" "}
                    <p>
                      {" "}
                      Slike se učitavaju... ( {uploadedImagesCounter} /{" "}
                      {uploadedImagesLengthRender}){" "}
                      {parseInt(this.state.uploadedImagesProgress)}%{" "}
                      {/* {this.state.uploadProgress}% */}
                    </p>
                  </div>
                )}
            {/* <button
                  type="button"
                  onClick={() => console.log(this.state.pickedImage)}
                >
                  OK
                </button> */}
          </div>
        </div>
        {this.state.visiblePopUp ? (
          <div className="myCustomPopUp_wrapper">
            <div className="myCustomPopUp">
              <p>
                Kliknite na zeljeni album i skrolujte ka dole kako bi ste videli
                sve fotografije
              </p>
              <button onClick={this.handleClose}>Ok</button>
            </div>
          </div>
        ) : null}
        {this.state.visiblePopUpForDevice ? (
          <div className="myCustomPopUp_wrapper">
            <div className="myCustomPopUp">
              <p>
                Čekirajte sve slike klikom na dugme, a zatim idite skroz do
                kraja strane i kliknite na opciju dalje.
              </p>
              <button onClick={this.handleCloseForDevice}>Ok</button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendPhotos: photos => {
      dispatch({
        type: "GET_BASE64_PHOTOS",
        photos: photos
      });
    }
  };
};

export default connect(null, mapDispatchToProps)(UploadImages);
