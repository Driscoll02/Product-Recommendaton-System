from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from content_based_filtering.tfidf_cosine_similarity_products import get_recommendations

app = FastAPI()

# Define the request body structure
class ProductRequest(BaseModel):
    product_name: str

@app.post("/product-cosine-sim")
async def product_cosine_sim(request: ProductRequest):
    try:
        # print(request.product_name)
        product_name = request.product_name
        recommendations = get_recommendations(product_name)
        return {"product_name": product_name, "recommendations": recommendations}
    except KeyError as e:
        raise HTTPException(status_code=404, detail=f"Product {str(e)} not found.")