import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../configs/firebase";
import { v4 } from "uuid";

export const uploadImage = async (image) => {
  try {
    if (image == null) return;

    const imageRef = ref(storage, `images/${v4() + image.name}`);

    const {
      metadata: { fullPath },
    } = await uploadBytes(imageRef, image);

    return fullPath;
  } catch (error) {
    return error.message;
  }
};

export const getImageUrl = async (name) => {
  try {
    if (name == null) return;
    const data = await getDownloadURL(ref(storage, name));
    return data;
  } catch (error) {
    return error.message;
  }
};
