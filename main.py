import requests

sellerCloudAuthRequest = {
    'url': "https://cf.api.sellercloud.com/rest/api/token",
    'body': {
        "Username": "developers@sotodeals.com",
        "Password": "S0todeals.12#"
    }
}

response = requests.post(sellerCloudAuthRequest['url'], data=sellerCloudAuthRequest['body'])
data = response.json()

seller_cloud_token = f"Bearer {data['access_token']}"

updateCatalogRequest = {
    'url': 'http://localhost:8082/api/products/catalog',
    'headers': {
        'token': seller_cloud_token
    }
}

response = requests.put(updateCatalogRequest['url'], headers=updateCatalogRequest['headers'])
data = response.json()
print(data)