import { useEffect, useState } from "react";

const useBlobUrl = (file: { base64?: string; type: string; fileName: string }) => {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (file?.base64) {
      fetch(`data:${file.type};base64,${file.base64}`)
        .then((res) => res.blob())
        .then((blob) => {
          setUrl(URL.createObjectURL(blob));
        });
    } else {
      if (file?.fileName) {
        setUrl(`/eRecruitWS/files/${file?.fileName}`);
      }
    }
  }, [file]);

  useEffect(() => {
    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [url]);

  return url;
};

export default useBlobUrl;
