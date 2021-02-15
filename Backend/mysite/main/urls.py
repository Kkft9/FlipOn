"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import include, path
from . import views

urlpatterns = [
    path("signup/", views.signup, name="signup"),
    path("login/", views.login, name="login"),
    path("profile/", views.profile, name="profile_update"),
    path("cart/", views.cart, name="cart"),
    path("men/", views.men, name="men"),
    path("women/", views.women, name="women"),
    path("watch/", views.watch, name="watch"),
    path("offers/", views.offers, name="offers"),
    path("search/", views.search, name="search"),
    path("product-details/", views.product_details, name="product-details"),
    path("order-history/", views.order_history, name="product-details"),
]
