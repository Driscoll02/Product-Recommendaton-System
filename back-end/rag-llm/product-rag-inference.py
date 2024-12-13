# ------------------------- Indexing ------------------------- 
from langchain_community.document_loaders import JSONLoader
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_chroma import Chroma
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains.retrieval import create_retrieval_chain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import os

# Load environment variables from the .env file (if present)
load_dotenv()

# 1. Load data
file_path = '../products.json'

# the jq_schema can split the documents since we access it as an array
loader = JSONLoader(file_path=file_path, jq_schema='.products[]', text_content=False)

data = loader.load()

# 2. Vectorise and store the data (Probs with ChromaDB) 

google_api_key = os.environ["GEMINI_API_KEY"]
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=google_api_key)

persist_directory = ""

vector_store = Chroma(
    collection_name="product_vectors_collection",
    embedding_function=embeddings,
    persist_directory="./chroma_langchain_product_vectors_db",  # Where to save data locally, remove if not necessary
).from_documents(data, embeddings)
# ------------------------- Retrieval and generation -------------------------

# 3. Use a retriever to get the relevant splits from the store

retriever = vector_store.as_retriever(search_kwargs={"k":4})

# 4. Use an Gemini to generate an answer to a users question.

llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", google_api_key=google_api_key, temperature=0)

prompt_template = PromptTemplate(input_variables=["context", "input"], template="Use the provided context to answer all user queries on the tech products we provide. Remember all prices are in GBP (£). If the user provides a query which isn't related to tech, you can tell them this, but try to get the chat back on track. Context: {context} Query: {input}")
combine_docs_chain = create_stuff_documents_chain(
    llm, prompt_template
)

retrieval_chain = create_retrieval_chain(retriever, combine_docs_chain)

response = retrieval_chain.invoke({"input": "I want to buy a pizza"})

print(response["answer"])