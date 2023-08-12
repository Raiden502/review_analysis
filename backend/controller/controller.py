from ..db.db_handler import db
from sqlalchemy import create_engine, text
from datetime import datetime
import pickle

def dictfetchall(cursor):
    columns = cursor.keys()
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]

def HandleLogin(request):
    data = request.json
    try:
        with db.session.connection() as conn:
            query = f'''
                    select cons_id, c_role, c_is_active from consumers where c_email=:email and c_password=:pass
                '''
            sql = text(query)
            params = {
                "email":data["email"],
                "pass":data['password']
            }
            result = conn.execute(sql, params)
            response = result.fetchone() or None
            if response:
                return {"status":"success", "error_code":0, 'data':{'consid':response[0], 'role':response[1]},  "message": "login successfull"}
            else:
                return {"status":"failed", "error_code":1,  "message": "login failed"}

    except Exception as e:
        print("error: ", e)
        return {"status": "failed", "error_code": 1, "message": "An error occurred during insertion"}

def HandleRegistration(request):
    data = request.json
    try:
        with db.session.connection() as conn:
            query = f'''
                    INSERT INTO consumers (c_name, c_email, c_mobile, c_password, c_role, c_date, c_is_active)
                    VALUES (:name, :email, :mobile, :password, :role, :date, :active)
                '''
            sql = text(query)
            params = {
                "name":data['name'],
                "email":data["email"],
                "mobile":data['mobile'],
                "password":data['password'],
                "role":"user",
                "date": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                "active":True
                }
            result = conn.execute(sql, params)
            conn.commit()
            if result.rowcount > 0:
                return {"status": "success", "error_code": 0, "message": "Successfully registered"}
            else:
                return {"status": "failed", "error_code": 1, "message": "Data not inserted"}
    except Exception as e:
        print("error: ", e)
        return {"status": "failed", "error_code": 1, "message": "An error occurred during insertion"}

def HandleProdRegistration(request):
    data = request.json
    try:
        with db.session.connection() as conn:
            query = f'''
                    INSERT INTO products (p_name, p_type, p_price, p_desc, p_date, p_status)
                    VALUES (:name, :type, :price, :desc, :date, :active)
                '''
            sql = text(query)
            params = {
                "name":data['name'],
                "type":data['type'],
                "price":data['price'],
                "desc":data['desc'],
                "date": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                "active":True
                }
            result = conn.execute(sql, params)
            conn.commit()
            if result.rowcount > 0:
                return {"status": "success", "error_code": 0, "message": "Successfully registered"}
            else:
                return {"status": "failed", "error_code": 1, "message": "Data not inserted"}
    except Exception as e:
        print("error: ", e)
        return {"status": "failed", "error_code": 1, "message": "An error occurred during insertion"}

def HandleReview(request):
    data = request.json
    try:
        vectorizer = pickle.load(open(".//output//vector.pkl", "rb"))
        model = pickle.load(open(".//output//model.pkl", "rb"))
        rating = model.predict(vectorizer.transform([data['review']]))
        with db.session.connection() as conn:
            query = f'''
                    INSERT INTO reviews (prod, cons, review, rating, rev_date)
                    VALUES (:prodid, :consid, :review, :rating, :date)
                '''
            sql = text(query)
            params = {
                "prodid":data['prodid'],
                "consid":data['consid'],
                "review":data['review'],
                "rating":int(rating[0]),
                "date": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                }
            result = conn.execute(sql, params)
            conn.commit()
            if result.rowcount > 0:
                return {"status": "success", "error_code": 0, "message": "reviewed successfull", "rating":"positive" if int(rating[0]) else "negative"}
            else:
                return {"status": "failed", "error_code": 1, "message": "operation failed"}
    except Exception as e:
        print("error: ", e)
        return {"status": "failed", "error_code": 1, "message": "An error occurred during insertion"}
    
def HandleMainDashBoard(request):
    try:
        with db.session.connection() as conn:
            query = f'''
                    select * from products
                '''
            sql = text(query)
            result = conn.execute(sql)
            return {"status": "success", "error_code": 0, "message": "operation success", 'data':dictfetchall(result)}
    except Exception as e:
        print("error: ", e)
        return {"status": "failed", "error_code": 1, "message": "An error occurred during insertion"}

def HandleProdDet(request):
    data = request.json
    try:
        with db.session.connection() as conn:
            query = f'''
                    select * from products where prod_id = :id
                '''
            sql = text(query)
            params = {
                "id":data['prodid']
                }
            result = conn.execute(sql, params)
            query = f'''
                    select * from reviews where prod = :id
                '''
            sql = text(query)
            result2 = conn.execute(sql, params)
            return {"status": "success", "error_code": 0, "message": "operation success", 'data':dictfetchall(result), 'reviews':dictfetchall(result2)}
    except Exception as e:
        print("error: ", e)
        return {"status": "failed", "error_code": 1, "message": "An error occurred during insertion"}
    
def HandleAdminDash(request):
    try:
        with db.session.connection() as conn:
            query = f'''
                    select * from products
                '''
            sql = text(query)
            prodres = dictfetchall(conn.execute(sql))

            query = f'''
                    select * from reviews
                '''
            sql = text(query)
            revres =dictfetchall(conn.execute(sql))

            query = f'''
                    select * from consumers
                '''
            sql = text(query)
            consres = dictfetchall(conn.execute(sql))

            return {
                "status": "success",
                "error_code": 0,
                'product':prodres,
                'reviews':revres,
                'consumer':consres,
                'totalusers':len(consres),
                'totalprod':len(prodres),
                'totalrew':len(revres)
            }
    except Exception as e:
        print("error: ", e)
        return {"status": "failed", "error_code": 1, "message": "An error occurred during insertion"}