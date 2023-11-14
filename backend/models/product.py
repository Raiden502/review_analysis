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
    p_category: str
    p_tag:str
    p_code:str
    # p_img:str
    p_price: str
    p_desc:str
    p_date:datetime
    p_status: bool

    prod_id = db.Column(db.String(200), nullable=False, primary_key=True)
    p_name = db.Column(db.String(200), nullable=False)
    p_category = db.Column(db.String(100), nullable=False)
    p_tag = db.Column(db.ARRAY(db.String), nullable=False)
    p_code = db.Column(db.String(100), nullable=False)
    # p_img = db.Column(db.LargeBinary)
    p_price = db.Column(db.String(300), nullable=False)
    p_desc = db.Column(db.String(500), nullable=False)
    p_date = db.Column(db.DateTime, default=newtime, nullable=False)
    p_status = db.Column(db.Boolean, nullable=False)
    cover = db.Column(db.String(500), nullable=True)
