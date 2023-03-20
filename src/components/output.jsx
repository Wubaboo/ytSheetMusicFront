import { useEffect, useState } from "react";
import { isCompositeComponent } from "react-dom/test-utils";
import backendServices from "../services/backendServices";
import Modal from "@mui/material/Modal";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import IconButton from "@mui/material/IconButton";
import { Icon } from "@mui/material";
import { Box } from "@mui/system";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function Result(props) {
  const [images, setImages] = useState([]);
  const [modalImage, setModalImage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const { res } = props;
  useEffect(() => {
    async function callGetImages() {
      const tempImages = await backendServices.getImages(res);
      const imageList = JSON.parse(tempImages)[res].filter((f) =>
        f.endsWith(".jpg")
      );
      setImages(imageList);
      setSelectedImages(new Set(imageList));
    }
    callGetImages();
  }, [res]);

  function handleImageClick(file) {
    if (selectedImages.has(file)) {
      const newSet = new Set(selectedImages);
      newSet.delete(file);
      setSelectedImages(newSet);
    } else {
      setSelectedImages(new Set(selectedImages).add(file));
    }
  }

  function handleClose() {
    setShowModal(false);
  }

  function handleZoom(file, i) {
    setModalImage(i);
    setShowModal(true);
  }

  function handleNavLeft() {
    const newIdx = (modalImage - 1 + images.length) % images.length;
    setModalImage(newIdx);
  }

  function handleNavRight() {
    const newIdx = (modalImage + 1) % images.length;
    setModalImage(newIdx);
  }

  async function handleCompile() {
    setLoading(true);
    if (selectedImages.length < 1) return;
    const imageList = [...selectedImages];
    imageList.sort();
    backendServices.combineSelected(res, imageList).then((res) => {
      setLoading(false);
      console.log(res);
    });
  }

  return (
    <div className="output-container">
      <div className="images-container">
        {images
          ? images.map((file, idx) => {
              return (
                <div key={idx} className="image-container">
                  <img
                    className={
                      "image-screenshot" +
                      (selectedImages.has(file) ? " selected-image" : "")
                    }
                    alt={file}
                    src={backendServices.getImageLink(res, file)}
                    onClick={() => {
                      handleImageClick(file);
                    }}
                    loading="lazy"
                  />
                  <IconButton onClick={() => handleZoom(file, idx)}>
                    <ZoomInIcon></ZoomInIcon>
                  </IconButton>
                </div>
              );
            })
          : null}
      </div>

      <div className="result-options">
        <div className="combine">
          <p>
            If your PDF doesn't look right, you can select specific images above
            and recompile!
          </p>
          <button className="recompile" onClick={handleCompile}>
            Recompile
          </button>
        </div>
        <div className="result-pdf">
          <p>Get your PDF:</p>
          <a className="res-link" href={backendServices.getPDFLink(res)}>
            {res}.pdf
          </a>
        </div>
      </div>

      <Modal open={showModal} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconButton onClick={handleNavLeft}>
            <KeyboardArrowLeftIcon sx={{ width: "10vh", height: "10vh" }} />
          </IconButton>
          <img
            className={
              selectedImages.has(images[modalImage]) ? "selected-image" : ""
            }
            src={backendServices.getImageLink(res, images[modalImage])}
            onClick={() => handleImageClick(images[modalImage])}
          ></img>
          <IconButton onClick={handleNavRight}>
            <KeyboardArrowRightIcon sx={{ width: "10vh", height: "10vh" }} />
          </IconButton>
        </Box>
      </Modal>

      {loading ? (
        <div
          className="loader"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : null}
    </div>
  );
}
