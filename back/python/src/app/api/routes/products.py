from fastapi import APIRouter
from pathlib import Path
import json

router = APIRouter()

@router.get("/products")
def get_products():
    products_file = Path(__file__).with_name("products.json")
    with open(products_file) as file:
        products = json.load(file)
    return {"products": products}

@router.get("/product/{slug}")
def get_product(slug: str):
    products_file = Path(__file__).with_name("products.json")
    with open(products_file) as file:
        products = json.load(file)
    product = next((p for p in products if p["slug"] == slug), None)
    return {"product": product}