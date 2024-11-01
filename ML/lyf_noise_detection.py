# -*- coding: utf-8 -*-
"""lyf_noise_detection.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1D1uRrAWB_oPobGolABN97iTddpXLmEXD
"""

!pip install -U sentence-transformers

from sentence_transformers import SentenceTransformer
from PIL import Image

# # Load CLIP model
model = SentenceTransformer("clip-ViT-B-32")

# Encode an image:
# img_emb = model.encode(Image.open("two_dogs_in_snow.jpg"))

img_paths = ['/content/dining_table.jpg','/content/dryer.png','/content/jeans1.png'
,'/content/shoes.png','/content/stove_image.jpg']
image_embeddings = []
for img_path in img_paths:
  image_embeddings.append(model.encode(Image.open(img_path)))


import pandas as pd
image_sim_path = pd.DataFrame()
image_sim_path['path'] = img_paths
image_sim_path['embeddings'] = image_embeddings
image_sim_path.to_csv("image_sim_df.csv",index=False)

# # Encode text descriptions
# text_emb = model.encode(
#     ["Two dogs in the snow", "A cat on a table", "A picture of London at night"]
# )

# # Compute similarities
# similarity_scores = model.similarity(img_emb, text_emb)
# print(similarity_scores)

import librosa

def find_loudest_decibel(filename):
    """Finds the loudest decibel in a given MP3 file.

    Args:
        filename: The path to the MP3 file.

    Returns:
        A tuple containing the loudest decibel value and the number of times it occurs.
    """

    # Load the audio file
    y, sr = librosa.load(filename)

    # Calculate RMS (Root Mean Square) values
    rms = librosa.feature.rms(y=y)

    # Convert RMS values to decibels
    rms_db = 40 * librosa.util.normalize(rms)

    # Find the loudest decibel value
    loudest_decibel = rms_db.max()

    # Count the number of occurrences of the loudest decibel
    occurrence_count = (rms_db == loudest_decibel).sum()

    return loudest_decibel, occurrence_count

# Example usage
filename = "supersonic.mp3"
loudest_db, count = find_loudest_decibel(filename)

print("Loudest decibel:", loudest_db)
print("Occurrence count:", count)

!pip install pydub

from pydub import AudioSegment
import numpy as np
import scipy.signal
from collections import Counter

from pydub import AudioSegment
import numpy as np
from collections import Counter

def find_loudest_moment(file_path):
    # Load the MP3 file
    audio = AudioSegment.from_mp3(file_path)

    # Convert to mono (if not already)
    audio = audio.set_channels(1)

    # Get raw audio data as NumPy array (16-bit samples)
    samples = np.array(audio.get_array_of_samples())

    # Convert from 16-bit integer to float (to avoid clipping in dB conversion)
    samples = samples.astype(np.float32)

    # Calculate amplitude in decibels for each sample
    # Adding a small epsilon value to prevent log(0)
    epsilon = 1e-10
    db_values = 20 * np.log10(np.abs(samples) + epsilon)

    # Find the maximum decibel value (loudest moment)
    max_db = np.max(db_values)
    print(f"Loudest Decibel: {max_db:.2f} dB")
    min_db = np.min(db_values)
    print(f"quitest Decibel: {min_db:.2f} dB")
    # Count how many times the loudest decibel occurs
    max_db_count = np.sum(db_values == max_db)
    print(f"Loudest moment occurs {max_db_count} times")

    return max_db, max_db_count

# Example usage
file_path = "supersonic.mp3"  # Replace with your MP3 file path
find_loudest_moment(file_path)

