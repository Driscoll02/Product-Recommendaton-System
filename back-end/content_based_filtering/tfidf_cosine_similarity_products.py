import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity

df_products = pd.read_json("../products.json")
df_products = pd.json_normalize(df_products['products'])

# Drop duplicates based on productName
df_products = df_products.drop_duplicates(subset=["productName"])

tfidf_brand = TfidfVectorizer(stop_words="english")
tfidf_desc = TfidfVectorizer(stop_words="english")

# Fill any holes in the data with empty strings
df_products["productBrand"] = df_products["productBrand"].fillna("")
df_products["productDescription"] = df_products["productDescription"].fillna("")

# Define weights
brand_weight = 0.4  # Reduce the importance of the brand
desc_weight = 0.7   # Increase the importance of the description
price_weight = 0.5  # Adjust the importance of the price

brand_tfidf_matrix = tfidf_brand.fit_transform(df_products["productBrand"])
desc_tfidf_matrix = tfidf_desc.fit_transform(df_products["productDescription"])

# Normalize the price feature
scaler = MinMaxScaler()
price_matrix = scaler.fit_transform(df_products[['salePrice']])

# Apply weights to each feature matrix
weighted_brand_matrix = brand_weight * brand_tfidf_matrix.toarray()
weighted_desc_matrix = desc_weight * desc_tfidf_matrix.toarray()
weighted_price_matrix = price_weight * price_matrix

# Combine the feature matrices (brand, description, and price)
combined_features = np.hstack([weighted_brand_matrix, weighted_desc_matrix, weighted_price_matrix])

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

    # Sort scores in desc order (most similar first)
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the top 10 recommendations (excluding the product with title)
    sim_scores = sim_scores[1:11]
    sim_indices = [i[0] for i in sim_scores]

    # Return the product names of recommendations
    return df_products["productName"].iloc[sim_indices].tolist()