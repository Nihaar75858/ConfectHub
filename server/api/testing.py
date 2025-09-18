import requests

# Create user
response = requests.post('http://localhost:8000/register/', json={
    'name': 'Alice Johnson',
    'email': 'alice@example.com',
    'age': 28
})
print(response.json())