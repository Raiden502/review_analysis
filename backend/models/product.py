from dataclasses import dataclass
from sqlalchemy.orm import relationship
from ..db.db_handler import db
from datetime import datetime
from ..utils.gettime import getcurrenttime

newtime = getcurrenttime()

@dataclass
class ProductModel(db.Model):
    __tablename__ = "products"
    
    prod_id: int
    p_name: str
    p_type: str
    p_price: str
    p_desc:str
    p_date:datetime
    p_status: bool

    prod_id = db.Column(db.BigInteger, autoincrement=True, primary_key=True)
    p_name = db.Column(db.String(200), nullable=False)
    p_type = db.Column(db.String(100), nullable=False)
    p_price = db.Column(db.String(300), nullable=False)
    p_desc = db.Column(db.String(500), nullable=False)
    p_date = db.Column(db.DateTime, default=newtime, nullable=False)
    p_status = db.Column(db.Boolean, nullable=False)
