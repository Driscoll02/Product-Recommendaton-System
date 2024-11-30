from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from content_based_filtering.tfidf_cosine_similarity_products import get_recommendations

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Specify frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Define the request body structure
class ProductRequest(BaseModel):
    product_name: str

@app.post("/product-cosine-sim")
async def product_cosine_sim(request: ProductRequest):
    print(request)
    try:
        print(request.product_name)
        product_name = request.product_name
        recommendations = get_recommendations(product_name)
        return {"product_name": product_name, "recommendations": recommendations}
    except KeyError as e:
        raise HTTPException(status_code=404, detail=f"Product {str(e)} not found.")