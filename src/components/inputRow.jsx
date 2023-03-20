import Error from "./error";

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
              Frame Similarity Threshold (default 90):
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
            <label htmlFor="hands">
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
