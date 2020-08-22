import React, { useState } from "react";
import axios from "axios";
import { getPatterns } from "./actions";
import { useDispatch } from "react-redux";

export default function Uploader() {
    const dispatch = useDispatch();
    const [uploadedImg, setUploadedImg] = useState(null);
    const [imgName, setImgName] = useState("");
    const [imgCat, setImgCat] = useState("pattern type");

    function photoUpload(e) {
        e.preventDefault();
        let fd = new FormData();

        fd.append("name", imgName);
        fd.append("category", imgCat);
        fd.append("file", uploadedImg);
        axios
            .post(
                "/photoupld",
                fd
                //onUploadProgress: ProgressEvent => {console.log("Upload progress: " +Math.round( ProgressEvent.loaded / ProgressEvent.total* 100) +"%")}
            )
            .then(() => {
                dispatch(getPatterns());
            })
            .catch((err) => {
                console.log("error in axios/post photoupload", err);
            });
    }

    return (
        <div className="uploader">
            <input
                name="name"
                type="text"
                placeholder="give it a name"
                onChange={(e) => {
                    setImgName(e.target.value);
                }}
            ></input>
            <label>
                Pattern type:
                <select
                    name="category"
                    onChange={(e) => {
                        setImgCat(e.target.value);
                    }}
                    value={imgCat}
                >
                    <option value="dots">Dots</option>
                    <option value="stripes">Stripes</option>
                    <option value="plaid">Plaid</option>
                    <option value="checkers">Checkers</option>
                    <option value="floral">Floral</option>
                    <option value="leaves">Leaves</option>
                    <option value="fruit">Fruit/Veggie</option>
                    <option value="geometric">Geometric</option>
                    <option value="vecto">Vector Art</option>
                    <option value="damasque">Damasque</option>
                    <option value="children">For Children</option>
                    <option value="other">Other</option>
                </select>
            </label>
            <input
                name="file"
                type="file"
                onChange={(e) => {
                    setUploadedImg(e.target.files[0]);
                }}
                accept="image/*"
            />

            <button onClick={photoUpload}>Upload photo</button>
            <p>*Must be under 2MB</p>
        </div>
    );
}
