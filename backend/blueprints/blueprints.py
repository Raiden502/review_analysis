from flask import jsonify, request
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
def product():
    return jsonify(HandleProdRegistration(request=request))

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

