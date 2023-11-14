from dataclasses import dataclass
from sqlalchemy.orm import relationship
from ..db.db_handler import db
from datetime import datetime
from ..utils.gettime import getcurrenttime
from .consumer import ConsumerModel
from .product import ProductModel

newtime = getcurrenttime()

@dataclass
class ReviewModel(db.Model):
    __tablename__ = "reviews"
    __allow_unmapped__ = True

    rev_id: int
    prod: int
    cons: int
    review: str
    rating: int
    rev_date:datetime

    rev_id = db.Column(db.BigInteger, autoincrement=True, primary_key=True)
    prod =  db.Column(db.String(200), db.ForeignKey("products.prod_id"))
    cons = db.Column(db.BigInteger, db.ForeignKey("consumers.cons_id"))
    review = db.Column(db.String(200), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    rev_date = db.Column(db.DateTime, default=newtime, nullable=False)

    conss: ConsumerModel = relationship(
        "ConsumerModel",
        foreign_keys=[cons],
        uselist=True,
        lazy="select",
    )

    prods: ProductModel = relationship(
        "ProductModel",
        foreign_keys=[prod],
        uselist=True,
        lazy="select",
    )
