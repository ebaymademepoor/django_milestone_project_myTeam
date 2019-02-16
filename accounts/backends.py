from django.contrib.auth.models import User

class EmailAuth:
    """ 
    Authenticate a user by exact match on email and password allowing user to 
    log in using email address
    """
    
    def authenticate(self, username=None, password=None):
        """ Get instance of user based off the email and verify password """
        
        try:
            user = User.objects.get(email=username)
            
            if user.check_password(password):
                return user
            return None
        except User.DoesNotExist:
            return None
            
    def get_user(self, user_id):
        """ Used byt the Django authentication system to retrieve a user instance """
        
        try:
            user = User.objects.get(pk=user_id)
        
            if user.is_active:
                return user
            return None
        except User.DoesNotExist:
            return None