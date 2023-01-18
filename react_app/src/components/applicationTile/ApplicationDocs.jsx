import React, { useEffect, useState } from "react";
import { getImageUrl } from "../../helpers/firebase";

const ApplicationDocs = ({ link, name }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const getUrl = async () => {
      const url = await getImageUrl(link);
      setUrl(url);
    };
    getUrl();
  }, [link]);

  return (
    <div>
      {url ? (
        <div className="doc_drawer_img">
          <p>{name}</p>
          <img className="dic_img_tag" src={url} alt="" />
        </div>
      ) : (
        <span className="loading">Loading....</span>
      )}
    </div>
  );
};

export default ApplicationDocs;
