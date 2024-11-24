import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

def get_image_links():
    # Initialize the app with a service account, granting admin privileges
    cred = credentials.Certificate('/Users/arjun/Programming/Meta/remote-health-d8aea-firebase-adminsdk-13w4e-bc86647846.json')
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    users_ref = db.collection("images")
    docs = users_ref.stream()

    image_links_list = []
    for doc in docs:
        image_links = ", ".join(doc.to_dict().values())
        image_links_list.append(image_links)
    
    return image_links_list[0] # we assume it is only one element