from langchain_community.document_loaders import JSONLoader

def load_products_json():
    file_path = '../products.json'

    # the jq_schema can split the documents since we access it as an array
    loader = JSONLoader(file_path=file_path, jq_schema='.products[]', text_content=False)
    data = loader.load()
    return data