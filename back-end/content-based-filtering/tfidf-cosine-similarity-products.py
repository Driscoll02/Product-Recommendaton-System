import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

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

tfidf = TfidfVectorizer(stop_words="english")