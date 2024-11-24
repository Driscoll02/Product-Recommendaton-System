import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

df_movies = pd.read_csv("./dataset/tmdb_5000_movies.csv")

# stop_words removes common words in English which don't have meaning e.g. "the", "is", "and" 
tfidf = TfidfVectorizer(stop_words="english")

# Fill any holes in the data with empty strings
df_movies["overview"] = df_movies["overview"].fillna("")
tfidf_matrix = tfidf.fit_transform(df_movies["overview"])

cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

indices = pd.Series(df_movies.index, index=df_movies["original_title"]).drop_duplicates()

def get_recommendations(title, cosine_sim = cosine_sim):
    title = title.title()
    if (title not in indices):
        print(f"'{title}' not found in the dataset.")
        return
    idx = indices[title]
    sim_scores = enumerate(cosine_sim[idx])
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    # We don't take 0:10 since we don't want the movie we put in to be recommended
    sim_scores = sim_scores[1:11]
    sim_index = [i[0] for i in sim_scores]
    print(df_movies["original_title"].iloc[sim_index])

    
get_recommendations("The Dark Knight Rises")