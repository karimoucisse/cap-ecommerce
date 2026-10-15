from pydantic import BaseModel, ConfigDict, Field


class VariantCreate(BaseModel):
    sku: str
    color: str | None = None
    size: str | None = None
    price_cents: int = Field(ge=0)
    supplier_price_cents: int = Field(ge=0)
    image_url: str | None = None
    is_available: bool = True


class VariantRead(BaseModel):
    """Vue publique : pas de prix fournisseur ni de marge."""
    model_config = ConfigDict(from_attributes=True)

    id: int
    sku: str
    color: str | None
    size: str | None
    price_cents: int
    image_url: str | None
    is_available: bool


class VariantAdminRead(VariantRead):
    supplier_price_cents: int
    margin_cents: int


class ProductCreate(BaseModel):
    name: str
    slug: str
    description: str | None = None
    category_id: int | None = None
    supplier_url: str | None = None
    variants: list[VariantCreate] = Field(min_length=1)


class ProductRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    slug: str
    description: str | None
    variants: list[VariantRead]