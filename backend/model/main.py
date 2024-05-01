from flask import Flask, request, jsonify
import pickle
import torch
from torch import nn
from transformers import BertForSequenceClassification, BertConfig
import re
import torch
from transformers import BertTokenizerFast
from torch.nn import Module, Linear, Dropout
from transformers import BertModel
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)



# Initialize model
class BertSimple(nn.Module):
    def __init__(self, num_labels):
        super().__init__()
        self.bert = BertModel.from_pretrained('onlplab/alephbert-base')
        self.dropout = nn.Dropout(0.1)
        self.classifier = nn.Linear(self.bert.config.hidden_size, num_labels)

    def forward(self, input_ids, attention_mask):
        outputs = self.bert(input_ids=input_ids, attention_mask=attention_mask)
        pooled_output = self.dropout(outputs.pooler_output)
        logits = self.classifier(pooled_output)
        return logits


# Initialize the model with the correct number of labels and features
num_labels = 5  # Adjust according to your specific number of classes
model = BertSimple(num_labels)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Load the model state dictionary
model.load_state_dict(torch.load("model_state_dict.pth", map_location=torch.device('cpu')))

# Load tokenizer
with open("tokenizer.pkl", "rb") as f:
    tokenizer = pickle.load(f)

# Define label map
label_map = {
    0: 'emergency',
    1: 'emotional support non urgent',
    2: 'emotional support urgent',
    3: 'legal aid non urgent',
    4: 'legal aid urgent'
}


# Text preprocessing functions
def preprocess_text(text):
    """Preprocess text by removing HTML tags, emojis, diacritics, numbers, and punctuation."""
    text = re.sub(r'<[^>]+>', '', text)  # Remove HTML tags
    text = re.sub(r'[^\u0590-\u05fe0-9\s.,!?]', '', text)  # Remove emojis and special characters
    text = re.sub(r'[\u0591-\u05C7]', '', text)  # Remove Hebrew diacritics
    text = re.sub(r'\d+', '', text)  # Remove numbers
    text = re.sub(r'[^\w\s]', '', text)  # Remove punctuation
    text = re.sub(r"(.)\1{1,}", r"\1", text)  # Normalize repeated characters
    return text


def predict(text):
    preprocessed_text = preprocess_text(text)
    if preprocessed_text:
        encoding = tokenizer(text=preprocessed_text, truncation=True, padding=True, max_length=128, return_tensors="pt")
        input_ids = encoding['input_ids'].to(device)
        attention_mask = encoding['attention_mask'].to(device)
        with torch.no_grad():
            logits = model(input_ids=input_ids, attention_mask=attention_mask)
            predicted_class = torch.argmax(logits, dim=1).item()
        return label_map[predicted_class]
    else:
        return "Error: Unable to process text."



# Define prediction endpoint
@app.route("/predict", methods=["POST"])
def prediction():
    data = request.json

    # Extract text from request data
    text = data["text"]

    # Make prediction
    predicted_label = predict(text)

    return jsonify({"prediction": predicted_label})


if __name__ == "__main__":
    app.run(debug=True)
