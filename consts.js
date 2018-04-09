// CORS

// media file
exports.MEDIA_ROOT = process.cwd() + '/media/';
exports.ACCEPTED_IMAGE_TYPE = ['.tif', '.tiff', '.jpeg', '.jpg', '.png', '.bmp'];
exports.MAX_IMAGE_SIZE = 2 * 1024 * 1024;
exports.FILENAME_LENGTH = 20;

// Mongo Remote
exports.MONGO_URI = 'mongodb://admin:Pw72UuGk@ds129050.mlab.com:29050/facediary';

// backend api base url
exports.BASE_URL = 'localhost:3001';
exports.FRONTEND_URL = 'http://csil-cpu470.csil.sfu.ca:37532';

// facebook api
exports.FACEBOOK_APP_ID = '426431911145370';
exports.FACEBOOK_APP_SECRET = '651d9f3824052cd8e9f3f6c5664cbea2';

// emotion api
exports.EMOTION_API_KEY = "59c0c894449d46fe9d2d1c439575655c";
exports.EMOTION_API_URL = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";