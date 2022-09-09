import React from "react";
import * as styles from "./blog-post-preview-list.module.css";
import FuturePostPreview from "./future-post-preview";

function FuturePostPreviewList(props) {
  console.log(props)
  return <div className={styles.root}>
    {props.title && <h1 >{props.title}</h1>}
    <ul className={styles.grid}>
      {props.nodes.result &&
      props.nodes.result.map((node) => (
        <div key={node._id}>
          <FuturePostPreview {...node}/>
        </div>
      ))}
    </ul>
  </div>;
}

export default FuturePostPreviewList;
