## Offline Menu Translator 🍜
A simple Flutter application that demonstrates the power of on-device, offline, multimodal AI using the `flutter_gemma` package. This app can translate a Japanese menu from an image, even without an internet connection.

This project was built as a proof-of-concept for my Medium article, which details the entire journey and implementation.
[Using Gemma for Flutter apps: First steps with on-device AI in Flutter using flutter_gemma package](https://medium.com/@vogelcsongorbenedek/using-gemma-for-flutter-apps-91f746e3347c)


### ✨ Features
- Offline First: The entire AI interaction happens on-device, with no internet connection required.
- Multimodal Input: Understands both images and text prompts in a single query.
- Powered by Gemma 3N: Utilizes Google's lightweight and powerful Gemma 3 Nano model.
- Simple, Single-Screen UI: A minimal, easy-to-understand chat interface.

![Menu translator flow](https://github.com/user-attachments/assets/0e27399f-4603-4e51-8101-86ace29b6ae8)


### 🚀 Getting Started
To run this project locally, follow these steps:

Add Your Hugging Face Token:
You will need a Hugging Face access token to download the Gemma model. Open `lib/data/gemma_downloader_datasource.dart` and replace the placeholder with your own token:

``` dart
const String accessToken = 'YOUR_HUGGING_FACE_TOKEN_HERE';
```


### 🛠️ Tech Stack
Flutter: The UI toolkit for building the application.

- `flutter_gemma`: The core package for running Gemma models on-device.
- `image_picker`: For selecting images from the camera or gallery.

Any contributions is welcomed! 🙏
