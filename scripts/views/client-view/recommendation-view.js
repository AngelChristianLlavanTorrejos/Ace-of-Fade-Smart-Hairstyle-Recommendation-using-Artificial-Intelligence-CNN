export class RecommendationView {
  constructor () {
    this.cameraContainer = document.querySelector('.js-camera-container');
    this.uploadContainer = document.querySelector('.js-upload-container');

    this.startCamera = document.querySelector('.js-start-camera')
    this.video = document.querySelector('.js-video');

    this.backButton = document.querySelector('.js-back-button');

    this.captureButton = document.querySelector('.js-capture-button');

    this.canvas = document.querySelector('.js-canvas');

    this.uploadImage = document.querySelector('.js-upload-image')

    this.uploadButton = document.querySelector('.js-upload-button');

    this.uploadedImage = document.querySelector('.js-uploaded-image');

    this.chooseOption = document.querySelector('.js-choose-option')

    //Analyzing Loader
    this.loader = document.createElement('div');
    this.loader.classList.add('custom-loader-container');
    this.loader.innerHTML = `
      <div class="custom-loader">
        <div class="spinner"></div>
        <span>Analyzing...</span>
      </div>
    `;
    this.loader.style.display = 'none';
    document.body.appendChild(this.loader);

    const style = document.createElement('style');
    style.innerHTML = `
      .custom-loader-container {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0,0.5);
        z-index: 9999;
      }
      .custom-loader {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px 40px;
        background-color: #fff;
        border-radius: 12px;
        box-shadow: 0 0 20px rgba(0,0,0,0.3);
        font-family: Arial, sans-serif;
        font-size: 1.2rem;
        color: #333;
      }
      .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid #ccc;
        border-top-color: #007bff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 10px;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    this.recommendationResult = document.querySelector('.js-recommendation-result');
    this.faceShapeResult = document.querySelector('.js-face-shape-result');
    this.hairstyleImagesResult = document.querySelectorAll('.js-hairstyle-result');
  }

  showLoader() {
    this.loader.style.display = 'flex';
  }

  async hideLoader() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.loader.style.display = 'none';
  }

  async onUpload (callback) {
    this.uploadImage.addEventListener('change', () => {
      const file = this.uploadImage.files[0];

      if (file) {
        this.uploadButton.disabled = false;

        this.uploadedImage.src = URL.createObjectURL(file);
        this.uploadedImage.style.width = '300px';

        this.chooseOption.innerHTML = '';
      }
      else {
        this.uploadButton.disabled = true;
      }
    })

    this.uploadButton.addEventListener('click', async () => {
      const file = this.uploadImage.files[0];

      if (!file) return;

      this.showLoader();
      await callback(file);
      this.hideLoader();
    })
  }

  async onCapture (callback) {
    this.startCamera.addEventListener('click', async () => {
      const stream = await navigator.mediaDevices.getUserMedia({video: true});
      this.video.srcObject = stream;

      this.uploadContainer.style.display = 'none';
      this.cameraContainer.style.display = 'block';

      this.uploadImage.value = "";
      this.uploadedImage.src = '../images/upload-icon.png';
      this.chooseOption.innerHTML = 'Choose an option';
      this.uploadedImage.style.width = '15%';
      this.uploadButton.disabled = true;
    })

    this.backButton.addEventListener('click', () => {
      this.uploadContainer.style.display = 'block';
      this.cameraContainer.style.display = 'none';
    })

    this.captureButton.addEventListener('click', () => {
      const context = this.canvas.getContext('2d');
      context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

      this.canvas.toBlob(async (blob) => {
        const file = new File([blob], "selfie.png", {type: "image/png"});

        this.showLoader();
        await callback(file);
        this.hideLoader();

      }, "image/png")
    })
  }

  async showResult (data) {
    this.uploadContainer.style.display = 'none';
    this.cameraContainer.style.display = 'none';

    this.recommendationResult.style.display = 'block';

    this.faceShapeResult.src = `../images/faceshape/${data.face_shape}.png`;

    this.hairstyleImagesResult.forEach((img, index) => {
      img.src = `../images/hairstyles/${data.face_shape}/${index + 1}.png`
    })
  }
}