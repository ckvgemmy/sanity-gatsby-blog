import React from 'react'
import ReactDOM from 'react-dom'
import * as styles from "./blog-post-preview.module.css"
import {imageUrlFor} from "../lib/image-url";
import { buildImageObj } from "../lib/helpers";
import { Fragment } from "react";
import PortableText from "./portableText";

function FuturePostPreview(props) {
  return <Fragment>
    <div className={styles.leadMediaThumb}>
      {props.mainImage && props.mainImage.asset &&
        (<img
          src={imageUrlFor(buildImageObj(props.mainImage))
            .width(600)
            .height(Math.floor((9 / 16) * 600))
            .auto("format")
            .url()}
          alt={props.mainImage.alt}
        />)
      }
    </div>
    <div >
      <h3>{props.title}</h3>
    </div>
  </Fragment>
}

export default FuturePostPreview
