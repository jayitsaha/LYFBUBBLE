# -*- coding: utf-8 -*-
"""lyf_florence large sample_inference_clean_violence.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1Gr6-R7rq6tyeOo3-1gtyoy8cjP23ESf3

# Florence-2-large sample usage
"""

!pip install accelerate
!pip install flash_attn einops timm

# from google.colab import drive
# drive.mount('/content/drive')

# Commented out IPython magic to ensure Python compatibility.
from transformers import AutoProcessor, AutoModelForCausalLM
from PIL import Image
import requests
import copy
import torch
from PIL import Image as im

# %matplotlib inline

model_id = 'microsoft/Florence-2-large'
model = AutoModelForCausalLM.from_pretrained(model_id, trust_remote_code=True, torch_dtype='auto').eval().cuda()
processor = AutoProcessor.from_pretrained(model_id, trust_remote_code=True)

# #cpu
# model_id = 'microsoft/Florence-2-large'
# model = AutoModelForCausalLM.from_pretrained(model_id, trust_remote_code=True, torch_dtype='auto').eval()
# processor = AutoProcessor.from_pretrained(model_id, trust_remote_code=True)

"""## define the prediction function"""

def run_example(task_prompt, text_input=None):
    if text_input is None:
        prompt = task_prompt
    else:
        prompt = task_prompt + text_input
    inputs = processor(text=prompt, images=image, return_tensors="pt").to('cuda', torch.float16)
    generated_ids = model.generate(
      input_ids=inputs["input_ids"].cuda(),
      pixel_values=inputs["pixel_values"].cuda(),
      max_new_tokens=1024,
      early_stopping=False,
      do_sample=False,
      num_beams=3,
    )
    generated_text = processor.batch_decode(generated_ids, skip_special_tokens=False)[0]
    parsed_answer = processor.post_process_generation(
        generated_text,
        task=task_prompt,
        image_size=(image.width, image.height)
    )

    return parsed_answer

"""## init image"""

# url = "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/transformers/tasks/car.jpg?download=true"
image = Image.open(requests.get(url, stream=True).raw)

url = "/content/1. tumbler example.08.00 AM.png"
image = Image.open(url).convert("RGB")
image

"""## Run pre-defined tasks without additional inputs

### Caption
"""

task_prompt = '<CAPTION>'
run_example(task_prompt)

task_prompt = '<DETAILED_CAPTION>'
run_example(task_prompt)

task_prompt = '<MORE_DETAILED_CAPTION>'
run_example(task_prompt)

"""### Object detection

OD results format:
{'\<OD>':
    {
    'bboxes': [[x1, y1, x2, y2], ...],
    'labels': ['label1', 'label2', ...]
    }
}
"""

task_prompt = '<OD>'
results = run_example(task_prompt)
print(results)

import matplotlib.pyplot as plt
import matplotlib.patches as patches
def plot_bbox(image, data):
   # Create a figure and axes
    fig, ax = plt.subplots()

    # Display the image
    ax.imshow(image)

    # Plot each bounding box
    for bbox, label in zip(data['bboxes'], data['labels']):
        # Unpack the bounding box coordinates
        x1, y1, x2, y2 = bbox
        # Create a Rectangle patch
        rect = patches.Rectangle((x1, y1), x2-x1, y2-y1, linewidth=1, edgecolor='r', facecolor='none')
        # Add the rectangle to the Axes
        ax.add_patch(rect)
        # Annotate the label
        plt.text(x1, y1, label, color='white', fontsize=8, bbox=dict(facecolor='red', alpha=0.5))

    # Remove the axis ticks and labels
    ax.axis('off')

    # Show the plot
    plt.show()

plot_bbox(image, results['<OD>'])

"""### Dense region caption

Dense region caption results format:
{'\<DENSE_REGION_CAPTION>': {'bboxes': [[x1, y1, x2, y2], ...], 'labels': ['label1', 'label2', ...]}}
"""

task_prompt = '<DENSE_REGION_CAPTION>'
results = run_example(task_prompt)
print(results)

plot_bbox(image, results['<DENSE_REGION_CAPTION>'])

"""### Region proposal

Region proposal results format:
{'<REGION_PROPOSAL>' : {'bboxes': [[x1, y1, x2, y2], ...], 'labels': ['', '', ...]}}
"""

task_prompt = '<REGION_PROPOSAL>'
results = run_example(task_prompt)
print(results)

plot_bbox(image, results['<REGION_PROPOSAL>'])

"""## Run pre-defined tasks that requires additional inputs

### Phrase Grounding
Phrase grounding results format:
{'\<CAPTION_TO_PHRASE_GROUNDING>': {'bboxes': [[x1, y1, x2, y2], ...], 'labels': ['', '', ...]}}
"""

task_prompt = '<CAPTION_TO_PHRASE_GROUNDING>'
results = run_example(task_prompt, text_input="A green car parked in front of a yellow building.")
print(results)

plot_bbox(image, results['<CAPTION_TO_PHRASE_GROUNDING>'])

"""### Referring expression segmentation

Referring expression segmentation results format:
{'\<REFERRING_EXPRESSION_SEGMENTATION>': {'Polygons': [[[polygon]], ...], 'labels': ['', '', ...]}}, one object is represented by a list of polygons. each polygon is [x1, y1, x2, y2, ..., xn, yn]
"""

task_prompt = '<REFERRING_EXPRESSION_SEGMENTATION>'
results = run_example(task_prompt, text_input="a green car")
print(results)

from PIL import Image, ImageDraw, ImageFont
import random
import numpy as np
colormap = ['blue','orange','green','purple','brown','pink','gray','olive','cyan','red',
            'lime','indigo','violet','aqua','magenta','coral','gold','tan','skyblue']
def draw_polygons(image, prediction, fill_mask=False):
    """
    Draws segmentation masks with polygons on an image.

    Parameters:
    - image_path: Path to the image file.
    - prediction: Dictionary containing 'polygons' and 'labels' keys.
                  'polygons' is a list of lists, each containing vertices of a polygon.
                  'labels' is a list of labels corresponding to each polygon.
    - fill_mask: Boolean indicating whether to fill the polygons with color.
    """
    # Load the image

    draw = ImageDraw.Draw(image)


    # Set up scale factor if needed (use 1 if not scaling)
    scale = 1

    # Iterate over polygons and labels
    for polygons, label in zip(prediction['polygons'], prediction['labels']):
        color = random.choice(colormap)
        fill_color = random.choice(colormap) if fill_mask else None

        for _polygon in polygons:
            _polygon = np.array(_polygon).reshape(-1, 2)
            if len(_polygon) < 3:
                print('Invalid polygon:', _polygon)
                continue

            _polygon = (_polygon * scale).reshape(-1).tolist()

            # Draw the polygon
            if fill_mask:
                draw.polygon(_polygon, outline=color, fill=fill_color)
            else:
                draw.polygon(_polygon, outline=color)

            # Draw the label text
            draw.text((_polygon[0] + 8, _polygon[1] + 2), label, fill=color)

    # Save or display the image
    #image.show()  # Display the image
    display(image)

output_image = copy.deepcopy(image)
draw_polygons(output_image, results['<REFERRING_EXPRESSION_SEGMENTATION>'], fill_mask=True)

"""### region to segmentation


with additional region as inputs, format is '\<loc_x1>\<loc_y1>\<loc_x2>\<loc_y2>', [x1, y1, x2, y2] is the quantized corrdinates in [0, 999].
"""

task_prompt = '<REGION_TO_SEGMENTATION>'
results = run_example(task_prompt, text_input="<loc_702><loc_575><loc_866><loc_772>")
print(results)

output_image = copy.deepcopy(image)
draw_polygons(output_image, results['<REGION_TO_SEGMENTATION>'], fill_mask=True)

"""### Open vocabulary detection

open vocabulary detection can detect both objects and ocr texts.

results format:

{ '\<OPEN_VOCABULARY_DETECTION>': {'bboxes': [[x1, y1, x2, y2], [x1, y1, x2, y2], ...]], 'bboxes_labels': ['label_1', 'label_2', ..],
'polygons': [[[x1, y1, x2, y2, ..., xn, yn], [x1, y1, ..., xn, yn]], ...], 'polygons_labels': ['label_1', 'label_2', ...]
}}
"""

task_prompt = '<OPEN_VOCABULARY_DETECTION>'
results = run_example(task_prompt, text_input="a green car")
print(results)

def convert_to_od_format(data):
    """
    Converts a dictionary with 'bboxes' and 'bboxes_labels' into a dictionary with separate 'bboxes' and 'labels' keys.

    Parameters:
    - data: The input dictionary with 'bboxes', 'bboxes_labels', 'polygons', and 'polygons_labels' keys.

    Returns:
    - A dictionary with 'bboxes' and 'labels' keys formatted for object detection results.
    """
    # Extract bounding boxes and labels
    bboxes = data.get('bboxes', [])
    labels = data.get('bboxes_labels', [])

    # Construct the output format
    od_results = {
        'bboxes': bboxes,
        'labels': labels
    }

    return od_results

bbox_results  = convert_to_od_format(results['<OPEN_VOCABULARY_DETECTION>'])

plot_bbox(image, bbox_results)



"readu for inference!"

import cv2
import imutils
from google.colab.patches import cv2_imshow


def run_example2(task_prompt,image, text_input=None):
    if text_input is None:
        prompt = task_prompt
    else:
        prompt = task_prompt + text_input
    inputs = processor(text=prompt, images=image, return_tensors="pt").to('cuda', torch.float16)
    generated_ids = model.generate(
      input_ids=inputs["input_ids"].cuda(),
      pixel_values=inputs["pixel_values"].cuda(),
      max_new_tokens=1024,
      early_stopping=False,
      do_sample=False,
      num_beams=3,
    )
    generated_text = processor.batch_decode(generated_ids, skip_special_tokens=False)[0]
    parsed_answer = processor.post_process_generation(
        generated_text,
        task=task_prompt,
        image_size=(image.width, image.height)
    )

    return parsed_answer


def convert_to_od_format(data):
    """
    Converts a dictionary with 'bboxes' and 'bboxes_labels' into a dictionary with separate 'bboxes' and 'labels' keys.

    Parameters:
    - data: The input dictionary with 'bboxes', 'bboxes_labels', 'polygons', and 'polygons_labels' keys.

    Returns:
    - A dictionary with 'bboxes' and 'labels' keys formatted for object detection results.
    """
    # Extract bounding boxes and labels
    bboxes = data.get('bboxes', [])
    labels = data.get('bboxes_labels', [])

    # Construct the output format
    od_results = {
        'bboxes': bboxes,
        'labels': labels
    }

    return od_results

import matplotlib.pyplot as plt
import matplotlib.patches as patches
def plot_bbox(image, data):
   # Create a figure and axes
    fig, ax = plt.subplots()

    # Display the image
    ax.imshow(image)

    # Plot each bounding box
    for bbox, label in zip(data['bboxes'], data['labels']):
        # Unpack the bounding box coordinates
        x1, y1, x2, y2 = bbox
        # Create a Rectangle patch
        rect = patches.Rectangle((x1, y1), x2-x1, y2-y1, linewidth=1, edgecolor='r', facecolor='none')
        # Add the rectangle to the Axes
        ax.add_patch(rect)
        # Annotate the label
        plt.text(x1, y1, label, color='white', fontsize=8, bbox=dict(facecolor='red', alpha=0.5))

    # Remove the axis ticks and labels
    ax.axis('off')

    # Show the plot
    plt.show()
    return image

cap = cv2.VideoCapture('vid_f.mp4')

output_video = cv2.VideoWriter('output_video.mp4', cv2.VideoWriter_fourcc(*'mp4v'), 30,
                               (int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)), int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))))


def _getArea(box):
    return (box[2] - box[0]) * (box[3] - box[1])

while cap.isOpened():
    # Reading the video stream
    ret, image = cap.read()
    if ret:
        image = imutils.resize(image,
                            width=min(400, image.shape[1]))
        image_ = cv2.resize(image, (640, 480))
        # image = im.fromarray(image)
        imageRGB = cv2.cvtColor(image_, cv2.COLOR_BGR2RGB)
        image = Image.fromarray(imageRGB)
        task_prompt = '<OPEN_VOCABULARY_DETECTION>'
        results = run_example2(task_prompt, image,text_input="person")
        print(results)

        bbox_results  = convert_to_od_format(results['<OPEN_VOCABULARY_DETECTION>'])
        ppimage = plot_bbox(image, bbox_results)

        # (regions, _) = hog.detectMultiScale(image,
        #                                     winStride=(4, 4),
        #                                     padding=(4, 4),
        #                                     scale=1.05)
        # area_dict = {}
        # # print("regions",regions)
        # for (x, y, w, h) in regions:
        #   box = [x,y,w,h]
        #   area = _getArea(box)
        #   area_dict[area] = box
        #   # print(sorted(area_dict.items(),key=lambda x:x[0]))
        #   box_max = sorted(area_dict.items(),key=lambda x:x[0])[-1][-1]

        #   for (x, y, w, h) in [box_max]:
        #       cv2.rectangle(image, (x, y),
        #                   (x + w, y + h),
        #                   (81, 41, 242), 2)
        #       cv2.putText(image, "Person", (x+25, y - 30),
        #                   cv2.FONT_HERSHEY_SIMPLEX,
        #                   0.58, (81, 41, 242), 2)

              # cv2.putText(image, "", (x+44, y - 10),
              #             cv2.FONT_HERSHEY_SIMPLEX,
              #             0.58, (81, 41, 242), 2)

        output_video.write(ppimage)

        # cv2_imshow( image)

        if cv2.waitKey(25) & 0xFF == ord('q'):
            break
    else:
        break

cap.release()
cv2.destroyAllWindows()

"""### region to texts"""

import cv2
import imutils
import numpy as np
from PIL import Image
import torch
import matplotlib.pyplot as plt
import matplotlib.patches as patches

def run_example2(task_prompt, image, text_input=None):
    if text_input is None:
        prompt = task_prompt
    else:
        prompt = task_prompt + text_input
    inputs = processor(text=prompt, images=image, return_tensors="pt").to('cuda', torch.float16)
    generated_ids = model.generate(
      input_ids=inputs["input_ids"].cuda(),
      pixel_values=inputs["pixel_values"].cuda(),
      max_new_tokens=1024,
      early_stopping=False,
      do_sample=False,
      num_beams=3,
    )
    generated_text = processor.batch_decode(generated_ids, skip_special_tokens=False)[0]
    parsed_answer = processor.post_process_generation(
        generated_text,
        task=task_prompt,
        image_size=(image.width, image.height)
    )
    return parsed_answer

def convert_to_od_format(data):
    """
    Converts a dictionary with 'bboxes' and 'bboxes_labels' into a dictionary with separate 'bboxes' and 'labels' keys.
    """
    bboxes = data.get('bboxes', [])
    labels = data.get('bboxes_labels', [])
    return {'bboxes': bboxes, 'labels': labels}

def plot_bbox(image, data):
    """
    Plots bounding boxes on the given image.
    """
    fig, ax = plt.subplots()
    ax.imshow(image)

    for bbox, label in zip(data['bboxes'], data['labels']):
        x1, y1, x2, y2 = bbox
        rect = patches.Rectangle((x1, y1), x2 - x1, y2 - y1, linewidth=1, edgecolor='r', facecolor='none')
        ax.add_patch(rect)
        plt.text(x1, y1, label, color='white', fontsize=8, bbox=dict(facecolor='red', alpha=0.5))

    ax.axis('off')
    plt.show()

cap = cv2.VideoCapture('vid.mp4')

output_video = cv2.VideoWriter('output_video.mp4', cv2.VideoWriter_fourcc(*'mp4v'), 30,
                               (int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)), int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))))

while cap.isOpened():
    ret, image = cap.read()
    if ret:
        # Resize the image
        image_resized = imutils.resize(image, width=min(400, image.shape[1]))
        image_ = cv2.resize(image_resized, (640, 480))

        # Convert the image to RGB for PIL processing
        imageRGB = cv2.cvtColor(image_, cv2.COLOR_BGR2RGB)
        image_pil = Image.fromarray(imageRGB)

        # Run the object detection model and get results
        task_prompt = '<OPEN_VOCABULARY_DETECTION>'
        results = run_example2(task_prompt, image_pil, text_input="gun,violence")
        print(results)

        # Check if detection results exist
        if '<OPEN_VOCABULARY_DETECTION>' in results:
            # Convert the results to object detection format
            bbox_results = convert_to_od_format(results['<OPEN_VOCABULARY_DETECTION>'])

            # Optionally plot the bounding boxes (if visualization is needed)
            plot_bbox(imageRGB, bbox_results)

            # Convert the PIL image back to OpenCV format (BGR)
            np_image = np.array(image_pil)
            np_image_bgr = cv2.cvtColor(np_image, cv2.COLOR_RGB2BGR)

            # Write the frame to the output video
            output_video.write(np_image_bgr)

        if cv2.waitKey(25) & 0xFF == ord('q'):
            break
    else:
        break

cap.release()
output_video.release()
cv2.destroyAllWindows()

#ready for detection

import cv2
import imutils
import numpy as np
from PIL import Image
import torch
import matplotlib.pyplot as plt
import matplotlib.patches as patches

def run_example2(task_prompt, image, text_input=None):
    if text_input is None:
        prompt = task_prompt
    else:
        prompt = task_prompt + text_input
    inputs = processor(text=prompt, images=image, return_tensors="pt").to('cuda', torch.float16)
    generated_ids = model.generate(
      input_ids=inputs["input_ids"].cuda(),
      pixel_values=inputs["pixel_values"].cuda(),
      max_new_tokens=1024,
      early_stopping=False,
      do_sample=False,
      num_beams=3,
    )
    generated_text = processor.batch_decode(generated_ids, skip_special_tokens=False)[0]
    parsed_answer = processor.post_process_generation(
        generated_text,
        task=task_prompt,
        image_size=(image.width, image.height)
    )
    return parsed_answer

def convert_to_od_format(data):
    """
    Converts a dictionary with 'bboxes' and 'bboxes_labels' into a dictionary with separate 'bboxes' and 'labels' keys.
    """
    bboxes = data.get('bboxes', [])
    labels = data.get('bboxes_labels', [])
    return {'bboxes': bboxes, 'labels': labels}

def plot_bbox(image, data):
    """
    Plots bounding boxes on the given image.
    """
    fig, ax = plt.subplots()
    ax.imshow(image)

    for bbox, label in zip(data['bboxes'], data['labels']):
        x1, y1, x2, y2 = bbox
        rect = patches.Rectangle((x1, y1), x2 - x1, y2 - y1, linewidth=1, edgecolor='r', facecolor='none')
        ax.add_patch(rect)
        plt.text(x1, y1, label, color='white', fontsize=8, bbox=dict(facecolor='red', alpha=0.5))

    ax.axis('off')
    plt.show()

cap = cv2.VideoCapture('/content/WhatsApp Video 2024-10-16 at 10.45.48 PM.mp4')

# Get the video dimensions for proper output sizing
frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

output_video = cv2.VideoWriter('output_video.mp4', cv2.VideoWriter_fourcc(*'mp4v'), 30,
                               (frame_width, frame_height))

while cap.isOpened():
    ret, image = cap.read()
    if ret:
        # Resize the image for processing
        image_resized = imutils.resize(image, width=min(400, image.shape[1]))
        image_ = cv2.resize(image_resized, (640, 480))

        # Convert the image to RGB for PIL processing
        imageRGB = cv2.cvtColor(image_, cv2.COLOR_BGR2RGB)
        image_pil = Image.fromarray(imageRGB)

        # Run the object detection model and get results
        task_prompt = '<OPEN_VOCABULARY_DETECTION>'
        results = run_example2(task_prompt, image_pil, text_input="person")
        print(results)

        # Check if detection results exist
        if '<OPEN_VOCABULARY_DETECTION>' in results:
            # Convert the results to object detection format
            bbox_results = convert_to_od_format(results['<OPEN_VOCABULARY_DETECTION>'])

            # Optionally plot the bounding boxes (if visualization is needed)
            plot_bbox(imageRGB, bbox_results)

            # Convert the PIL image back to OpenCV format (BGR)
            np_image = np.array(image_pil)
            np_image_bgr = cv2.cvtColor(np_image, cv2.COLOR_RGB2BGR)

            # Resize the image back to the original frame size to match the video output
            resized_image = cv2.resize(np_image_bgr, (frame_width, frame_height))

            # Write the frame to the output video
            output_video.write(resized_image)

        if cv2.waitKey(25) & 0xFF == ord('q'):
            break
    else:
        break

cap.release()
output_video.release()
cv2.destroyAllWindows()

import cv2
import imutils
import numpy as np
from PIL import Image
import torch

def run_example2(task_prompt, image, text_input=None):
    if text_input is None:
        prompt = task_prompt
    else:
        prompt = task_prompt + text_input
    inputs = processor(text=prompt, images=image, return_tensors="pt").to('cuda', torch.float16)
    generated_ids = model.generate(
      input_ids=inputs["input_ids"].cuda(),
      pixel_values=inputs["pixel_values"].cuda(),
      max_new_tokens=1024,
      early_stopping=False,
      do_sample=False,
      num_beams=3,
    )
    generated_text = processor.batch_decode(generated_ids, skip_special_tokens=False)[0]
    parsed_answer = processor.post_process_generation(
        generated_text,
        task=task_prompt,
        image_size=(image.width, image.height)
    )
    return parsed_answer

def convert_to_od_format(data):
    """
    Converts a dictionary with 'bboxes' and 'bboxes_labels' into a dictionary with separate 'bboxes' and 'labels' keys.
    """
    bboxes = data.get('bboxes', [])
    labels = data.get('bboxes_labels', [])
    return {'bboxes': bboxes, 'labels': labels}

def draw_bounding_boxes(image, data):
    """
    Draws bounding boxes directly on the image using OpenCV.
    """
    for bbox, label in zip(data['bboxes'], data['labels']):
        x1, y1, x2, y2 = bbox
        # Draw the rectangle (bounding box) on the image
        cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), color=(0, 255, 0), thickness=2)
        # Add the label text
        cv2.putText(image, label, (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

cap = cv2.VideoCapture('/content/lyfeye_det_bag_final.mp4')

# Get the video dimensions for proper output sizing
frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

output_video = cv2.VideoWriter('opvid.mp4', cv2.VideoWriter_fourcc(*'mp4v'), 30,
                               (frame_width, frame_height))

while cap.isOpened():
    ret, image = cap.read()
    if ret:
        # Resize the image for processing
        image_resized = imutils.resize(image, width=min(400, image.shape[1]))
        image_ = cv2.resize(image_resized, (640, 480))

        # Convert the image to RGB for PIL processing
        imageRGB = cv2.cvtColor(image_, cv2.COLOR_BGR2RGB)
        image_pil = Image.fromarray(imageRGB)

        # Run the object detection model and get results
        task_prompt = '<OPEN_VOCABULARY_DETECTION>'
        results = run_example2(task_prompt, image_pil, text_input="backpack")
        print(results)

        # Check if detection results exist
        if '<OPEN_VOCABULARY_DETECTION>' in results:
            # Convert the results to object detection format
            bbox_results = convert_to_od_format(results['<OPEN_VOCABULARY_DETECTION>'])

            # Draw bounding boxes directly on the OpenCV image
            draw_bounding_boxes(image_, bbox_results)

            # Resize the image back to the original frame size to match the video output
            resized_image = cv2.resize(image_, (frame_width, frame_height))

            # Write the frame to the output video
            output_video.write(resized_image)

        if cv2.waitKey(25) & 0xFF == ord('q'):
            break
    else:
        break

cap.release()
output_video.release()
cv2.destroyAllWindows()

import cv2
import imutils
import numpy as np
from PIL import Image
import torch

def run_example2(task_prompt, image, text_input=None):
    if text_input is None:
        prompt = task_prompt
    else:
        prompt = task_prompt + text_input
    inputs = processor(text=prompt, images=image, return_tensors="pt").to('cuda', torch.float16)
    generated_ids = model.generate(
      input_ids=inputs["input_ids"].cuda(),
      pixel_values=inputs["pixel_values"].cuda(),
      max_new_tokens=1024,
      early_stopping=False,
      do_sample=False,
      num_beams=3,
    )
    generated_text = processor.batch_decode(generated_ids, skip_special_tokens=False)[0]
    parsed_answer = processor.post_process_generation(
        generated_text,
        task=task_prompt,
        image_size=(image.width, image.height)
    )
    return parsed_answer

def convert_to_od_format(data):
    """
    Converts a dictionary with 'bboxes' and 'bboxes_labels' into a dictionary with separate 'bboxes' and 'labels' keys.
    """
    bboxes = data.get('bboxes', [])
    labels = data.get('bboxes_labels', [])
    return {'bboxes': bboxes, 'labels': labels}

def draw_bounding_boxes(image, data):
    """
    Draws bounding boxes directly on the image using OpenCV.
    """
    for bbox, label in zip(data['bboxes'], data['labels']):
        x1, y1, x2, y2 = bbox
        # Draw the rectangle (bounding box) on the image in green
        cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), color=(0, 255, 0), thickness=2)
        # Add the label text with a readable font size and a font similar to Times New Roman
        cv2.putText(image, label, (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_COMPLEX_SMALL, 0.7, (0, 255, 0), 2)

cap = cv2.VideoCapture('/content/lyfeye_det_bag_final.mp4')

# Get the video dimensions for proper output sizing
frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

output_video = cv2.VideoWriter('opvid.mp4', cv2.VideoWriter_fourcc(*'mp4v'), 30,
                               (frame_width, frame_height))

while cap.isOpened():
    ret, image = cap.read()
    if ret:
        # Resize the image for processing
        image_resized = imutils.resize(image, width=min(400, image.shape[1]))
        image_ = cv2.resize(image_resized, (640, 480))

        # Convert the image to RGB for PIL processing
        imageRGB = cv2.cvtColor(image_, cv2.COLOR_BGR2RGB)
        image_pil = Image.fromarray(imageRGB)

        # Run the object detection model and get results
        task_prompt = '<OPEN_VOCABULARY_DETECTION>'
        results = run_example2(task_prompt, image_pil, text_input="backpack")
        # print(results)

        # Check if detection results exist
        if '<OPEN_VOCABULARY_DETECTION>' in results:
            # Convert the results to object detection format
            bbox_results = convert_to_od_format(results['<OPEN_VOCABULARY_DETECTION>'])

            # Draw bounding boxes directly on the OpenCV image
            draw_bounding_boxes(image_, bbox_results)

            # Resize the image back to the original frame size to match the video output
            resized_image = cv2.resize(image_, (frame_width, frame_height))

            # Write the frame to the output video
            output_video.write(resized_image)

        if cv2.waitKey(25) & 0xFF == ord('q'):
            break
    else:
        break

cap.release()
output_video.release()
cv2.destroyAllWindows()

import cv2
import imutils
import numpy as np
from PIL import Image
import torch

def run_example2(task_prompt, image, text_input=None):
    if text_input is None:
        prompt = task_prompt
    else:
        prompt = task_prompt + text_input
    inputs = processor(text=prompt, images=image, return_tensors="pt").to('cuda', torch.float16)
    generated_ids = model.generate(
      input_ids=inputs["input_ids"].cuda(),
      pixel_values=inputs["pixel_values"].cuda(),
      max_new_tokens=1024,
      early_stopping=False,
      do_sample=False,
      num_beams=3,
    )
    generated_text = processor.batch_decode(generated_ids, skip_special_tokens=False)[0]
    parsed_answer = processor.post_process_generation(
        generated_text,
        task=task_prompt,
        image_size=(image.width, image.height)
    )
    return parsed_answer

def convert_to_od_format(data):
    """
    Converts a dictionary with 'bboxes' and 'bboxes_labels' into a dictionary with separate 'bboxes' and 'labels' keys.
    """
    bboxes = data.get('bboxes', [])
    labels = data.get('bboxes_labels', [])
    return {'bboxes': bboxes, 'labels': labels}

def draw_bounding_boxes(image, data):
    """
    Draws bounding boxes directly on the image using OpenCV.
    """
    for bbox, label in zip(data['bboxes'], data['labels']):
        x1, y1, x2, y2 = bbox
        # If the detected object is 'backpack', draw the bounding box and label in red
        if label.lower() == "backpack":
            color = (0, 0, 255)  # Red
            font = cv2.FONT_HERSHEY_SIMPLEX  # Approximation of Bogle font
        else:
            color = (0, 0, 255)  # Green for other objects
            font = cv2.FONT_HERSHEY_COMPLEX_SMALL  # Font for other objects

        # Draw the rectangle (bounding box) on the image
        cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), color=color, thickness=2)
        # Add the label text with the chosen color and font
        cv2.putText(image, label, (int(x1), int(y1) - 10), font, 0.7, color, 2)

cap = cv2.VideoCapture('/content/opvid.mp4')

# Get the video dimensions for proper output sizing
frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

output_video = cv2.VideoWriter('opvid_.mp4', cv2.VideoWriter_fourcc(*'mp4v'), 30,
                               (frame_width, frame_height))

while cap.isOpened():
    ret, image = cap.read()
    if ret:
        # Resize the image for processing
        image_resized = imutils.resize(image, width=min(400, image.shape[1]))
        image_ = cv2.resize(image_resized, (640, 480))

        # Convert the image to RGB for PIL processing
        imageRGB = cv2.cvtColor(image_, cv2.COLOR_BGR2RGB)
        image_pil = Image.fromarray(imageRGB)

        # Run the object detection model and get results
        task_prompt = '<OPEN_VOCABULARY_DETECTION>'
        results = run_example2(task_prompt, image_pil, text_input="backpack")
        # print(results)

        # Check if detection results exist
        if '<OPEN_VOCABULARY_DETECTION>' in results:
            # Convert the results to object detection format
            bbox_results = convert_to_od_format(results['<OPEN_VOCABULARY_DETECTION>'])

            # Draw bounding boxes directly on the OpenCV image
            draw_bounding_boxes(image_, bbox_results)

            # Resize the image back to the original frame size to match the video output
            resized_image = cv2.resize(image_, (frame_width, frame_height))

            # Write the frame to the output video
            output_video.write(resized_image)

        if cv2.waitKey(25) & 0xFF == ord('q'):
            break
    else:
        break

cap.release()
output_video.release()
cv2.destroyAllWindows()

image_with_boxes

task_prompt = '<REGION_TO_CATEGORY>'
results = run_example(task_prompt, text_input="<loc_52><loc_332><loc_932><loc_774>")
print(results)

task_prompt = '<REGION_TO_DESCRIPTION>'
results = run_example(task_prompt, text_input="<loc_52><loc_332><loc_932><loc_774>")
print(results)

"""## ocr related tasks"""

# url = "http://ecx.images-amazon.com/images/I/51UUzBDAMsL.jpg?download=true"
url="/content/1_tumbler example.08.00 AM.png"
# image = Image.open(requests.get(url, stream=True).raw).convert('RGB')
# image = Image.open(requests.get(url, stream=True).raw).convert('RGB')
image = Image.open(url).convert("RGB")
image

task_prompt = '<OCR>'
run_example(task_prompt)

task_prompt = '<OCR_WITH_REGION>'
results = run_example(task_prompt)
print(results)
# ocr results format
# {'OCR_WITH_REGION': {'quad_boxes': [[x1, y1, x2, y2, x3, y3, x4, y4], ...], 'labels': ['text1', ...]}}

from PIL import Image, ImageDraw, ImageFont
import random
import numpy as np
colormap = ['blue','orange','green','purple','brown','pink','gray','olive','cyan','red',
            'lime','indigo','violet','aqua','magenta','coral','gold','tan','skyblue']
def draw_ocr_bboxes(image, prediction, scale=1):
    draw = ImageDraw.Draw(image)
    bboxes, labels = prediction['quad_boxes'], prediction['labels']
    for box, label in zip(bboxes, labels):
        color = random.choice(colormap)
        new_box = (np.array(box) * scale).tolist()
        draw.polygon(new_box, width=3, outline=color)
        draw.text((new_box[0]+8, new_box[1]+2),
                    "{}".format(label),
                    align="right",

                    fill=color)

    display(image)

output_image = copy.deepcopy(image)
w, h = output_image.size
scale = 800 / max(w, h)
new_output_image = output_image.resize((int(w * scale), int(h * scale)))
draw_ocr_bboxes(new_output_image, results['<OCR_WITH_REGION>'], scale=scale)

"""## Cascaded tasks

### Caption + Phrase Grounding

results format:

{
 '\<CAPTION': pure_text,
{'\<CAPTION_TO_PHRASE_GROUNDING>': {'bboxes': [[x1, y1, x2, y2], ...], 'labels': ['', '', ...]}}
}
"""

url = "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/transformers/tasks/car.jpg?download=true"
image = Image.open(requests.get(url, stream=True).raw)

task_prompt = '<CAPTION>'
results = run_example(task_prompt)
text_input = results[task_prompt]
task_prompt = '<CAPTION_TO_PHRASE_GROUNDING>'
results = run_example(task_prompt, text_input)
results['<CAPTION>'] = text_input

results

plot_bbox(image, results['<CAPTION_TO_PHRASE_GROUNDING>'])

"""### Detailed Caption + Phrase Grounding

results format:

{
 '\<DETAILED_CAPTION': pure_text,
{'\<CAPTION_TO_PHRASE_GROUNDING>': {'bboxes': [[x1, y1, x2, y2], ...], 'labels': ['', '', ...]}}
}
"""

task_prompt = '<DETAILED_CAPTION>'
results = run_example(task_prompt)
text_input = results[task_prompt]
task_prompt = '<CAPTION_TO_PHRASE_GROUNDING>'
results = run_example(task_prompt, text_input)
results['<DETAILED_CAPTION>'] = text_input

results

plot_bbox(image, results['<CAPTION_TO_PHRASE_GROUNDING>'])

"""### More Detailed Caption + Phrase Grounding

results format:

{
 '\<MORE_DETAILED_CAPTION': pure_text,
{'\<CAPTION_TO_PHRASE_GROUNDING>': {'bboxes': [[x1, y1, x2, y2], ...], 'labels': ['', '', ...]}}
}
"""

task_prompt = '<MORE_DETAILED_CAPTION>'
results = run_example(task_prompt)
text_input = results[task_prompt]
task_prompt = '<CAPTION_TO_PHRASE_GROUNDING>'
results = run_example(task_prompt, text_input)
results['<MORE_DETAILED_CAPTION>'] = text_input

results

plot_bbox(image, results['<CAPTION_TO_PHRASE_GROUNDING>'])

"""# Test 1

"""

# url = "http://ecx.images-amazon.com/images/I/51UUzBDAMsL.jpg?download=true"
url="/content/1_tumbler example.08.00 AM.png"
# image = Image.open(requests.get(url, stream=True).raw).convert('RGB')
# image = Image.open(requests.get(url, stream=True).raw).convert('RGB')
image = Image.open(url).convert("RGB")
image

task_prompt = '<OCR>'
run_example(task_prompt)

task_prompt = '<OCR_WITH_REGION>'
results = run_example(task_prompt)
print(results)
# ocr results format
# {'OCR_WITH_REGION': {'quad_boxes': [[x1, y1, x2, y2, x3, y3, x4, y4], ...], 'labels': ['text1', ...]}}

from PIL import Image, ImageDraw, ImageFont
import random
import numpy as np
colormap = ['blue','orange','green','purple','brown','pink','gray','olive','cyan','red',
            'lime','indigo','violet','aqua','magenta','coral','gold','tan','skyblue']
def draw_ocr_bboxes(image, prediction, scale=1):
    draw = ImageDraw.Draw(image)
    bboxes, labels = prediction['quad_boxes'], prediction['labels']
    for box, label in zip(bboxes, labels):
        color = random.choice(colormap)
        new_box = (np.array(box) * scale).tolist()
        draw.polygon(new_box, width=3, outline=color)
        draw.text((new_box[0]+8, new_box[1]+2),
                    "{}".format(label),
                    align="right",

                    fill=color)

    display(image)

output_image = copy.deepcopy(image)
w, h = output_image.size
scale = 800 / max(w, h)
new_output_image = output_image.resize((int(w * scale), int(h * scale)))
draw_ocr_bboxes(new_output_image, results['<OCR_WITH_REGION>'], scale=scale)

task_prompt = '<CAPTION>'
run_example(task_prompt)

task_prompt = '<DETAILED_CAPTION>'
run_example(task_prompt)

task_prompt = '<MORE_DETAILED_CAPTION>'
run_example(task_prompt)

"""# Text 2"""

# url = "http://ecx.images-amazon.com/images/I/51UUzBDAMsL.jpg?download=true"
url="/content/2_holloween_dinosaur.png"
# image = Image.open(requests.get(url, stream=True).raw).convert('RGB')
# image = Image.open(requests.get(url, stream=True).raw).convert('RGB')
image = Image.open(url).convert("RGB")
image

task_prompt = '<OCR>'
run_example(task_prompt)

task_prompt = '<OCR_WITH_REGION>'
results = run_example(task_prompt)
print(results)
# ocr results format
# {'OCR_WITH_REGION': {'quad_boxes': [[x1, y1, x2, y2, x3, y3, x4, y4], ...], 'labels': ['text1', ...]}}

from PIL import Image, ImageDraw, ImageFont
import random
import numpy as np
colormap = ['blue','orange','green','purple','brown','pink','gray','olive','cyan','red',
            'lime','indigo','violet','aqua','magenta','coral','gold','tan','skyblue']
def draw_ocr_bboxes(image, prediction, scale=1):
    draw = ImageDraw.Draw(image)
    bboxes, labels = prediction['quad_boxes'], prediction['labels']
    for box, label in zip(bboxes, labels):
        color = random.choice(colormap)
        new_box = (np.array(box) * scale).tolist()
        draw.polygon(new_box, width=3, outline=color)
        draw.text((new_box[0]+8, new_box[1]+2),
                    "{}".format(label),
                    align="right",

                    fill=color)

    display(image)

output_image = copy.deepcopy(image)
w, h = output_image.size
scale = 800 / max(w, h)
new_output_image = output_image.resize((int(w * scale), int(h * scale)))
draw_ocr_bboxes(new_output_image, results['<OCR_WITH_REGION>'], scale=scale)

task_prompt = '<CAPTION>'
run_example(task_prompt)

task_prompt = '<DETAILED_CAPTION>'
run_example(task_prompt)

task_prompt = '<MORE_DETAILED_CAPTION>'
run_example(task_prompt)

"""# Text 3"""

# url = "http://ecx.images-amazon.com/images/I/51UUzBDAMsL.jpg?download=true"
url="/content/3_sponsored_kitchen_island.png"
# image = Image.open(requests.get(url, stream=True).raw).convert('RGB')
# image = Image.open(requests.get(url, stream=True).raw).convert('RGB')
image = Image.open(url).convert("RGB")
image

