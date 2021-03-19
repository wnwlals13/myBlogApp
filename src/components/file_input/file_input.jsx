import React, { memo, useRef, useState } from "react";
import styles from "./file_input.module.css";

const FileInput = memo(({ imgService, name, onFileChange }) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const onButtonClick = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };

  const onImgChange = async (event) => {
    event.preventDefault();
    setLoading(true);
    const uploaded = await imgService.uploadImg(event.target.files[0]);
    setLoading(false);
    onFileChange({ name: uploaded.original_filename, url: uploaded.url });
  };
  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        type="file"
        name="file"
        className={styles.input}
        onChange={onImgChange}
      />
      <div className={styles.buttonWrap}>
        {!loading && (
          <button className={styles.button} onClick={onButtonClick}>
            {name || "이미지 업로드"}
          </button>
        )}
        {loading && <div className={styles.loading}></div>}
      </div>
    </div>
  );
});

export default FileInput;
