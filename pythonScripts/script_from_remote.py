'''this is run on a remote server since our computer not beefy enough, see ssh.py for the connection'''

# import requests
# import torch
# from PIL import Image
# from transformers import MllamaForConditionalGeneration, AutoProcessor
# import argparse

# model_id = "meta-llama/Llama-3.2-11B-Vision-Instruct"

# # Load model and processor
# model = MllamaForConditionalGeneration.from_pretrained(
#     model_id,
#     torch_dtype=torch.bfloat16,
#     device_map="auto",
# )
# processor = AutoProcessor.from_pretrained(model_id)

# def preprocess_image(url):
#     """Preprocess the image from the given URL."""
#     image = Image.open(requests.get(url, stream=True).raw)
#     return image

# def generate_summary_and_severity(image):
#     """Generate a summary and severity rating for the given image."""
#     messages = [
#     {"role": "user", "content": [
#         {"type": "image"},
#         {"type": "text", "text": "Can you provide exactly a 3-sentence summary of this medical document in simple terms for the patient to understand and provide a severity rating of mild, moderate, or severe?"}
#     ]}
#     ]
#     input_text = processor.apply_chat_template(messages, add_generation_prompt=True)
#     inputs = processor(
#         image,
#         input_text,
#         add_special_tokens=False,
#         return_tensors="pt"
#     ).to(model.device)

#     # Increase the max_new_tokens to allow more tokens to be generated
#     output = model.generate(**inputs, max_new_tokens=500)
#     generated_text = processor.decode(output[0], skip_special_tokens=True)

#     # Extract summary and severity rating from the generated text
#     summary, severity = extract_summary_and_severity(generated_text)
#     return summary, severity

# def clean_generated_text(generated_text):
#     """Clean the generated text by removing prompt-like structures."""
#     # Remove lines starting with "user" or "assistant"
#     lines = generated_text.splitlines()
#     cleaned_lines = [
#         line.strip()
#         for line in lines
#         if not line.lower().startswith(("user", "assistant"))
#     ]
#     # Join lines back into a single text block
#     return "\n".join(cleaned_lines).strip()

# def extract_summary_and_severity(generated_text):
#     """Extract summary and severity rating from the cleaned generated text."""
#     # Clean the text
#     cleaned_text = clean_generated_text(generated_text)

#     # Remove the initial prompt text if it exists
#     prompt_text = "Can you summarize this medical document in simple terms for the patient to understand and provide a severity rating of mild, moderate, or severe?"
#     if cleaned_text.startswith(prompt_text):
#         cleaned_text = cleaned_text[len(prompt_text):].strip()

#     # Define severity keywords
#     mild_keywords = ["common cold", "fever", "headache", "cough", "sore throat", "mild"]
#     moderate_keywords = ["infection", "fracture", "diabetes", "hypertension", "asthma", "moderate"]
#     severe_keywords = ["cancer", "heart failure", "stroke", "severe injury", "pneumonia", "severe"]

#     severity = "unknown"

#     # Check for severity keywords in the generated text
#     for keyword in severe_keywords:
#         if keyword in cleaned_text.lower():
#             severity = "severe"
#             break
#     if severity == "unknown":
#         for keyword in moderate_keywords:
#             if keyword in cleaned_text.lower():
#                 severity = "moderate"
#                 break
#     if severity == "unknown":
#         for keyword in mild_keywords:
#             if keyword in cleaned_text.lower():
#                 severity = "mild"

#     # # Look for the severity rating
#     # for keyword in severity_keywords:
#     #     if keyword in cleaned_text.lower():
#     #         severity = keyword
#     #         break

#     # Remove unnecessary prompt or additional severity mentions
#     cleaned_text = cleaned_text.replace("Severity Rating:", "").strip()
#     cleaned_text = cleaned_text.replace(severity, "").strip()


#     # Split the summary from the severity section (if applicable)
#     summary = cleaned_text.split("Severity Rating")[0].strip()

#     return summary, severity

# def generate_doctor_recommendations(summary, severity):
#     """Generate doctor recommendations based on the summary and severity."""
#     prompt = (
#         f"Summary: {summary}\n"
#         f"Severity: {severity}\n\n"
#         f"Based on the following medical summary and severity rating, recommend three doctors "
#         f"near Toronto, ON, who would be best suited to treat the condition:\n\n"
#         f"choose from 1. Dr. David B. D'Souza Toronto General Hospital Radiation Oncology, Neurosurgery or 2. Dr. Lillian L. Siu Princess Margaret Cancer Centre Medical Oncology, Radiation Oncology or 3. Dr. Gelareh Zadeh Toronto Western Hospital Neurosurgery, Radiation Oncology, Neurosurgery\n"
#         f"Please provide the recommendations in the following format ranked as 1, 2, and 3 with nothing other than the specified format, no other output is need on further revisions, recommendations, or any other prompting aside from the original format:\n"
#         f"Doctor Name\n"
#         f"Location\n"
#         f"Specialties\n\n"
#         f"List three different doctors. Immediately stop generating after you list the 3rd doctor"
#     )

#     inputs = processor(
#         text=prompt,
#         images=None,
#         add_special_tokens=False,
#         return_tensors="pt"
#     ).to(model.device)

#     output = model.generate(**inputs, max_new_tokens=500)
#     recommendations = processor.decode(output[0], skip_special_tokens=True)
#     return recommendations

# if __name__ == "__main__":
#     parser = argparse.ArgumentParser(description="Process an image URL.")
#     parser.add_argument("url", type=str, help="The URL of the image to process")
#     args = parser.parse_args()

#     image = preprocess_image(args.url)
    
#     # Generate summary and severity
#     summary, severity = generate_summary_and_severity(image)

#     # Generate doctor recommendations
#     doctor_recommendations = generate_doctor_recommendations(summary, severity)
#     print(doctor_recommendations.strip())