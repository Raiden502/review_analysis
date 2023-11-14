from flask import jsonify, request, make_response, abort, send_file
from flask.blueprints import Blueprint
from ..controller.controller import *

blueprint = Blueprint("api", __name__)


@blueprint.route("/login", methods=["POST"])
def login():
    return jsonify(HandleLogin(request=request))

@blueprint.route("/register", methods=["POST"])
def register():
    return jsonify(HandleRegistration(request=request))

@blueprint.route("/addprod", methods=["POST"])
def newproduct():
    return jsonify(HandleProdRegistration(request=request))

@blueprint.route("/editprod", methods=["POST"])
def editproduct():
    return jsonify(HandleProdEdit(request=request))

@blueprint.route("/delprod", methods=["POST"])
def delproduct():
    return jsonify(HandleProdDel(request=request))

@blueprint.route("/review", methods=["POST"])
def review():
    return jsonify(HandleReview(request=request))

@blueprint.route("/mainDashboard", methods=["GET"])
def mainDashboard():
    return jsonify(HandleMainDashBoard(request=request))

@blueprint.route("/prodDetails", methods=["POST"])
def prodDetail():
    return jsonify(HandleProdDet(request=request))

@blueprint.route("/admindashboard", methods=["GET"])
def adminDashboard():
    return jsonify(HandleAdminDash(request=request))

@blueprint.route("/photoreg/<index>", methods=['POST'])
def new_image(index):
    return jsonify(handleupload(request,index))

@blueprint.route('/uploads/<index>', methods=["GET"])
def get_file(index):
    # Define the list of possible file extensions
    file_extensions = ['.jpg', '.png', '.jpeg']

    for extension in file_extensions:
        image_path = os.path.join('.\images', f"{index}{extension}")
        
        # Check if the image file exists
        if os.path.isfile(image_path):
            with open(image_path, 'rb') as image_file:
                # Read the image data as bytes
                image_data = image_file.read()
                # Set the content type based on the file extension
                content_type = f'image/{extension[1:]}'  # Remove the dot from the extension
                response = make_response(image_data)
                response.headers['Content-Type'] = content_type
                # Return the image data as a response
                return response

    # If none of the files exist, return a 404 status code
    abort(404)
