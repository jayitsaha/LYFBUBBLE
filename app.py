from flask import Flask, jsonify
from flask_cors import CORS
from PIL import Image
# import torch
import numpy as np
import faiss
import matplotlib.pyplot as plt
from sentence_transformers import SentenceTransformer
from PIL import Image
from flask import Flask, request
import base64
from io import BytesIO


app = Flask(__name__)
cors = CORS(app)

@app.route('/api/data_police', methods=['GET'])
def get_items_pol():
    items = [
        {     'key': 0,
              'title': 'Riot Near Cubbon Park',
              'subTitle': '''12.973826, 77.590591''',
              'avatarText': '50',
              'avatarColor': 'rgba(66, 133, 244, 1)',
              'description': '''A Peaceful Protest By Road Union Workers Turned Into A Frenzy When A Policeman Turned Violent''',
            },
            {
              'key': 1,
              'title': 'Another incident of car vandalism by auto rickshaw drivers in Bangalore',
              'subTitle': '''2.973826, 87.590591''',
              'avatarText': '5',
              'avatarColor': 'rgba(66, 133, 244, 1)',
              'description': '''They hit our vehicle from the right side and also threw a beer bottle at us. Two incidents have happened in one month! We want the lawmakers to take this seriously.''',
            }
            
            
    ]
    return jsonify(items)


@app.route('/api/data_fire', methods=['GET'])
def get_items_fire():
    items = [
        {     'key': 0,
              'title': 'Shopping Mall Caught Fire',
              'subTitle': '''12.973826, 77.590591''',
              'avatarText': '40',
              'avatarColor': 'rgba(192, 108, 90, 1.0)',
              'description': '''Shopping Mall In Koramangla Has Caught Fire And People Are Stuck Inside. We Need Immediate Support''',
            },
            {
              'key': 1,
              'title': 'Fire Breaks Out At Healthcare Facility In Bengaluru Rajanukunte, No Casualties',
              'subTitle': '''12.973826, 87.590591''',
              'avatarText': '45',
              'avatarColor': 'rgba(192, 108, 90, 1.0)',
              'description': '''According to the fire control room in Bengaluru, six fire tenders from Rajajinagar, Banaswadi, Yelahanka, Hebbal, Devanahalli, and the Doddaballapur fire stations rushed to the Raksha Health Care, where the fire broke out.''',
            },
            
            
    ]
    return jsonify(items)


@app.route('/api/data_cleaner', methods=['GET'])
def get_items_clean():
    items = [
        {     'key': 0,
              'title': 'Garbage getting collected near Tech Park',
              'subTitle': '''12.973826, 77.590591''',
              'avatarText': '100',
              'avatarColor': '"rgba(93, 144, 73, 1.0)"',
              'description': '''Garbage is getting deposited near the back gate of cessna business park. Due to which employees are facing constant discomfort.''',
            },
            {
              'key': 1,
              'title': 'Cholera alert: PGs take preventive measures amid outbreak concerns in Bengaluru',
              'subTitle': '''12.973826, 87.590591''',
              'avatarText': '45',
              'avatarColor': '"rgba(93, 144, 73, 1.0)"',
              'description': '''PGs are putting in place several measures to combat the threat, including prioritising clean food and water along with maintaining hygienic surroundings.''',
            },
            
            
    ]
    return jsonify(items)






model = SentenceTransformer("clip-ViT-B-32")


# Function to generate image embeddings
def get_image_embedding(image_path, model):
    image = Image.open(image_path).convert("RGB")


    embedding = model.encode(Image.open(image_path))

    
    return embedding

# Generate embeddings for multiple images
# embedding_1 = get_image_embedding("/Users/j0s0yz3/Documents/CUSTOMER SUPPORT LATEST/supportbot_w_langgraph/vdb_img_database/iphone.png", model)
# embedding_2 = get_image_embedding("/Users/j0s0yz3/Documents/CUSTOMER SUPPORT LATEST/supportbot_w_langgraph/vdb_img_database/suit.jpg", model)

# Metadata for each image
metadata = [
    {"product_name": "Iphone", "image_path": "/Users/j0s0yz3/Documents/HACK SINGAPORE/LYFBUBBLE/vdb_img_database/iphone.png"},
    {"product_name": "Black Suit", "image_path": "/Users/j0s0yz3/Documents/HACK SINGAPORE/LYFBUBBLE/vdb_img_database/suit.jpg"},
    {"product_name": "Ergonomic Chair", "image_path": "/Users/j0s0yz3/Documents/HACK SINGAPORE/LYFBUBBLE/vdb_img_database/chair.webp"},
    {"product_name": "Induction Cooktop", "image_path": "/Users/j0s0yz3/Documents/HACK SINGAPORE/LYFBUBBLE/vdb_img_database/induction.webp"},
    {"product_name": "Dryer", "image_path": "/Users/j0s0yz3/Documents/HACK SINGAPORE/LYFBUBBLE/vdb_img_database/dryer.png"},
    {"product_name": "Blue Jeans", "image_path": "/Users/j0s0yz3/Documents/HACK SINGAPORE/LYFBUBBLE/vdb_img_database/jeans1.png"},
    {"product_name": "Leather Shoes", "image_path": "/Users/j0s0yz3/Documents/HACK SINGAPORE/LYFBUBBLE/vdb_img_database/shoes.png"},
    {"product_name": "Office Table", "image_path": "/Users/j0s0yz3/Documents/HACK SINGAPORE/LYFBUBBLE/vdb_img_database/table.jpg"},

]

embeddings_temp = []

for data in metadata:

    embeddings_temp.append(get_image_embedding(data['image_path'], model))



# Convert embeddings to NumPy format
embeddings = np.array(embeddings_temp, dtype='float32')

# Initialize FAISS index
d = embeddings.shape[1]  # Embedding dimensionality (e.g., 768 for ViT)
index = faiss.IndexFlatL2(d)

# Add embeddings to the FAISS index
index.add(embeddings)


print(index)

@app.route('/api/get_closest_item', methods=['POST'])
def get_closest_item():
    

    data = request.get_json()
    base64_string = data.get('base64_data')

    if base64_string:
        # Decode the Base64 string
        decoded_data = base64.b64decode(base64_string)
        image = BytesIO(decoded_data)

    query_embedding = get_image_embedding(image, model)
    query_embedding_test = np.array([query_embedding], dtype='float32')


    D, I = index.search(query_embedding_test, 1)

    # Retrieve metadata for the closest matches
    closest_metadata = [metadata[i] for i in I[0]]

    # Display results
    for result in closest_metadata:
        print(f"Product Name: {result['product_name']}")
        print(f"Image Path: {result['image_path']}")
        print("---")

    # Display images using Matplotlib
    def display_images(image_paths):
        for path in image_paths:
            image = Image.open(path)
            plt.imshow(image)
            plt.axis('off')
            plt.show()

    image_paths = [result['image_path'] for result in closest_metadata]


    img = Image.open(image_paths[0])
    buffered = BytesIO()
    img.save(buffered, format="PNG")
    processed_image_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

    # Send back the processed image as Base64
    return jsonify({'recommended_image': f'data:image/png;base64,{processed_image_base64}'})

    # return jsonify({'recommended_image': img_base64})


    # display_images(image_paths)





if __name__ == '__main__':
    app.run(host="100.64.90.22", port=3000, debug=True)