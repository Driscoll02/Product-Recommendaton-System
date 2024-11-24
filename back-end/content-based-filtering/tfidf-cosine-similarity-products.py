import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity

# This will come from an external source eventually
mock_json_data = [
    {"productId": 1, "productName": "IPhone 16", "productBrand": "Apple", "productDescription": "The newest IPhone Apple has to offer. Contains a faster A18 chip and a configurable action button.", "price": 1000},
    {"productId": 2, "productName": "Galaxy S30 Ultra", "productBrand": "Samsung", "productDescription": "A flagship phone featuring a 200MP camera, S Pen support, and a vibrant 6.9-inch AMOLED display.", "price": 1200},
    {"productId": 3, "productName": "Pixel 9 Pro", "productBrand": "Google", "productDescription": "Powered by Google’s Tensor G3 chip, offering cutting-edge AI capabilities and a stellar camera.", "price": 900},
    {"productId": 4, "productName": "MacBook Pro 16\"", "productBrand": "Apple", "productDescription": "Equipped with the powerful M3 Max chip, this laptop is ideal for professional video editing and programming.", "price": 2500},
    {"productId": 5, "productName": "Dell XPS 15", "productBrand": "Dell", "productDescription": "A premium laptop with a stunning InfinityEdge display and 12th-gen Intel Core i9 processor.", "price": 2200},
    {"productId": 6, "productName": "Razer Blade 14", "productBrand": "Razer", "productDescription": "Compact gaming laptop with an AMD Ryzen 9 processor and NVIDIA RTX 4070 GPU.", "price": 2700},
    {"productId": 7, "productName": "GeForce RTX 4090", "productBrand": "NVIDIA", "productDescription": "Top-of-the-line graphics card with 24GB GDDR6X memory, perfect for 4K gaming and AI workloads.", "price": 1600},
    {"productId": 8, "productName": "Radeon RX 7900 XTX", "productBrand": "AMD", "productDescription": "High-performance GPU designed for gamers and creators with 20GB GDDR6 memory.", "price": 1000},
    {"productId": 9, "productName": "Intel Core i9-14900K", "productBrand": "Intel", "productDescription": "14-core processor with unparalleled performance for gaming and multitasking.", "price": 700},
    {"productId": 10, "productName": "AMD Ryzen 9 7950X", "productBrand": "AMD", "productDescription": "16-core processor with industry-leading multi-threaded performance for creators and gamers.", "price": 750},
    {"productId": 11, "productName": "Corsair RM850x PSU", "productBrand": "Corsair", "productDescription": "850W fully modular power supply with 80 Plus Gold certification for efficient power delivery.", "price": 150},
    {"productId": 12, "productName": "Logitech MX Master 3", "productBrand": "Logitech", "productDescription": "Ergonomic wireless mouse with customizable buttons and exceptional precision.", "price": 100},
    {"productId": 13, "productName": "Samsung T7 Portable SSD", "productBrand": "Samsung", "productDescription": "1TB external SSD with USB 3.2 Gen 2 for lightning-fast file transfers.", "price": 150},
    {"productId": 14, "productName": "Sony WH-1000XM5", "productBrand": "Sony", "productDescription": "Industry-leading noise-canceling headphones with exceptional sound quality and long battery life.", "price": 400},
    {"productId": 15, "productName": "Apple Watch Series 9", "productBrand": "Apple", "productDescription": "Smartwatch with advanced health tracking and a brighter, always-on display.", "price": 500},
]

df_products = pd.DataFrame(mock_json_data)

# Drop duplicates based on productName
df_products = df_products.drop_duplicates(subset=["productName"])

tfidf_brand = TfidfVectorizer(stop_words="english")
tfidf_desc = TfidfVectorizer(stop_words="english")

# Fill any holes in the data with empty strings
df_products["productBrand"] = df_products["productBrand"].fillna("")
df_products["productDescription"] = df_products["productDescription"].fillna("")

brand_tfidf_matrix = tfidf_brand.fit_transform(df_products["productBrand"])
desc_tfidf_matrix = tfidf_desc.fit_transform(df_products["productDescription"])

# Normalize the price feature
scaler = MinMaxScaler()
price_matrix = scaler.fit_transform(df_products[['price']])

# Combine the feature matrices (brand, description, and price)
combined_features = np.hstack([brand_tfidf_matrix.toarray(), desc_tfidf_matrix.toarray(), price_matrix])

cosine_sim = cosine_similarity(combined_features)

indices = pd.Series(df_products.index, index=df_products["productName"])

def get_recommendations(title, cosine_sim=cosine_sim, indices=indices):
    # Ensure the title is valid
    if title not in indices:
        print(f"'{title}' not found in the dataset.")
        return []

    # Get the index of the product
    idx = indices[title]

    # Get similarity scores
    sim_scores = list(enumerate(cosine_sim[idx]))

    # Sort scores (highest similarity first)
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the top 10 recommendations (excluding itself)
    sim_scores = sim_scores[1:11]
    sim_indices = [i[0] for i in sim_scores]

    # Return the product names of recommendations
    print(df_products["productName"].iloc[sim_indices].tolist())

    
get_recommendations("IPhone 16")