import { getDownloadURL, getStorage, ref, uploadBytes } from "@firebase/storage";
import { initializeApp } from "firebase/app";
import config from '../config/uploadfirebase.config'
import { Injectable } from "@nestjs/common";
import { PostRepository } from "src/post/repositories/post.repository";



@Injectable()
export class UploadService {
  constructor(private readonly postRepository: PostRepository) {

  }

  async uploadFile(file) {

    if (file) {
      const firebaseApp = initializeApp(config.firebaseConfig);
      const firestore = getStorage(firebaseApp);

      const imageRef = ref(firestore, 'test/' + file.originalname);
      const snapshot = await uploadBytes(imageRef, file.buffer);
      const imageURL = await getDownloadURL(snapshot.ref);
      const uploadUrl = await this.postRepository.create({
        thumbnailUrl: imageURL,
      });

      return uploadUrl;
    }
    return null;
  }
}