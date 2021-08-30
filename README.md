# Chess Piece Classifier

This is a simple demonstration of the capabilities of a Tensorflow Lite image classification model.

It was created for a presentation in an Introduction to AI course in August 2021.

[![Peek 2021-08-29 21-18](https://user-images.githubusercontent.com/20955511/131261161-1fb7b30b-2250-4255-a6be-5444bf34925b.gif)](https://denvercoder1.github.io/chess-piece-classifier/)

## What is this?

This is a basic web interface that uses a Tensorflow Lite image classifier to classify chess pieces.

View the demo here: https://denvercoder1.github.io/chess-piece-classifier/

## Where is the data from?

The images found in [chess.tgz](data/chess.tgz) were created by taking 1-minute videos of each of the six types of pieces and splitting them into frames using VLC. The videos were filmed at 30 frames per second and 1 frame for every 50 frames was extracted from each video.

## How is the model made?

I used the [Tensorflow Image Classification Model Maker](https://www.tensorflow.org/lite/tutorials/model_maker_image_classification) to simplify the creation of the model.

![image](https://user-images.githubusercontent.com/20955511/131260911-44984a19-0177-447a-bb89-a115d151a6de.png)

The model was trained remotely using Google Colab and a copy of the Python notebook can be found [here](model_maker.ipynb).

## What about the website?

The website uses methods from [Tensorflow.js](https://js.tensorflow.org/api/latest/) to load the model, pre-process the images, and generate predictions.

## Disclaimer

This is just a simple demonstration and it was trained only on a small dataset consiting of only photos of one chess set.

To avoid overfitting, it is recommended to try with a larger dataset and perform augmentation to generate more varied data.
