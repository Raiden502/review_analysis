from flask import Flask
from food_review_prediction.config import ApplicationConfig
from datetime import timedelta

def init(app:Flask):
    app.config.update(
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        SQLALCHEMY_DATABASE_URI=ApplicationConfig.DATABASE_URI,
        JWT_SECRET_KEY="SUPER-SECRET",
        JWT_ACCESS_TOKEN_EXPIRES=timedelta(hours=30)
    )