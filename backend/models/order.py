from dataclasses import dataclass
from sqlalchemy.orm import relationship
from ..db.db_handler import db
from datetime import datetime
from ..utils.gettime import getcurrenttime
from .consumer import ConsumerModel
from .product import ProductModel

newtime = getcurrenttime()

@dataclass
class OrderModels(db.Model):
    __tablename__ = "orders"
    __allow_unmapped__ = True
    
    ord_id: int
    cons: int
    prod: int
    o_mobile: str
    pay_status: str
    o_status:str
    o_addr:str
    o_date:datetime


    ord_id = db.Column(db.BigInteger, autoincrement=True, primary_key=True)
    prod =  db.Column(db.String(200), db.ForeignKey("products.prod_id"))
    cons = db.Column(db.BigInteger, db.ForeignKey("consumers.cons_id"))
    o_mobile = db.Column(db.String(60), nullable=False)
    pay_status = db.Column(db.String(300), nullable=False)
    o_status = db.Column(db.String(300), nullable=False)
    o_date = db.Column(db.DateTime, default=newtime, nullable=False)
    o_addr = db.Column(db.String(500), nullable=False)

    
    cons: ConsumerModel = relationship(
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