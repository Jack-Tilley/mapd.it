import string
import secrets


def generate_key(size):
    alphabet = string.ascii_letters + string.digits
    key = "".join(secrets.choice(alphabet) for _ in range(size))
    return key.upper()
