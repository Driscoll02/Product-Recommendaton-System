import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains.retrieval import create_retrieval_chain
from langchain.prompts import PromptTemplate

from content_based_filtering.tfidf_cosine_similarity_products import get_recommendations
from rag_llm.load_products_json import load_products_json

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Specify frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

products_data = load_products_json()

# Load environment variables from the .env file (if present)
load_dotenv()

# Do this outside the routes so it doesn't happen on every request:
google_api_key = os.environ["GEMINI_API_KEY"]
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=google_api_key)

vector_store = Chroma(
    collection_name="product_vectors_collection",
    embedding_function=embeddings,
    persist_directory="./chroma_langchain_product_vectors_db",  # Where to save data locally, remove if not necessary
).from_documents(products_data, embeddings)

retriever = vector_store.as_retriever(search_kwargs={"k":4})

llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", google_api_key=google_api_key, temperature=0)

prompt_template = PromptTemplate(input_variables=["context", "input"], template="Use the provided context to answer all user queries on the tech products we provide. Remember all prices are in GBP (£). If the user provides a query which isn't related to tech, you can tell them this, but try to get the chat back on track. Context: {context} Query: {input}")
combine_docs_chain = create_stuff_documents_chain(
    llm, prompt_template
)

retrieval_chain = create_retrieval_chain(retriever, combine_docs_chain)

# Define the request body structure
class ProductRequest(BaseModel):
    product_name: str

class RagLlmRequest(BaseModel):
    user_input: str

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
    
@app.post("/rag-inference")
async def rag_inference(request: RagLlmRequest):
    print(request)
    try:
        user_input = request.user_input
    #https://python.langchain.com/api_reference/langchain/chains/langchain.chains.conversational_retrieval.base.ConversationalRetrievalChain.htmlaaaaaaa
        response = retrieval_chain.invoke({"input": user_input})

        print(response["answer"])

        return { "llm_response": response["answer"] }
    except KeyError as e:
         raise HTTPException(status_code=500, detail=f"Something went wrong with the request to the LLM.")