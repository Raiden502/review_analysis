from ..db.db_handler import db
from sqlalchemy import create_engine, text
from datetime import datetime
import pickle
import os
import time
from werkzeug.utils import secure_filename

def dictfetchall(cursor):
    columns = cursor.keys()
    return [dict(zip(columns, row)) for row in cursor.fetchall()]

def remove_images_by_filename(directory_path, file_name_prefix):
    for file in os.listdir(directory_path):
        file_path = os.path.join(directory_path, file)

        # Check if the file has the specified file name prefix
        if file.startswith(file_name_prefix):
            # Remove the file
            try:
                os.remove(file_path)
                print(f"Removed file: {file_path}")
            except OSError as e:
                continue

def HandleLogin(request):
    data = request.json
    try:
        with db.session.connection() as conn:
            query = f"""
                    select cons_id, c_role, c_is_active, c_name, c_email from consumers where c_email=:email and c_password=:pass
                """
            sql = text(query)
            params = {"email": data["email"], "pass": data["password"]}
            result = conn.execute(sql, params)
            response = result.fetchone() or None
            if response:
                return {
                    "status": "success",
                    "error_code": 0,
                    "data": {"consid": response[0], "role": response[1]},
                    "message": "login successfull",
                    "accessToken": "3245etgfdety6256",
                    "user":{"consid": response[0], "role": response[1], "active":response[2], "displayName":response[3], "email":response[4]},
                }
            else:
                return {"status": "failed", "error_code": 1, "message": "login failed"}

    except Exception as e:
        print("error: ", e)
        return {
            "status": "failed",
            "error_code": 1,
            "message": "An error occurred during insertion",
        }


def HandleRegistration(request):
    data = request.json
    try:
        with db.session.connection() as conn:
            query = f"""
                    INSERT INTO consumers (c_name, c_email, c_password, c_role, c_date, c_is_active)
                    VALUES (:name, :email, :password, :role, :date, :active)
                """
            sql = text(query)
            params = {
                "name": data["firstName"] +" "+ data["lastName"],
                "email": data["email"],
                "password": data["password"],
                "role": "user",
                "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "active": True,
            }
            result = conn.execute(sql, params)
            conn.commit()

            query = f"""
                    select cons_id, c_role, c_is_active, c_name, c_email from consumers where c_email=:email and c_password=:pass
                """
            sql = text(query)
            params = {"email": data["email"], "pass": data["password"]}
            result = conn.execute(sql, params)
            response = result.fetchone() or None
            if response:
                return {
                    "status": "success",
                    "error_code": 0,
                    "message": "Successfully registered",
                    "accessToken": "3245etgfdety6256",
                    "user": {"consid": response[0], "role": response[1], "active":response[2], "displayName":response[3], "email":response[4]},
                }
            else:
                return {
                    "status": "failed",
                    "error_code": 1,
                    "message": "Data not inserted",
                }
    except Exception as e:
        print("error: ", e)
        return {
            "status": "failed",
            "error_code": 1,
            "message": "An error occurred during insertion",
        }


def HandleProdRegistration(request):
    data = request.json
    try:
        with db.session.connection() as conn:
            query = f"""
                    INSERT INTO products (prod_id, p_name, p_category, p_tag, p_code, p_price, p_desc, p_date, p_status, cover)
                    VALUES (:prod_id, :name, :category, :tag, :code, :price, :desc, :date, :active, :cover)
                """
            sql = text(query)
            params = {
                "prod_id":data['prod_id'],
                "name": data["name"],
                "category": data["category"],
                "tag": data["tag"],
                "code": data["code"],
                "price": data["price"],
                "desc": data["desc"],
                "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "active": data["active"],
                "cover": ""

            }
            result = conn.execute(sql, params)
            conn.commit()
            if result.rowcount > 0:
                return {
                    "status": "success",
                    "error_code": 0,
                    "message": "Successfully registered",
                }
            else:
                return {
                    "status": "failed",
                    "error_code": 1,
                    "message": "Data not inserted",
                }
    except Exception as e:
        print("error: ", e)
        return {
            "status": "failed",
            "error_code": 1,
            "message": "An error occurred during insertion",
        }
    
def handleupload(request, prod_id):
    try:
        if 'photo' in request.files:
            file= request.files['photo']
            print(file)
            # Get the original file extension
            _, file_extension = os.path.splitext(file.filename)

            # Use the secure_filename function to ensure a valid filename
            filename = secure_filename(prod_id + file_extension)
            # Save the image file with the custom filename
            file.save(os.path.join('./images', filename))
        else:
            raise Exception("image not found")
        
        with db.session.connection() as conn:
            query = f"""
                    UPDATE products
                    SET cover = :cover
                    WHERE prod_id = :prod_id;
                """
            sql = text(query)

            params = {
                "prod_id":prod_id,
                "cover": f"http://127.0.0.1:5000/uploads/{prod_id}"
            }
            result = conn.execute(sql, params)
            conn.commit()
            if result.rowcount > 0:
                return {
                    "status": "success",
                    "error_code": 0,
                    "message": "Successfully registered",
                    "cover": f"http://127.0.0.1:5000/uploads/{prod_id}"
                }
            else:
                return {
                    "status": "failed",
                    "error_code": 1,
                    "message": "Data not inserted",
                }
    except Exception as e:
        print("error: ", e)
        return {
            "status": "failed",
            "error_code": 1,
            "message": "An error occurred during insertion",
        }

def HandleProdEdit(request):
    data = request.json
    try:
        with db.session.connection() as conn:
            query = f"""
                    UPDATE products
                    SET p_name = :name,
                        p_category = :category,
                        p_tag = :tag,
                        p_code = :code,
                        p_price = :price,
                        p_desc = :desc,
                        p_date = :date,
                        p_status = :active
                    WHERE prod_id = :id
                """
            sql = text(query)
            params = {
                "id": data["prod_id"],
                "name": data["name"],
                "category": data["category"],
                "tag": data["tag"],
                "code": data["code"],
                "price": data["price"],
                "desc": data["desc"],
                "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "active": data["active"],
            }
            result = conn.execute(sql, params)
            conn.commit()
            remove_images_by_filename("./images", data["prod_id"])
            if result.rowcount > 0:
                return {
                    "status": "success",
                    "error_code": 0,
                    "message": "Successfully registered",
                }
            else:
                return {
                    "status": "failed",
                    "error_code": 1,
                    "message": "Data not inserted",
                }
    except Exception as e:
        print("error: ", e)
        return {
            "status": "failed",
            "error_code": 1,
            "message": "An error occurred during insertion",
        }



def HandleProdDel(request):
    data = request.json
    try:
        with db.session.connection() as conn:
            query1 = f"""
                    DELETE FROM orders
                    WHERE prod = :id;
                """
            sql1 = text(query1)

            query2 = f"""
                    DELETE FROM reviews
                    WHERE prod = :id;
                """
            sql2 = text(query2)

            query3 = f"""
                    DELETE FROM products
                    WHERE prod_id = :id;
                """
            sql3 = text(query3)
            params = {
                "id": data["prod_id"],
            }
            result = conn.execute(sql1, params)
            result = conn.execute(sql2, params)
            result = conn.execute(sql3, params)
            conn.commit()
            remove_images_by_filename("./images", data["prod_id"])
            if result.rowcount > 0:
                return {
                    "status": "success",
                    "error_code": 0,
                    "message": "Successfully registered",
                }
            else:
                return {
                    "status": "failed",
                    "error_code": 1,
                    "message": "Data not inserted",
                }
    except Exception as e:
        print("error: ", e)
        return {
            "status": "failed",
            "error_code": 1,
            "message": "An error occurred during insertion",
        }


def HandleReview(request):
    data = request.json
    try:
        vectorizer = pickle.load(open(".//output//vector.pkl", "rb"))
        model = pickle.load(open(".//output//model.pkl", "rb"))
        rating = model.predict(vectorizer.transform([data["review"]]))
        with db.session.connection() as conn:
            query = f"""
                    INSERT INTO reviews (prod, cons, review, rating, rev_date)
                    VALUES (:prodid, :consid, :review, :rating, :date)
                """
            sql = text(query)
            params = {
                "prodid": data["prodid"],
                "consid": data["consid"],
                "review": data["review"],
                "rating": 5 if(int(rating[0])==1) else 1,
                "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            }
            result = conn.execute(sql, params)
            conn.commit()
            if result.rowcount > 0:
                return {
                    "status": "success",
                    "error_code": 0,
                    "message": "reviewed successfull",
                    "rating": "positive" if int(rating[0]) else "negative",
                }
            else:
                return {
                    "status": "failed",
                    "error_code": 1,
                    "message": "operation failed",
                }
    except Exception as e:
        print("error: ", e)
        return {
            "status": "failed",
            "error_code": 1,
            "message": "An error occurred during insertion",
        }


def HandleMainDashBoard(request):
    try:
        with db.session.connection() as conn:
            query = f"""
                    select * from products
                """
            sql = text(query)
            result = conn.execute(sql)
            return {
                "status": "success",
                "error_code": 0,
                "message": "operation success",
                "data": dictfetchall(result),
            }
    except Exception as e:
        print("error: ", e)
        return {
            "status": "failed",
            "error_code": 1,
            "message": "An error occurred during insertion",
        }


def HandleProdDet(request):
    data = request.json
    try:
        with db.session.connection() as conn:
            query = f"""
                    select * from products where prod_id = :id
                """
            sql = text(query)
            params = {"id": data["prod_id"]}
            result = conn.execute(sql, params)
            query = f"""
                    SELECT r.rev_id, p.p_name as prod, c.c_name as cons, r.review as review, r.rating, r.rev_date as rev_date
                    FROM reviews r
                    JOIN products p ON r.prod = p.prod_id
                    JOIN consumers c ON r.cons = c.cons_id
                    where r.prod = :id;
                """
            sql = text(query)
            result2 = conn.execute(sql, {"id": int(data["prod_id"])})
            return {
                "status": "success",
                "error_code": 0,
                "message": "operation success",
                "data": dictfetchall(result),
                "reviews": dictfetchall(result2),
            }
    except Exception as e:
        print("error: ", e)
        return {
            "status": "failed",
            "error_code": 1,
            "message": "An error occurred during insertion",
        }


def HandleAdminDash(request):
    try:
        with db.session.connection() as conn:
            query = f"""select count(*) from products"""
            sql = text(query)
            prodres = dictfetchall(conn.execute(sql))[0]

            query = f"""
                SELECT c.c_name, p.p_name, r.review, r.rating, r.rev_date
                FROM consumers c
                JOIN reviews r ON c.cons_id = r.cons
                JOIN products p ON p.prod_id = r.prod
            """
            sql = text(query)
            revres = dictfetchall(conn.execute(sql))

            query = f"""SELECT 
                    COUNT(*) AS total_reviews,
                    COUNT(CASE WHEN rating = 1 THEN 1 END) AS count_rating_1,
                    COUNT(CASE WHEN rating = 5 THEN 1 END) AS count_rating_5
                FROM reviews"""
            sql = text(query)
            revcountres = dictfetchall(conn.execute(sql))[0]

            query = f"""select count(*) from orders"""
            sql = text(query)
            ordres = dictfetchall(conn.execute(sql))[0]

            query = f"""select count(*) from consumers"""
            sql = text(query)
            consres = dictfetchall(conn.execute(sql))[0]

            return {
                "status": "success",
                "error_code": 0,
                "product": prodres["count"],
                "reviews": revres,
                "consumer": consres["count"],
                "orders": ordres["count"],
                "count_rating_1": revcountres["count_rating_1"],
                "count_rating_5": revcountres["count_rating_5"],
                "total_reviews": revcountres["total_reviews"],
            }
    except Exception as e:
        print("error: ", e)
        return {
            "status": "failed",
            "error_code": 1,
            "message": "An error occurred during insertion",
        }
