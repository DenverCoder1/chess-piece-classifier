async function start() {
  // Load the model
  const tfliteModel = await tflite.loadTFLiteModel("models/model.tflite");

  // Setup the trigger button
  setupTrigger(tfliteModel);
}

async function classify(tfliteModel) {
  const labels = ["bishop", "king", "knight", "pawn", "queen", "rook"];

  // Load the image
  const image = tf.browser.fromPixels(document.querySelector("img"));

  // Resize the image
  const resizedImage = tf.image.resizeBilinear(image, [224, 224]);

  // Prepare the input tensors from the image
  // the image must have shape '1,224,224,3' and be an integer type
  const inputTensor = {
    input_1: tf.cast(tf.reshape(resizedImage, [1, 224, 224, 3]), "int32"),
  };

  // Run the inference and get the output tensors
  const outputTensor = tfliteModel.predict(inputTensor);

  // Get the output tensor values
  const outputTensorValues = await outputTensor.data();

  // Get the top prediction
  const topPrediction = outputTensorValues.indexOf(
    Math.max(...outputTensorValues)
  );

  // Display the prediction
  document.querySelector(".prediction").innerText = `${labels[topPrediction]}`;

  // Display likelihoods
  const likelihoods = Array.from(outputTensorValues).map(
    (value, index) => `${labels[index]}: ${value}`
  );
  document.querySelector(".likelihoods").innerText = likelihoods.join("\n");

  // Remove hide class
  document.querySelector(".results").classList.remove("hide");
}

function setupTrigger(tfliteModel) {
  const trigger = document.querySelector(".trigger");
  trigger.textContent = "Classify!";

  // When the trigger is clicked, classify the image.
  document.querySelector(".trigger").addEventListener("click", (e) => {
    trigger.textContent = "Processing...";
    setTimeout(() => {
      classify(tfliteModel);
      trigger.textContent = "Classify!";
    });
  });

  // Setup image upload
  document.querySelector(".image-upload").addEventListener("change", (e) => {
    // Get the file
    const file = e.target.files[0];
    // Set the image source to the file
    document.querySelector("img").src = URL.createObjectURL(file);
  });
}

start();