# FlipOn #
* A simple E-Commerce shopping website like Flipkart and Amazon
* Features like login, signup, cart and spin-a-wheel pages
* Built the Frontend on Angular with Backend running on Django
* Used MongoDB as the database


## Images ## 
<table>
  <tr>
    <td>Men's Page</td>  
    <td>Women's Page</td>
    <td>Watches Page</td>
  </tr>
  <tr>
    <td><img src="https://github.com/Kkft9/FlipOn/blob/master/images/FlipOn_men.png" width="500" height="200" /></td>  
    <td><img src="https://github.com/Kkft9/FlipOn/blob/master/images/FlipOn_women.png" width="500" height="200" /></td>
    <td><img src="https://github.com/Kkft9/FlipOn/blob/master/images/FlipOn_watches.png" width="500" height="200" /></td>
  </tr>
  <tr>
    <td>SpinWheel page</td>  
    <td>Cart</td>
    <td>Order History</td>
  </tr>
  <tr>
    <td><img src="https://github.com/Kkft9/FlipOn/blob/master/images/FlipOn_wheel.png" width="500" height="200" /></td>  
    <td><img src="https://github.com/Kkft9/FlipOn/blob/master/images/FlipOn_cart.png" width="500" height="200" /></td>
    <td><img src="https://github.com/Kkft9/FlipOn/blob/master/images/FlipOn_history.png" width="500" height="200" /></td>
  </tr>
  <tr>
    <td>Signup Page</td>  
    <td>Login Page</td>
  </tr>
  <tr>
    <td><img src="https://github.com/Kkft9/FlipOn/blob/master/images/FlipOn_signup.png" width="500" height="200" /></td>  
    <td><img src="https://github.com/Kkft9/FlipOn/blob/master/images/FlipOn_login.png" width="500" height="200" /></td>
  </tr>
 </table>
 
 
 ## Getting Started ##
 * Clone this repository using git:
```
    git clone https://github.com/Kkft9/FlipOn.git
    cd FlipOn
  ```
 
 * Install dependencies
 ``` 
    npm install
 ```
 
 * Install Angular
 ```
    npm install -g @angular/cli
 ```
 
 * Install Django
 ```
    python -m pip install Django
 ```
 
 * Install ngw wheel
 ```
    npm install ngx-wheel
 ```
 
 ## Run the Application ##
 * Run the backend server - Django
 ```
    cd Backend/mysite
    python manage.py runserver
 ```
 The server starts running on [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
 
 * Run the frontend - Angular
    Open a new terminal
 ```
    cd Frontend/
    ng serve -o
  ```
 
 Now browse to the app at [http://localhost:4200/](http://localhost:4200/)
