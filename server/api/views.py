import json
from app import db, User

def test_register_success(client):
    user = User(firstname = "John", 
                lastname = "Doe", 
                email = "user1@example.com", 
                username="admin", 
                password="secret"
            )
    db.session.add(user)
    db.session.commit()

    response = client.post("/register",
                           data=json.dumps({
                                "firstname": "John", 
                                "lastname": "Doe", 
                                "email": "user1@example.com", 
                                "username": "admin", 
                                "password": "secret"}),
                           content_type="application/json")

    assert response.status_code == 200
    assert response.json == {"message": "Registration successful"}

def test_register_failure(client):
    response = client.post("/register",
                           data=json.dumps({"email": "user1@example.com", 
                                            "username": "admin", 
                                            "password": "wrong"}),
                           content_type="application/json")
    assert response.status_code == 401
    assert response.json == {"message": "Invalid credentials"}
