import Error from "./error";
import "../styles/inputRow.css";
import { Tooltip } from "@mui/material";
import Zoom from "@mui/material/Zoom";

const thresholdTooltipText = (
  <>
    <p style={{ fontSize: "1.2em", fontWeight: "lighter" }}>
      This threshold determines how similar two frames are. Frames that have a
      Structural Similarity Index (SSIM) above this threshold are discarded. If
      you are missing sheet music portions, lowering this threshold might help.
      A threshold of 90 usually works just fine.
    </p>
  </>
);

const handsTooltipText = "";
export default function InputRow(props) {
  const {
    onSubmit,
    valid,
    threshold,
    hands,
    handleSearchChange,
    handleThresholdChange,
    handleCheckBox,
    url,
  } = props;

  return (
    <>
      <form className="input-form">
        <div className="inputs">
          <input
            id="search"
            className="search"
            value={url}
            placeholder="YouTube URL..."
            onChange={(e) => {
              handleSearchChange(e);
            }}
          ></input>
          <div className="threshold-row">
            <label htmlFor="threshold">
              <Tooltip
                title={thresholdTooltipText}
                arrow
                TransitionComponent={Zoom}
              >
                <div className="hover-text">
                  Frame Similarity Threshold (default 90):
                </div>
              </Tooltip>
            </label>
            <input
              id="threshold"
              type="number"
              value={threshold}
              min="0"
              max="100"
              onChange={(e) => {
                handleThresholdChange(e.target.value);
              }}
              style={{
                width: "3em",
                height: "2em",
                fontWeight: "lighter",
                fontSize: "1.25em",
              }}
            />
          </div>
          <div className="hands-row">
            <label htmlFor="hands" className="hover-text">
              Are there hands (or non sheet music elements) in the YouTube
              Video?
            </label>
            <input
              id="hands"
              type="checkbox"
              checked={hands}
              onChange={(e) => {
                handleCheckBox(e.target.checked);
              }}
              style={{ width: "2em", height: "2em" }}
            />
          </div>
        </div>
        <input
          type="submit"
          className="button"
          onClick={(e) => onSubmit(e)}
          value="Get Sheet Music"
        />
      </form>
      {url && !valid ? (
        <Error>URL should start with 'https://www.youtube.com/watch?v='</Error>
      ) : null}
    </>
  );
}
