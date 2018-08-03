from backend.accounts.views import SignUp, Login, LogOut, index, RequestResetPassword, ResetPassword
from django.conf.urls import url

uidb64_regex = '(?P<uidb64>[0-9A-Za-z_\-]+)'
token_regex = '(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})'

urlpatterns = [
    url(r'^$', index),
    url(r'^login$', Login.as_view()),
    url(r'^signup$', SignUp.as_view()),
    url(r'^logout$', LogOut.as_view()),
    url(r'^request-reset-password$', RequestResetPassword.as_view()),
    url(r'^reset-password/{}/{}$'.format(uidb64_regex, token_regex), ResetPassword.as_view()),
]
